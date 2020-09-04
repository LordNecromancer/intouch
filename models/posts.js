
const mongoose=require('mongoose');
const {Schema} =mongoose;
const commentSchema=require('./comments');


const postSchema = new Schema({
    title : String,
    content:String,
    likeCounter:{type:Number,default:0},
    commentCounter:{type:Number,default:0},
    _user:{type : Schema.Types.ObjectId , ref :'users'},
    likes:[{type:Schema.Types.ObjectId, ref:'users'}],
    isEdited:{type:Boolean,default:false},
    comments:[commentSchema]
},{timestamps:true});

mongoose.model('posts',postSchema);