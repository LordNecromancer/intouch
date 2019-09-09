const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const BodyParser=require('body-parser');
const googleStrategy=require('passport-google-oauth20').Strategy;
const keys= require('./configs/keys');
const cookieSession=require('cookie-session');
require('./models/users');
require('./models/posts');

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

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
   const user=await User.findById(id);
   done(null,user);

})


try {
    mongoose.connect(keys.mongoURI);
}catch (e) {
    console.log('Error :       '+e);
}
passport.use(new googleStrategy({
    clientID : keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/googleoauth/callback',
    proxy :true
},
    async (accessToken, refreshToken,profile,done)=>{


        try{

            const existingUser= await User.findOne({googleId: profile.id});

            if(existingUser){

                return done(null,existingUser);

            }
            const user=await  new User({
                googleId:profile.id
            }).save();

            return done(null,user);
        }catch (e) {
            console.log('Error :       '+e);

        }
   }));

app.get(
    '/googleoauth/callback',
    passport.authenticate('google'),
    (req,res)=>{
        res.redirect('/dashboard');
    }
);
app.get(
    '/login',
    passport.authenticate('google',{
        scope : ['profile','email']
    })
);

app.get(
    '/api/posts',
   async (req,res) =>{
        const posts=await Post.find({_user :req.user.id});
        res.send(posts);
    }
);
app.post(
    '/api/post',
   async (req,res) =>{
        console.log(req.body);
        const {title,content} =req.body;

        await new Post({
            title : title,
            content:content,
            _user: req.user.id
        }).save();

        res.send(req.user);
    }
);
app.get(
    '/api/logout',
    (req,res) =>{
        req.logout();
        res.redirect('/');
    }
);
app.get(
    '/api/current_user',
    (req,res)=>{
        res.send(req.user);
    }
);


if(process.env.NODE_ENV==='production'){

    app.use(express.static('/client/build'));

    const path =require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

const PORT=process.env.PORT || 5000;

app.listen(PORT);


