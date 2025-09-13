const User = require('../../models/User.js')
const Address= require('../../models/Address.js')
const addAddress = async(req,res)=>{
    try {
        const {userId,address,city,pincode,phone,notes}= req.body;

        if(!userId||!address||!city||!pincode||!phone|| !notes) {
            return res.status(400).json({
                success:false,
                message:'InSufficient data provided'
            })
        }

        const user = User.findById(userId);
        if(!user){
              return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }

        const newlyCreatedAddress= new Address({
            userId,address,city,pincode,notes,phone
        })
        await newlyCreatedAddress.save()

        res.status(201).json({
            success:true,
            data:newlyCreatedAddress
        })
        
    } catch (error) {
        console.log(error,'error while adding address')
        res.status(500).json({
            success:false,
            message:"There is some error while adding address"
        })
    }
}


const fetchAddress = async(req,res)=>{
    try {
        const {userId}= req.params
        
              if(!userId) {
            return res.status(400).json({
                success:false,
                message:'InSufficient data provided while fetching address'
            })
        }
           const user = User.findById(userId);
        if(!user){
              return res.status(404).json({
                success:false,
                message:'User not found'
            }) 
        }
     const addressList = await Address.find({userId})
     res.status(200).json({
        success:true,
        data:addressList
     })
        
    } catch (error) {
        console.log(error,'error while fectchin address')
        res.status(500).json({
            success:false,
            message:"There is some error while fetching address"
        })
    }
}
const editAddress = async(req,res)=>{
    try {
        const {userId,addressId}= req.params;
        const formData = req.body
        if(!userId|| !addressId){
            res.status(400).json({
                success:false,
                message:"Insufficient data provided for edit the address"
            })
        }
        
        const address= await Address.findOneAndUpdate({_id:addressId,userId},formData,{new:true});

        if(!address){
            return res.status(404).json({
                success:false,
                message:"address not found"
            })
        }

        res.status(200).json({
            success:true,
            data:address
        })




    } catch (error) {
        console.log(error,'error while editing address')
        res.status(500).json({
            success:false,
            message:"There is some error while editing  address"
        })
    }
}
const deleteAddress = async(req,res)=>{
    try {
         const {userId,addressId}= req.params;
       
        if(!userId|| !addressId){
            res.status(400).json({
                success:false,
                message:"Insufficient data provided for edit the address"
            })
        }
        
        const address= await Address.findOneAndDelete({_id:addressId,userId});

        if(!address){
            return res.status(404).json({
                success:false,
                message:"address not found"
            })
        }

        res.status(200).json({
            success:true,
            data:address
        })


        
    } catch (error) {
        console.log(error,'error while deletj g address')
        res.status(500).json({
            success:false,
            message:"There is some error while deleting address"
        })
    }
}

module.exports= {addAddress,editAddress,deleteAddress,fetchAddress}