const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const googleStrategy=require('passport-google-oauth20').Strategy;
const keys= require('./configs/keys');
const cookieSession=require('cookie-session');
require('./models/users');

const User=mongoose.model('users');


const app=express();

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

}
passport.use(new googleStrategy({
    clientID : keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/googleoauth/callback',
    proxy :true
},

    async (accessToken, refreshToken,profile,done)=>{

    return done(null,profile);
   }));

app.get(
    '/googleoauth/callback',
    passport.authenticate('google'),
    (req,res)=>{
        res.redirect('/welcome');
    }
);
app.get(
    '/login',
    passport.authenticate('google',{
        scope : ['profile','email']
    })
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

const PORT=process.env.PORT || 5000;

app.listen(PORT);


