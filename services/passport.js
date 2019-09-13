const passport= require('passport');
const googleStrategy=require('passport-google-oauth20').Strategy;
const localStrategy=require('passport-local').Strategy;
const keys= require('../configs/keys');
const mongoose=require('mongoose');

const User=mongoose.model('users');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
    const user=await User.findById(id);
    done(null,user);

});

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
                googleId:profile.id,
                name : profile.name.givenName,
                username:profile.emails[0].value
            }).save();

            return done(null,user);
        }catch (e) {
            console.log('Error :       '+e);

        }
    }));

passport.use(new localStrategy(
    async (username,password,done) =>{
        const user=await User.findOne({username : username ,password :password});
        if(user){



            return done(null,user);
        }
        return (null,false);
    }));