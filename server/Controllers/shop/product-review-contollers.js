
const Order = require('../../models/Orders.js')
const Product = require('../../models/Product.js')
const ProductReview = require('../../models/Review.js')
const addProductReview = async (req, res) => {
    try {
        const { productId,
            userId,
            userName,
            reviewMessage,
            reviewValue } = req.body





        if (!productId || !userId || !userName || !reviewValue) {
           return  res.status(500).json({
                success: false,
                message: 'some value missig'
            })
        }

        const order = await Order.findOne({ userId, "cartItems.productId": productId, orderStatus: 'confirmed' })

        if (!order) {
            return res.status(403).json({
                success: false,
                message: 'you need to purchase product to review it '
            })
        }

        const checkExistingReview = await ProductReview.findOne({ userId, productId })
        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                message: 'already reviewed this product'
            })
        }

        const newReview = new ProductReview({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue

        })

        await newReview.save()

        const reviews = await ProductReview.find({
            productId
        })

        const totalReviewLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewLength;

        await Product.findByIdAndUpdate(productId, { averageReview });

       return  res.status(201).json({
            success: true,
            data: newReview
        })



    } catch (error) {
        console.log(error)
      return   res.status(500).json({
            success: false,
            message: 'Error while adding product review'
        })

    }
}


const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params
        if (!productId) {
            res.status(400).json({
                success: false,
                message: 'provide product Id'
            })

        }

        const reviews = await ProductReview.find({ productId })

        res.status(200).json({
            success: true,
            data: reviews
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error while fetching product reviews'
        })

    }
}

module.exports = { addProductReview, getProductReviews }
