const express = require('express')
const { createOrder, capturePayment,getAllOrdersByUser,getOrderDetails }= require('../../Controllers/shop/order-controllers.js')

const router = express.Router()
router.post('/create',createOrder);
router.post('/capture',capturePayment)
router.get('/list/:userId',getAllOrdersByUser);
router.get('/details/:orderId',getOrderDetails)

module.exports=router;