const express = require('express')
const{addFeatureImage,getFeatureImages,deleteFeatureImage} = require('../../Controllers/common/feature-controller.js')
 

const router= express.Router();
 router.post('/add',addFeatureImage)
 
 router.get('/get',getFeatureImages)
 router.delete('/delete/:featureImageId',deleteFeatureImage)

module.exports= router;
