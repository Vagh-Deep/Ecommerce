const paypal = require('../../helpers/paypal.js')
const Order = require('../../models/Orders.js')
const Cart = require('../../models/Cart.js')
const Product = require("../../models/Product.js")
const createOrder = async (req, res) => {
    try {
        const { userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId, cartId } = req.body


        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',

            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
                cancel_url: `${process.env.CLIENT_BASE_URL}/paypal-cancel`
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems?.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: 'USD',
                            quantity: item.quantity


                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: totalAmount.toFixed(2),
                        details: {
                            subtotal: totalAmount.toFixed(2)

                        }


                    },
                    description: 'description',
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error("PayPal Error:", JSON.stringify(error.response, null, 2));
                return res.status(500).json({
                    success: false,
                    message: 'error while creating paypal payment'
                })
            }
            else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId, cartId
                })

                await newlyCreatedOrder.save();
                const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;
                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
                })
            }
        })






    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            message: 'There is error while creating order'
        })
    }
}

const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body
        let order = await Order.findById(orderId)
        console.log(orderId, 'orderId')
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order can not be found'
            })
        }
        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'
        order.paymentId = paymentId;
        order.payerId = payerId;
  for(let item of order.cartItems){
    let product = await Product.findById(item.productId);
    if(!product){
        return res.status(404).json({
            success:false,
            message:`Product not found ${item.title}`
        })

    
    }
     product.totalStock-=item.quantity
    await product.save();
  }


        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);


        await order.save();
        res.status(200).json({
            success: true,
            message: "Order Confirmed",
            data: order
        })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            message: 'There is error while  capturing Payment'
        })
    }
}



const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });


        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'no orders found'
            })
        }
    // const allOrders=  await Order.find({});
    //  allOrders.forEach( async (order)=> {await Order.findByIdAndDelete(order._id)})  // this is to delte all the orders 
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

    module.exports = { createOrder, capturePayment,getAllOrdersByUser,getOrderDetails }