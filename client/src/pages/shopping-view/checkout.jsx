import React, { useState } from 'react'
import backimg from '../../assets/account.jpg'
import Address from '@/components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping-view/cart-items-content';
import { Button } from '@/components/ui/button';
import { createNewOrder } from '@/store/shop/order-slice';
import { MoveRight, ShoppingCart, ShoppingCartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
 
function ShoppingCheckout() {
  const { cartItems } = useSelector(state => state.shopCart);
  const { user } = useSelector(state => state.auth);
  const { approvalURL, orderId,isLoading } = useSelector(state => state.shopOrder)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ?
    cartItems.items.reduce((sum, currentItem) => sum + (
      currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
    ) * currentItem?.quantity, 0) : 0;

  function handleInitiatePaypalPayment() {
    if(!currentSelectedAddress){
      toast("Select a address",{style:{
        backgroundColor:'red',
        color:'White'
      
        
      }})
      return ;
    }
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.map(cartItem => ({
        productId: cartItem?.productId,
        title: cartItem.title,
        image: cartItem.image,
        price: cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price,

        quantity: cartItem?.quantity


      })) : null,
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: ''
    }


    dispatch(createNewOrder(orderData)).then(data => {
      if (data?.payload?.success) {
        console.log(data);
        setIsPaymentStart(true)


      }

    }).catch(err => {
      console.log(err, 'some error while handling checkout')
      setIsPaymentStart(false)
    })
  }



  console.log(currentSelectedAddress, 'this is current selected address')
  if (approvalURL) {
    window.location.href = approvalURL
  }
  console.log(orderId, "this iis order oid")


  // if(isLoading){
  //   return <div className='flex  bg-muted gap-4 items-center justify-center h-screen w-screen'>
  //     <Skeleton   className={'w-5 h-5 rounded-full bg-gray-400'}/>
  //     <Skeleton   className={'w-5 h-5 rounded-full bg-gray-400'}/>
  //     <Skeleton   className={'w-5 h-5 rounded-full bg-gray-400'}/>



       
  //   </div>
  // }
  return (
    <div className='flex flex-col '>
      <div className='relative h-[300px] w-full overflow-hidden'>

        <img src={backimg} alt="checkoutPageImage" className='h-full w-full object-cover object-center' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5'>
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} currentSelectedAddress={currentSelectedAddress} />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map(cartItem => <UserCartItemsContent cartItem={cartItem} key={cartItem.productId} />) : null
          }
          <div className='mt-8 space-y-4 '>
            {cartItems && cartItems.items && cartItems.items.length > 0 ? <div className='flex justify-between'>
              <span className='font-bold'>
                Total

              </span>
              <span className='font-bold'>


                ${totalCartAmount}

              </span>
            </div> :


              <div className='mt-8 space-6 flex flex-col justify-center items-center gap-10 '>
                 
                <ShoppingCartIcon className='w-40 h-40 text-gray-400 font-bold' />
               
                 <div className='text-3xl text-muted-foreground font-bold text-center'>
                 “Oops! Your cart is feeling lonely 🥺. Add something to keep it company.”
                </div>

                <span className='flex items-center justify-center gap-6'>

                  <Button variant='outline' onClick={() => { navigate('/shop/home') }}>
                    Add Items to Cart   <MoveRight />
                  </Button>



                </span>


              </div>

            }

          </div>
          <div className='w-full flex justify-center mt-4'>

            {
              cartItems && cartItems.items && cartItems.items.length > 0 ? <Button className={`w-full active:shadow-xl active:shadow-inner ${isLoading||isPaymentStart?'cursor-not-allowed ':null}`} onClick={handleInitiatePaypalPayment} disabled={isPaymentStart||isLoading}>
{isPaymentStart || isLoading?' Processing payment....'   :'Checkout with PayPal'}
                 
              </Button> : null
            }

          </div>
        </div>

      </div>

    </div>
  )
}

export default ShoppingCheckout