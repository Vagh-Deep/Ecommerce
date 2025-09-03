
const express = require('express')
 
const { addToCart,
    deleteCartItem,
    updateCartItemQuantity,
    fetchCartItems}      = require('../../Controllers/shop/cart-controllers.js')

const router = express.Router();
router.post('/add',addToCart);
router.get('/get/:userId',fetchCartItems)
router.put('/update-cart',updateCartItemQuantity)
router.delete('/:userId/:productId',deleteCartItem)
module.exports=router