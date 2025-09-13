
const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRouter = require("./routes/auth/auth-routes.js")
const adminProductsRouter = require('./routes/admin/product-routes.js')
const shopProductsRouter = require('./routes/shop/product-routes.js')
const shopCartRouter = require('./routes/shop/cart-routes.js')
const shopAddressRouter = require('./routes/shop/address-routes.js')
const shopOrderRouter = require('./routes/shop/order-routes.js');
const shopProductReviewRouter =require('./routes/shop/review-routes.js')
const adminOrderRouter= require('./routes/admin/order-routes.js')

const shopSearchRouter = require('./routes/shop/search-routes.js')
const commonFeatureRouter = require('./routes/common/feature-routes.js')


 

// connecting the database
const mongoDB_url=process.env.MONGODB_URL
mongoose.connect(mongoDB_url)
.then(()=>{console.log("mongo db connected ")}).catch((err)=>{

    console.log(err)
})

 const app = express();
  
 app.use(cors({
    origin: process.env.CLIENT_BASE_URL ,
    credentials:true 
 }))
 app.use(cookieParser())
 app.use(express.json())
 app.use(express.urlencoded())
 app.use('/api/auth',authRouter)
 app.use('/api/admin/products',adminProductsRouter);
app.use('/api/shop/products',shopProductsRouter);
app.use('/api/shop/cart',shopCartRouter);
app.use('/api/shop/address',shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/admin/order',adminOrderRouter)
app.use('/api/shop/search',shopSearchRouter);
app.use('/api/shop/review',shopProductReviewRouter)

app.use('/api/common/feature',commonFeatureRouter)
  

const PORT = process.env.PORT ||5000

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT} port`)
})