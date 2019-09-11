
const mongoose=require('mongoose');
const {Schema} =mongoose;

const postSchema = new Schema({
    title : String,
    content:String,
    counter:Number,
    _user:{type : Schema.Types.ObjectId , ref :'users'},
    likes:[{type:Schema.Types.ObjectId, ref:'users'}]
});

mongoose.model('posts',postSchema);