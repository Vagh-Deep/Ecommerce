const Order = require('../../models/Orders.js')
const Cart = require('../../models/Cart.js')


const getAllOrders= async (req, res) => {
    try {
        
        const orders = await Order.find({});


        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'no orders found'
            })
        }

        return res.status(200).json({
            success: true,
            data: orders
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'There is error while fetching all orders'
        })
    }
}


const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
        if (!order) {
             res.status(404).json({
                success: false,
                message: 'order not found '
            })



        }


        res.status(200).json({
            success:true,
            data:order
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'There is error while fetching  order details'
        })
    }}

    const updateOrderStatus= async(req,res)=>{
        try {
            const {orderId} = req.params;
            const {orderStatus} = req.body;
            const order = Order.findById(orderId);

            if(!order){
              res.status(404).json({
                success: false,
                message: 'order not found '    
            })
        }

        await Order.findByIdAndUpdate(orderId,{orderStatus});
        return res.status(200).json({
            success:true,
            message:'order Status updated successfully'
        })


        } catch (error) {
            console.log(error);
             res.status(500).json({
            success: false,
            message: 'There is error while updating the order status'
        })
            
        }
    }

module.exports={getAllOrders,getOrderDetails,updateOrderStatus}