const cloudinary = require('cloudinary').v2;
const multer= require('multer');

cloudinary.config(
    {
        cloud_name:'dvxuvfbon',
        api_key:'824154884899465',
        api_secret:'2nfC2Z0_5DvDyMEb7D6zoB5XuF4',
    }
)

const storage =new multer.memoryStorage();
async function imageUploadUtils(file){
    const result = await  cloudinary.uploader.upload(file,{resource_type:'auto'})
    return result;
}

const upload= multer({storage});
module.exports={upload,imageUploadUtils}