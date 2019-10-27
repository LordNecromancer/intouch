const mongoose=require('mongoose');


const{Schema}= mongoose;

const commentSchema=new Schema({
    _user:{type : Schema.Types.ObjectId , ref :'users'},
    comment: String,
    name:String,

});

mongoose.model('comments',commentSchema);