const Product =require('../../models/Product.js')
const searchProducts = async(req,res)=>{
    try {

        const {keyword} = req.params;
        if(!keyword|| typeof keyword !== 'string'){
             res.status(400).json({
            success:false,
            message:'Invalid keyword'
        })
        }

        const regEx= new RegExp(keyword,'i')
        const createSearchQuery ={
            $or:[
                {title:regEx},
                 {description:regEx},
                  {brand:regEx},
                   {category:regEx},

            ]
        }
        const searchResults= await Product.find(createSearchQuery);
        res.status(200).json({
            success:false,
            data:searchResults
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'There is error while searcing product'
        })
        
    }
}

module.exports = {searchProducts}