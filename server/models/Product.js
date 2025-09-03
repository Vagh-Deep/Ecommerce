const mongoose = require('mongoose');

const productSchema= new mongoose.Schema(
    {
    image:{
        type:String,
        required:true,
    },
    title:String,

    description:String,
    category:String,
    brand:String,
    price:{type:Number, required:true},
    salePrice:Number,
    totalStock:Number,
    },
    {timestamps:true}
)

const Product = mongoose.model("Product",productSchema);
module.exports= Product;