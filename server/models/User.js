const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:[true,"this username already exist "]

    },
    email:{
         type:String,
        required:true,
        unique:[true,"this email already exist "]


    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        default:"user"
    }

},{timestamps:true});

 const User = mongoose.model("User",userSchema);
module.exports=User

