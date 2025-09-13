const  {searchProducts}= require('../../Controllers/shop/search-controllers.js')
const express = require('express')
const router = express.Router();

router.get('/:keyword',searchProducts);
module.exports= router
