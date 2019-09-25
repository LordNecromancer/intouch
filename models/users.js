const mongoose=require('mongoose');

const{Schema}= mongoose;

const userSchema=new Schema({
    googleId : String,
    name : String,
    username:String,
    password:String,
    chats:[{type:Schema.Types.ObjectId ,ref:'chats'}],
    friendRequestsReceived:[{type:Schema.Types.ObjectId ,ref:'users'}],
    friends:[{type:Schema.Types.ObjectId ,ref:'users'}],
    friendRequestsSent: [String],
    image :{imageName :String,imageData:String}
});

mongoose.model('users',userSchema);