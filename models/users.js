const mongoose=require('mongoose');

const{Schema}= mongoose;

const userSchema=new Schema({
    googleId : String,
    name : String,
    userName:String,
    password:String
});

mongoose.model('users',userSchema);