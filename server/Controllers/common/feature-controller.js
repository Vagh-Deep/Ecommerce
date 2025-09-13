const Feature = require("../../models/Feature.js")

const addFeatureImage = async(req,res)=>{
try {
    const {image} =req.body;
    const featureImages = new Feature({
        image
    })
     await featureImages.save()
     res.status(201).json({
        success:true,
        data:featureImages
     })
} catch (error) {
     console.log(error)
        res.json({
            success:false,
            message:`Error Occured ${error.message}` 
        });
    
}
}
const getFeatureImages = async(req,res)=>{
try {
    const images = await Feature.find({})
      res.status(200).json({
        success:true,
        data:images
     })
} catch (error) {
     console.log(error)
        res.json({
            success:false,
            message:`Error Occured ${error.message}` 
        });
    
}
}


const deleteFeatureImage = async(req,res)=>{
try {
    const {featureImageId}= req.params
    const image = await Feature.findByIdAndDelete(featureImageId)
    if(!image){
       return  res.status(400).json({
            success:false,
            message:'Invalid id'
        })
    }
      res.status(200).json({
        success:true,
        data:image
     })
} catch (error) {
     console.log(error)
        res.json({
            success:false,
            message:`Error Occured ${error.message}` 
        });
    
}
}

module.exports ={addFeatureImage,getFeatureImages,deleteFeatureImage}