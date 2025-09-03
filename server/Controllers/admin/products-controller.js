const { imageUploadUtils } = require("../../helpers/cloudinary.js");
const Product = require("../../models/Product.js");

const handleImageUpload = async(req,res)=>{ 
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url= "data:"+req.file.mimetype+";base64,"+b64;
        const result= await imageUploadUtils(url)
        res.json({
            success:true,
            result
        })


    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:`Error Occured ${error.message}` 
        });
    }
}

// add a new prodcut
const addProduct = async(req,res)=>{
try {
    const {image, title,description,category,brand,price,salePrice,totalStock}= req.body;

    const newlyCreatedProduct= new Product({image, title,description,category,brand,price,salePrice,totalStock});
    await newlyCreatedProduct.save();

    res.status(201).json({
        success:true,
        data:newlyCreatedProduct,
        message:"product added successfully"
    })
    

} catch (error) {
    console.log(error,"error in adding product ")
    res.status(500).json({
        success:false,
        message:"something went wrong while adding product"
    })
    
}

}

// fetch all products
const fetchAllProduct = async(req,res)=>{
try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
        success:true,
        data:listOfProducts
    })

} catch (error) {
    console.log(error,"error in fetching products ")
    res.status(500).json({
        success:false,
        message:"something went wrong while fetching products"
    })
    
}

}

// edit a product
const editProduct = async(req,res)=>{
try {
    const {id}= req.params
     const {image, title,description,category,brand,price,salePrice,totalStock}= req.body;
     const  findProduct = await Product.findById(id);
     if(!findProduct) return res.status(404).json({
        success:false,
        message:"Product not found"
     })

     findProduct.title= title||findProduct.title;
     findProduct.description= description||findProduct.description;
     findProduct.category= category||findProduct.category;
     findProduct.brand=brand ||findProduct.brand;
     findProduct.price= price===''?0:price||findProduct.price;
     findProduct.salePrice= salePrice===''?0:salePrice||findProduct.salePrice;
     findProduct.totalStock= totalStock||findProduct.totalStock;
    
     findProduct.image= image||findProduct.image;
    await findProduct.save();

 res.status(200).json({
        success:true,
        message:"Product edited successfully"
    })
    

} catch (error) {
    console.log(error,"error in editing product ")
    res.status(500).json({
        success:false,
        message:"something went wrong while editing product"
    })
    
}

}

// delete a product
const deleteProduct = async(req,res)=>{
try {
    const {id}= req.params
    const findProduct= await Product.findByIdAndDelete(id)
      if(!findProduct) return res.status(404).json({
        success:false,
        message:"Product not found"
     })

     res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
     })
      

} catch (error) {
    console.log(error,"error in deleting product ")
    res.status(500).json({
        success:false,
        message:"something went wrong while deleting product"
    })
    
}

}

module.exports={handleImageUpload,addProduct,fetchAllProduct,deleteProduct,editProduct}