const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const googleStrategy=require('passport-google-oauth20').Strategy;
const keys= require('./keys');
const cookieSession=require('cookie-session');
require('./models/users');

const User=mongoose.model('users');
console.log(User);


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
    console.log('Error :       '+e);
}
passport.use(new googleStrategy({
    clientID : keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/googleoauth/callback',
    //important
    proxy :true
},

    async (accessToken, refreshToken,profile,done)=>{

        try{

            const existingUser= await User.findOne({googleId: profile.id});
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');

            if(existingUser){
                console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');

                return done(null,existingUser);

            }
            const user=await  new User({
                googleId:profile.id
            }).save();
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

            return done(null,user);
        }catch (e) {
            console.log('Error :       '+e);

        }
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


