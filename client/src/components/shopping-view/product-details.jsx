import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import {toast} from 'sonner'
import { setProductDetails } from '@/store/shop/products-slice'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import StarRatingComponent from '../common/star-rating'
import { addNewReview, getProductAllReview } from '@/store/shop/review-slice'

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    console.log(productDetails,"productDetails")
    const dispatch= useDispatch();
    const {user}= useSelector(state=>state.auth)
      const {cartItems} = useSelector(state=>state.shopCart)
      const {orderList}= useSelector(state=>state.shopOrder)
      const {reviews} = useSelector(state=>state.shopReview)
      const [reviewMessage,setReviewMessage] = useState('')
      const [rating,setRating] = useState(0);
  function handleAddtoCart(getCurrentProductId,getTotalStock){


     let getCartItems= cartItems.items || [];
        console.log(getCartItems,'getCartItems',getTotalStock)
        if(getCartItems.length){
          const indexOfCurrentItem= getCartItems.findIndex(item=>item.productId===getCurrentProductId);
          if(indexOfCurrentItem>-1)
          {
            const getQuantity = getCartItems[indexOfCurrentItem].quantity
            if(getQuantity+1>getTotalStock){
              toast(`only ${getQuantity} quantity can be added for this product`,{
                style:{
                  backgroundColor:'red'
                }
              })
              return;
            }
          }
        }
    

    console.log(getCurrentProductId,"addign product ot cart")
    dispatch(addToCart({userId:user?.id,productId:getCurrentProductId,quantity:1})).then(data=>{
      console.log(data)
      if(data?.payload?.success)
     { dispatch(fetchCartItems(user?.id))
      toast('Product added to Cart ')
     }
    }).catch(error=>{
      console.log(error)
        toast('Unable to add product to cart', {style:{
    background: "#d84333ff",
    color: "#ffffffff",
        }} )

    })

  }

  function handleDialogClose(){
    setOpen(false)
    dispatch(setProductDetails());
    setRating(0)
    setReviewMessage('')
  }


  function handleAddReview(){

    const reviewData ={
        userId:user?.id,
        productId:productDetails?._id,
        reviewMessage,
        reviewValue:rating,
        userName:user?.userName
    }
    console.log(reviewData,'reviewData')

dispatch(addNewReview(reviewData)).then(data=>{
    console.log(data)
    if(data?.payload?.success){
    toast('Review Added Successfully')
    dispatch(getProductAllReview(productDetails?._id))

    }
    else{
        toast(`${data?.payload?.message}`,{
            style:{
                backgroundColor:'red'
            }
        })
    }
    setRating(0)
    setReviewMessage('')
}).catch(err=>{
    console.log(err,'err while adding review')
    
})


  }
useEffect(()=>{
    if(productDetails!==null) dispatch(getProductAllReview(productDetails?._id));

},[productDetails])

const averageReview = reviews && reviews.length>0?(reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/ reviews.length ).toFixed(1) :0;

  console.log(orderList,'orders list in productDetails')
  console.log(reviews,"reviews list")
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] h-[98%] overflow-y-auto  '>
                <div className='relative overflow-hidden rounded-lg'>
                 

                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}

                        width={600}
                        height={600}
                        className='aspect-square w-full object-cover'


                    />
                </div>
                <div className='w-full' >
                    <div className='w-full'>
                        <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
                        <p className='text-muted-foreground mt-4 mb-5'>
                            {productDetails?.description}

                        </p>

                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={` ${productDetails?.salePrice > 0 ? 'line-through' : null} text-3xl font-bold   text-muted-foreground`} >

                            ${productDetails?.price}
                        </p>
                        {
                            productDetails?.salePrice > 0 ? <p className='text-2xl font-bold text-primary '>${productDetails?.salePrice}</p> : null
                        }
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='flex items-center gap-0.5'>
                            <StarRatingComponent rating = {averageReview} disabled={true}/>

                        </div>
                        <span className='text-muted-foreground'>({averageReview})</span>

                    </div>

                    <div className='mt-5 mb-5'>

                        {
                            productDetails?.totalStock===0? <Button className='w-full shadow-xl  active:shadow-inner opacity-70 cursor-not-allowed'   >
                            Out of Stock 

                        </Button>: <Button className='w-full shadow-xl  active:shadow-inner ' onClick={()=>handleAddtoCart(productDetails?._id,productDetails?.totalStock)} >
                            Add to Cart

                        </Button>
                        }
                        
                    </div>
                    <Separator />
                    <div className='max-h-[300px] overflow-auto'>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grid gap-6'>
{
    reviews && reviews.length>0?
    reviews.map(review=>  <div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback >
                                       {
                                         `${review?.userName[0].toUpperCase()}${review?.userName.indexOf(" ")!==-1? review?.userName[review.userName.indexOf(" ")+1].toUpperCase():''}`
                                       }
                                    </AvatarFallback>

                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>{review?.userName}</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                     <StarRatingComponent rating={review.reviewValue}  disabled={true} />
                                    </div>
                                    <p className='text-muted-foreground'>
                                       ${review.reviewMessage}
                                    </p>
                                </div>
                            </div>):"Be the First one to add review"
}


                           
                                   <div className='mt-10 flex flex-col gap-2'>
                                    <Label>Write a Review</Label>
                                    <div className='flex gap-1'>
                                        <StarRatingComponent rating={rating} setRating={setRating}/>

                                    </div>
                                    <Input  placeholder='Write a review..' name='reviewMsg ' onChange={(e)=>setReviewMessage(e.target.value)} value={reviewMessage}  />
                                    <Button disabled={reviewMessage.trim()===""}  onClick={handleAddReview}>Submit</Button>

                                   </div>
                        </div>

                    </div>

                </div>

            </DialogContent>

        </Dialog>

    )
}

export default ProductDetailsDialog