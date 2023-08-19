const express=require('express');
const mongoose=require('mongoose');
//const flash=require("connect-flash");
const passport=require('passport');
const path =require('path');
const BodyParser=require('body-parser');
const multer=require('multer');
let fs = require('fs-extra');
const keys= require('./configs/keys');
const cookieSession=require('cookie-session');
require('./models/users');
require('./models/posts');
require('./models/chats');
require('./models/tokens');
const requireLogin= require('./middleware/requireLogin');

const requireLogout= require('./middleware/requireLogout');
require('./services/passport');
require('dotenv').config({ path: keys });

const User=mongoose.model('users');
const Post=mongoose.model('posts');
const Chat=mongoose.model('chats');



const app=express();

//app.use(flash());

const http=require('http').Server(app);
const io=require('socket.io');
const socket=io(http);

socket.on('connection',(socket) =>{
    socket.on('initial_data',async({myId,name})=>{
        const user= await User.findOne({username : name});
        const chat=await Chat.findOne({
            _users:{$all:[user._id,myId]}
        }).populate('_users','username').populate('_users','imageName');

        socket.emit('initial_data',chat)

    });
    socket.on('send_message',async({myId,name,message}) =>{
        const user= await User.findOne({username : name});
        let chat=await Chat.findOne({
            _users:{$all:[user._id,myId]}
        });
        if(chat){

            await Chat.updateOne({_id:chat._id},{$push:{messages :{_sender:myId,message:message}}});
            socket.emit('updated_chat',{messages :{_sender:myId,message:message}});

            // chat=await Chat.findOne({_id:chat._id}).populate('_users','username').populate('_users','imageName');
        }else{
            let newChat=await new Chat({
                _users:[myId,user._id],
                messages:[{_sender:myId,message:message}]
            }).save();

            await User.updateOne({_id:myId},{$push:{chats:newChat}});
            await User.updateOne({_id:user._id},{$push:{chats:newChat}});

            newChat=newChat.populate('_users','username').populate('_users','imageName');
            socket.emit('updated_chat',newChat);
        }

    })
})


app.use(BodyParser.json());
app.use(
    cookieSession({
        maxAge : 3*24*60*60*1000,
        keys : [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/registeringRoutes')(app);
require('./routes/usersRoutes')(app);
require('./routes/postsRoutes')(app);


const storage=multer.diskStorage({
    destination: (req,file,cb) =>{
      //  let userId=req.params.userId;
        let userId=req.user.id
        console.log(userId)

        let path = `public/images/${userId}`;
        fs.mkdirsSync(path);
        cb(null,path)
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now()+'-'+file.originalname);
    }
});

const imageFilter= (req,file,cb) =>{
    if(file.mimeType==='image/png' || file.mimeType==='image/jpeg'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload=multer({
    storage:storage
   // fileFilter:imageFilter
});




// app.use(async (req,res,next) =>{
//     if(req.session) {
//         const user = await User.find({userName: req.session.user.userName});
//         req.user = user;
//     }
//     next();
// });





try {
    mongoose.connect(keys.mongoURI,
        { useNewUrlParser: true, useUnifiedTopology: true });
}catch (e) {
    console.log('Error :       '+e);
}

app.post('/api/upload',requireLogin,upload.single('imageData'),async (req,res) =>{
    console.log(req.user.id)
    await User.updateOne({_id:req.user.id},{imageName:req.file.filename});
    const user=await User.findOne({_id:req.user.id});
    res.send(user);
})

app.post(
    '/api/post/:userId',requireLogin,upload.array('imageData'),async (req,res)=>{
        let images=req.files.map((image) => image.filename)
        const {title,content} = JSON.parse(req.body.values);
        const{ postId}=req.body;
        console.log(req.user.id)


        if (!postId) {
            await new Post({
                title: title,
                content: content,
                images:images,
                _user: req.user.id,
            }).save();

        }else{
            await Post.updateOne({_id:postId},{title:title,content:content,images:images,isEdited:true}).exec();
        }
        const posts=await Post.find({_user:req.user.id}).sort({createdAt:-1});
        res.send(posts);

    }
);
app.use(express.static(path.join(__dirname, 'public','images/')));

app.use('/', function(req,res,next){
    if(req.user){
        req.url = req.user.id+req.url// add something to lead to different directory

    }
    next();
});
// app.get('/', function(req, res){
//     let image=req.params.image
//         let p = req.user._id ? '/'+req.user._id +'/':'';
//    // let resolvedPath = path.resolve(p);
//
//     res.sendFile('public/images'+p+image,{root:__dirname });
// });
app.use('/',express.static(path.join(__dirname, 'public','images/')));
//app.use(express.static('client'))

if(process.env.NODE_ENV==='production'){

    app.use(express.static(path.join(__dirname,'client','build')));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}

const PORT=process.env.PORT || 5000;

http.listen(PORT);


