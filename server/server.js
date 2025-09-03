const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRouter = require("./routes/auth/auth-routes.js")
const adminProductsRouter = require('./routes/admin/product-routes.js')
const shopProductsRouter = require('./routes/shop/product-routes.js')
const shopCartRouter = require('./routes/shop/cart-routes.js')

 

// connecting the database
mongoose.connect('mongodb+srv://deepakk34919:deepak12@ecommerce.hqavtcl.mongodb.net/')
.then(()=>{console.log("mongo db connected ")}).catch((err)=>{

    console.log(err)
})

 const app = express();
  
 app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true 
 }))
 app.use(cookieParser())
 app.use(express.json())
 app.use(express.urlencoded())
 app.use('/api/auth',authRouter)
 app.use('/api/admin/products',adminProductsRouter);
app.use('/api/shop/products',shopProductsRouter);
app.use('/api/shop/cart',shopCartRouter);
  

const PORT = process.env.PORT ||5000

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT} port`)
})