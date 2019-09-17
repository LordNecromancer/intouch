const mongoose=require('mongoose');
const User=mongoose.model('users');
const Post=mongoose.model('posts');

module.exports = app =>{

    app.get(
        '/api/current_user',
        async(req,res)=>{
            let user=false;
            if(req.user)
            user=await User.findOne({_id:req.user.id}).populate('friends','username').populate('friendRequestsReceived','username').populate('friendRequestsSent','username');
            res.send(user);
        }
    );


    app.get('/api/users/:name', async (req,res)=>{
        let name=req.params.name;

        const user= await User.findOne({username : name});
        if(user) {
            const posts = await Post.find({_user: user.id},{comments:{$slice :[0,10]}});
            res.send(posts);
        }else {
            res.status(404).send('no such user moron');
        }
    });


    app.post('/api/add_friend', async (req,res)=>{

        const{username}=req.body;

        const userId=await User.findOne({username:username});
        const alreadySent=await User.findOne({_id:req.user.id ,friendRequestsSent:userId._id});
        const alreadyFriends=await User.findOne({_id:req.user.id,friends:userId._id});
        const existingRequestFromThem=await User.findOne({_id:req.user.id,friendRequestsReceived:userId._id});
        if(existingRequestFromThem){
            req.url='/api/accept';
            req.body.userId=userId._id;
            app.handle(req,res);
        }else if(alreadyFriends){
            await User.updateOne({username: username}, {$pull: {friends: req.user.id}});
            await User.updateOne({_id:req.user.id}, {$pull: {friends: userId._id}});
            const user = await User.findOne({_id: req.user.id}).populate('friends','username').populate('friendRequestsReceived','username').populate('friendRequestsSent','username');

            res.send(user);


        }else {

            if (!alreadySent) {
                await User.updateOne({username: username}, {$push: {friendRequestsReceived: req.user.id}});
                const temp = await User.findOne({username: username});
                await User.updateOne({_id: req.user.id}, {$push: {friendRequestsSent: temp.id}});

                const user = await User.findOne({_id: req.user.id}).populate('friends','username').populate('friendRequestsReceived','username').populate('friendRequestsSent','username');

                res.send(user);
            } else {
                res.status(403).send("already sent");
            }
        }
        //     if(user) {
    //         const posts = await Post.find({_user: user.id},{comments:{$slice :[0,10]}});
    //         res.send(posts);
    //     }else {
    //         res.status(404).send('no such user moron');
    //     }
    // });
});


    app.post('/api/accept', async (req,res)=>{

        const{userId}=req.body;

        const alreadyAccepted=await User.findOne({_id:req.user.id ,friends:userId});
        if(!alreadyAccepted) {
            await User.updateOne({_id: req.user.id}, {$push: {friends: userId}});
            await User.updateOne({_id: req.user.id}, {$pull: {friendRequestsReceived: userId}});


            await User.updateOne({_id: userId}, {$push: {friends: req.user.id}});
            await User.updateOne({_id: userId}, {$pull: {friendRequestsSent: req.user.id}});


            const user = await User.findOne({_id: req.user.id}).populate('friends','username').populate('friendRequestsReceived','username').populate('friendRequestsSent','username');


            res.send(user);
        }else {
            res.status(401).send("already accepted")
        }

    });
}