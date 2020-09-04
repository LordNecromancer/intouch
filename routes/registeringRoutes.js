const passport=require('passport');
const mongoose=require('mongoose');

const User=mongoose.model('users');
const requireLogin= require('../middleware/requireLogin');

const requireLogout= require('../middleware/requireLogout');


module.exports = app => {
    app.post('/login/common',requireLogout, passport.authenticate('local'), (req, res) => {

        res.send(req.user);
    });
    app.get(
        '/googleoauth/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );
    app.get(
        '/login/google/oauth',requireLogout,
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/api/logout',requireLogin,
        (req,res) =>{
            req.logout();
            res.redirect('/');
        }
    );

    app.post('/api/isValid/username',(req,res) =>{

        const {username}=req.body;

    })

    app.post('/api/sign_up' ,requireLogout, async (req,res) =>{
        const {username,password}= req.body;

        const existingUser=await User.findOne({username : username});
        if(!existingUser) {
            const user = await new User({
                username: username,
                password: password
            }).save();
            res.send(false);
        } else {

            res.send({type: "sign_up_error", error: "username already exists"});
        }
    });
}