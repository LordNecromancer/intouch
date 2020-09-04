const mongoose=require('mongoose');

const{Schema}= mongoose;

const chatSchema=new Schema({
   _users:[{type:Schema.Types.ObjectId ,ref:'users'}],
    numberOfPeople :{type:Number,default:2},
    messages:[{_sender:{type:Schema.Types.ObjectId , ref:'users'}, message:String}]
},{timestamps:true}
);

mongoose.model('chats',chatSchema);