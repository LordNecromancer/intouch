const mongoose=require('mongoose');
const User=mongoose.model('users');
const Post=mongoose.model('posts');
const requireLogin= require('../middleware/requireLogin');



module.exports = app => {
    app.get(
        '/api/posts',requireLogin,
        async (req, res) => {
                const posts = await Post.find({_user: req.user.id},{comments:{$slice : [0,10]}}).populate('likes').populate({path:'comments._user',model:'users',select:'imageName'});
                res.send(posts);

        }
    );
    app.post(
        '/api/post',requireLogin,
        async (req, res) => {
            const {title,content} = req.body.values;
            const{ postId}=req.body;

            if (!postId) {
                await new Post({
                    title: title,
                    content: content,
                    _user: req.user.id,
                }).save();

            }else{
                await Post.updateOne({_id:postId},{title:title,content:content}).exec();
            }
            const posts=await Post.find({_user:req.user.id});
            res.send(posts);

        }
    );

    app.post(
        '/api/post/delete',requireLogin,
        async (req, res) => {
            const{ postId}=req.body;


               const deleted= await Post.deleteOne({_id:postId});


            res.send(req.user);

        }
    );

    app.post(
        '/api/comment',requireLogin,
        async (req, res) => {
            const{ postId,num}=req.body;


            const posts = await Post.find({_id:postId},{comments:{$slice :[num*10,10]}}).populate({path:'comments._user',model:'users',select:'imageName'});


            res.send(posts);

        }
    );


    app.post(
        '/api/like',requireLogin,
        async (req, res) => {
            const {postId} = req.body;


             const alreadyLiked=await Post.findOne({_id:postId,likes : req.user.id});


            if(!alreadyLiked){
              // const post= await Post.findOne({_id:postId});
              await Post.updateOne({_id:postId}, {$addToSet :{likes : req.user.id}});

              // await Post.updateOne({_id:postId}, {$inc:{likeCounter :1}});
                const post=await Post.findOne({_id:postId}).populate('likes');
               // const posts=await Post.find({_user:post._user}).populate('likes');

              //  await Post.updateOne({likes : req.user.id},{$inc : {counter : 1}}).exec();

                res.send(post);
            }else{

                await Post.updateOne({_id:postId}, {$pull :{likes : req.user.id}});

               // await Post.updateOne({_id:postId}, {$inc:{likeCounter :-1}});
                const post=await Post.findOne({_id:postId}).populate('likes');
                //const posts=await Post.find({_user:post._user}).populate('likes');
                res.send(post);
            }

        }
    );


    app.post(
        '/api/post/comment',requireLogin,
        async (req, res) => {
            const {postId,comment} = req.body;


        //    const alreadyLiked=await Post.findOne({_id:postId,likes : req.user.id});



            const user=await User.findOne({_id:req.user.id});
                // const post= await Post.findOne({_id:postId});
                await Post.updateOne({_id:postId}, {$push :{comments : {comment:comment , _user:req.user.id,name:req.user.username}}});

                await Post.updateOne({_id:postId}, {$inc:{commentCounter :1}}).exec();

                const post=await Post.findOne({_id:postId});
                const posts=await Post.find({_user:post._user},{comments:{$slice :[0,10]}}).populate({path:'comments._user',model:'users',select:'imageName'});
                //  await Post.updateOne({likes : req.user.id},{$inc : {counter : 1}}).exec();

                res.send(posts);

        }
    );
}