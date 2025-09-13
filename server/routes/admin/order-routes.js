const express = require('express')
const {getAllOrders,getOrderDetails,updateOrderStatus} = require('../../Controllers/admin/order-controllers.js')



const router = express.Router();

router.get('/list',getAllOrders);
router.get('/details/:orderId',getOrderDetails)
router.put('/update/:orderId',updateOrderStatus)
module.exports=router