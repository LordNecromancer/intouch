const mongoose=require('mongoose');
const User=mongoose.model('users');
const Post=mongoose.model('posts');

module.exports = app => {
    app.get(
        '/api/posts',
        async (req, res) => {
            if (req.user) {
                const posts = await Post.find({_user: req.user.id});
                res.send(posts);
            }
        }
    );
    app.post(
        '/api/post',
        async (req, res) => {
            const {title, content} = req.body;

            await new Post({
                title: title,
                content: content,
                _user: req.user.id,
                counter:0
            }).save();

            res.send(req.user);
        }
    );


    app.post(
        '/api/like',
        async (req, res) => {
            const {postId} = req.body;


             const alreadyLiked=await Post.findOne({_id:postId,likes : req.user.id});


            if(!alreadyLiked){
              // const post= await Post.findOne({_id:postId});
               const post=await Post.updateOne({_id:postId}, {$push :{likes : req.user.id}}).exec();

               await Post.updateOne({_id:postId}, {$inc:{counter :1}}).exec();

              //  await Post.updateOne({likes : req.user.id},{$inc : {counter : 1}}).exec();
                console.log(post);

                res.send(post);
            }

        }
    );
}