const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const path =require('path');
const BodyParser=require('body-parser');

const keys= require('./configs/keys');
const cookieSession=require('cookie-session');
require('./models/users');
require('./models/posts');

require('./services/passport');


const User=mongoose.model('users');
const Post=mongoose.model('posts');


const app=express();


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


if(process.env.NODE_ENV==='production'){

    app.use(express.static(path.join(__dirname,'/client/build')));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname,'client/build','index.html'));
    })
}

const PORT=process.env.PORT || 5000;

app.listen(PORT);


