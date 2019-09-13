const passport=require('passport');
const mongoose=require('mongoose');

const User=mongoose.model('users');


module.exports = app => {
    app.post('/login/common', passport.authenticate('local'), (req, res) => {

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
        '/login/google/oauth',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/api/logout',
        (req,res) =>{
            req.logout();
            res.redirect('/');
        }
    );

    app.post('/api/isValid/username',(req,res) =>{

        const {username}=req.body;

    })

    app.post('/api/sign_up' , async (req,res) =>{
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