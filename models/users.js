const mongoose=require('mongoose');

const{Schema}= mongoose;

const userSchema=new Schema({
    googleId : String,
    name : String,
    username:String,
    password:String,
    isActive:{type:Boolean ,default:false},
    chats:[{type:Schema.Types.ObjectId ,ref:'chats'}],
    friendRequestsReceived:[{type:Schema.Types.ObjectId ,ref:'users'}],
    friends:[{type:Schema.Types.ObjectId ,ref:'users'}],
    friendRequestsSent: [String],
    imageName :{type :String ,default:'default.jpg'}
},{timestamps:true});

mongoose.model('users',userSchema);