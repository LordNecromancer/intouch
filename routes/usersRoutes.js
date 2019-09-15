const mongoose=require('mongoose');
const User=mongoose.model('users');
const Post=mongoose.model('posts');

module.exports = app =>{

    app.get(
        '/api/current_user',
        async(req,res)=>{
            let user=null;
            if(req.user)
            user=await User.findOne({_id:req.user.id}).populate('friends').populate('friendRequestsReceived').populate('friendRequestsSent');
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
        const user= await User.updateOne({username : username},{$push :{friendRequestsReceived:req.user.id}});
        await User.updateOne({_id:req.user.id},{$push :{friendRequestsSent:user.id}});

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
        await User.updateOne({_id:req.user.id},{$push :{friends:userId}});
        await User.updateOne({_id:req.user.id},{$pull:{friendRequestsReceived: userId}});


        await User.updateOne({_id:userId},{$push :{friends:req.user.id}});
        await User.updateOne({_id:userId},{$pull:{friendRequestsSent: req.user.id}});


        const user=await User.findOne({_id:req.user.id}).populate('friends').populate('friendRequestsReceived').populate('friendRequestsSent');

        //     if(user) {
        //         const posts = await Post.find({_user: user.id},{comments:{$slice :[0,10]}});
        //         res.send(posts);
        //     }else {
        //         res.status(404).send('no such user moron');
        //     }
        // });
       res.send(user);
    });
}