const passport=require('passport');
const mongoose=require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
//const sgTransport = require('nodemailer-sendgrid-transport');
const smtpTransport=require('nodemailer-smtp-transport');
const User=mongoose.model('users');
const Token=mongoose.model('tokens');
const keys=require('../configs/keys')

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

    app.get(
        '/confirmation/:token', async (req,res)=>{
            let t=req.params.token;

           // let t=req.body.token;
        let token=await Token.findOne({token:t});

        if (!token)  return res.status(400).send({ type: 'token_not_found', msg: 'We were unable to find a valid token. Your token my have expired.' });


            let user=await User.findOne({_id:token._user})
        if (!user)  res.status(400).send({ msg: 'We were unable to find a user for this token.' });
        if (user.isActive)  res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

        user=await User.updateOne({_id:token._user},{isActive:true}).exec()
            res.send(user)
      //  res.status(200).send("The account has been verified. Please log in.");


    });

    app.post(
        '/api/resendToken', async (req,res)=>{
            let {email}=req.body;

            User.findOne({ email: email}, function (err, user) {
                if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
                if (user.isActive) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

                // Create a verification token, save it, and send email
                let token = new Token({ _user: user._id, token: crypto.randomBytes(16).toString('hex') });

                // Save the token
                token.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }

                    // Send the email
                   sendEmail(user,req,token,res);
                });

            });

            // let t=req.body.token;




        });

    app.post('/api/isValid/username',(req,res) =>{

        const {username}=req.body;

    })

    function sendEmail(user, req, token, res) {
        const options = {

            service: 'hotmail',
            auth: {
                user: keys.email,
                pass: keys.emailPassword
                //api_key: keys.sendgridAPIKey
            }

        };

        const client = nodemailer.createTransport(smtpTransport(options));

        const email = {
            from: 'intouch.social@outlook.com',
            replyTo: 'no_reply.intouch.social@outlook.com',
            to: user.email,
            subject: 'confirmation token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n',
            html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n',

        };

        //  var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
        // var mailOptions = { from: 'no-reply@yourwebapplication.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
        client.sendMail(email, function (err, info) {
            if (err) {
                res.send({type: "sign_up_error", error: err});
            } else {
                console.log('Message sent: ' + info.response);
                res.send(false);

            }
        });
    }

    app.post('/api/sign_up' ,requireLogout, async (req,res) =>{
        var {username,email,password}= req.body;

        let existingUser=await User.findOne({username : username});
        if(!existingUser) {

            let eu=await User.findOne({email : email,username:{$ne:null}});
            if(!eu) {

               // console.log(email)

                let user=await User.findOne({email : email});
                if(user){
                    user.username=username;
                    user.password=password;
                    await user.save();
                }else {
                     user = await new User({
                        username: username,
                        email: req.body.email,
                        password: password
                    }).save();
                }

                const token = await new Token({_user: user._id, token: crypto.randomBytes(16).toString('hex')}).save();
                sendEmail(user, req, token, res);

            }else{
                res.send({type: "sign_up_email_error", error: "this email is already registered"});

            }
        } else {

            res.send({type: "sign_up_username_error", error: "username already exists"});
        }
    });
};