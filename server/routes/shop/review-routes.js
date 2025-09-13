const express = require('express')
 
const {addProductReview,getProductReviews}     = require('../../Controllers/shop/product-review-contollers.js')

const router = express.Router();
router.post('/add',addProductReview);
router.get('/get/:productId',getProductReviews);

module.exports = router;
