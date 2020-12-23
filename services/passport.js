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

    console.log(profile)

        try{

            const existingUser= await User.findOne({$or:[{googleId: profile.id},{email:profile.emails[0].value}]}).populate('friendRequestsReceived','username').populate('friends','username').populate('friendRequestsSent','username');

            if(existingUser){

                if(!existingUser.googleId){
                    existingUser.googleId=profile.id;
                    await existingUser.save();
                }
                return done(null,existingUser);

            }
            const user=await  new User({
                googleId:profile.id,
                name : profile.name.givenName,
                email:profile.emails[0].value,
                imageName:profile.photos[0].value
               // username:profile.emails[0].value
            }).save();

            return done(null,user);
        }catch (e) {
            console.log('Error :       '+e);

        }
    }));

passport.use(new localStrategy(
    async (username,password,done) =>{
        const user=await User.findOne({$or:[{username : username } ,{email:username}],password :password,isActive:true}).select({password:false}).populate('friendRequestsReceived ','username').populate('friends','username').populate('friendRequestsSent','username');
        console.log(user)
        if(user)
            return done(null,user);

        return done(null,false);
    }));