const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const path =require('path');
const BodyParser=require('body-parser');
const multer=require('multer');

const keys= require('./configs/keys');
const cookieSession=require('cookie-session');
require('./models/users');
require('./models/posts');
require('./models/chats');

require('./services/passport');


const User=mongoose.model('users');
const Post=mongoose.model('posts');
const Chat=mongoose.model('chats');



const app=express();

const http=require('http').Server(app);
const io=require('socket.io');
const socket=io(http);

socket.on('connection',(socket) =>{
    socket.on('initial_data',async({myId,name})=>{
        const user= await User.findOne({username : name});
        const chat=await Chat.findOne({
            _users:{$all:[user._id,myId]}
        }).populate('messages._sender','username');

        socket.emit('initial_data',chat)

    });
    socket.on('send_message',async({myId,name,message}) =>{
        const user= await User.findOne({username : name});
        let chat=await Chat.findOne({
            _users:{$all:[user._id,myId]}
        });
        if(chat){
            await Chat.updateOne({_id:chat._id},{$push:{messages :{_sender:myId,message:message}}})
            chat=await Chat.findOne({_id:chat._id}).populate('messages._sender','username');
        }else{
            let newChat=await new Chat({
                _users:[myId,user._id],
                messages:[{_sender:myId,message:message}]
            }).save();
            newChat=newChat.populate('messages._sender','username');
            socket.emit('updated_chat',newChat);
        }

        socket.emit('updated_chat',chat);
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
        cb(null,'./public/images/')
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
    mongoose.connect(keys.mongoURI);
}catch (e) {
    console.log('Error :       '+e);
}

app.post('/api/upload',upload.single('imageData'),async (req,res) =>{
    console.log(req.file)
    await User.updateOne({_id:req.user.id},{image :{imageName:req.file.filename,imageData :req.file.path}});
    const user=await User.findOne({_id:req.user.id});
    res.send(user);
})

app.use(express.static(path.join(__dirname, '/public/images')));

if(process.env.NODE_ENV==='production'){

    app.use(express.static(path.join(__dirname,'/client/build')));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname,'client/build','index.html'));
    })
}

const PORT=process.env.PORT || 5000;

http.listen(PORT);


