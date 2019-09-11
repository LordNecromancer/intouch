const mongoose=require('mongoose');
const User=mongoose.model('users');
const Post=mongoose.model('posts');

module.exports = app =>{

    app.get(
        '/api/current_user',
        (req,res)=>{
            res.send(req.user);
        }
    );


    app.get('/api/users/:name', async (req,res)=>{
        let name=req.params.name;

        console.log(name);
        const user= await User.findOne({userName : name});
        if(user) {
            const posts = await Post.find({_user: user.id});
            res.send(posts);
        }else {
            res.status(404).send('no such user moron');
        }
    });
}