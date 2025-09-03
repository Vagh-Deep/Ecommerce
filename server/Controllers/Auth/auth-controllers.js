const ApiError= require("../../src/utils/ApiError.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User.js')
const registerUser = async(req,res)=>{
    console.log("inside registerUser in server")
    const {userName,email,password}= req.body;

try{
      const checkUser= await User.findOne({email});
      if(checkUser){
        return res.json({
            success:false,
            message:"User with given already exist, kindly try with other email"
        })
      }
    const hashPassword= await  bcrypt.hash(password,12)
    const newUser = new User({
        userName,email,password:hashPassword
    })
      await newUser.save();
      console.log(newUser)
      res.status(200).json({
        success:true,
        message:"Registration Successful"
      })
      


}
catch(e){
    console.log(e);
    res.status(500).json( 
        {   success:false,
            message:"There is error while registering"
        }
    )
}






}


const loginUser= async(req,res)=>{
      const {email,password} = req.body;
    try{
       const checkUser = await User.findOne({email})
       if(!checkUser) return res.json({
        success:false,
        message:"user does not exist ! kindly register first"
       })
     
       const checkPasswordMatch= await bcrypt.compare(password,checkUser.password)
       if(!checkPasswordMatch)
       {
        return res.json({
          success:false,
          message:"Incorrect Password"
        })
       }
       const token = jwt.sign({
        id:checkUser._id,
        role:checkUser.role,
        email: checkUser.email ,
        userName:checkUser.userName
       },'CLIENT_SECRET_KEY',{expiresIn:'60 m'})

       res.cookie('token',token,{httpOnly:true, secure:false})
       .json({
        success:true,
        message:"logged in successfully",
        user:{
          email:checkUser.email,
          id:checkUser._id,
          role:checkUser.role,
         userName:checkUser.userName
        }
       })





    }
     catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"some error occured while login"
        })
     }
}


const logoutUser= (req,res)=>{
  res.clearCookie('token').json({
    success:true,
    message:"logged out successfully"
  })
}

const authMiddleware = async(req,res,next)=>{
  const token= req.cookies.token
  if(!token){
    return res.status(401).json({
      success:false,
      message:"unauthorized user"
    })
      }

    try{
      const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
      req.user=decoded;
      next()


    }
    catch(error){
      console.log("Error AuthMiddleware",error);
      res.status(401).json({
        success:false,
        message:"unauthorized user"
      })
    }
 


}

module.exports={registerUser, loginUser,logoutUser,authMiddleware}