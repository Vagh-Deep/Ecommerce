import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
function ShoppingOrdersDetails({ orderDetails }) {
    const   {user}= useSelector(state=>state.auth)
    return (
           
         
        <DialogContent className='sm:max-w-[600px] ' >
            <div className='grid gap-6 '>
                <div className='grid gap-2'>
                    <div className='flex items-center justify-between mt-6'>
                        <p className='font-medium'>Order ID</p>
                        <Label>
                            {orderDetails?._id}
                        </Label>

                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <p className='font-medium'>Order Date</p>
                        <Label>
                            {new Date(orderDetails?.orderDate).toDateString()}
                        </Label>

                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <p className='font-medium'>Order Price</p>
                        <Label>
                            ${orderDetails?.totalAmount}
                        </Label>

                    </div>
                      <div className='flex items-center justify-between mt-2'>
                        <p className='font-medium'>Payment Status</p>
                        <Label>
                              <Badge className={` rounded-full py-1  w-25 ${orderDetails?.paymentStatus==='paid' ? 'bg-green-600 ':'bg-gray-600'}`}>
{orderDetails?.paymentStatus}
                </Badge>
                             
                        </Label>

                    </div>
                      <div className='flex items-center justify-between mt-2'>
                        <p className='font-medium'>Payment Method</p>
                        <Label>
                            {orderDetails?.paymentMethod}
                        </Label>

                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <p className='font-medium'>Order Status</p>
                        <Label>
                                <Badge className={` rounded-full py-1  w-25 ${orderDetails?.orderStatus==='confirmed' ? 'bg-green-500 ' :orderDetails?.orderStatus==='rejected'?'bg-red-600' :'bg-gray-600'}`}>
 {orderDetails?.orderStatus}
                </Badge>
                            
                        </Label>

                    </div>


                </div>
                <Separator />
                <div className='grid gap-4 '>

                    <div className='grid gap-2 '>
                        <div className='font-medium'>
                            Order Details
                        </div>
                        <ul className='grid gap-3'>
                    
                            {
                                orderDetails && orderDetails.cartItems && orderDetails?.cartItems.length > 0 ?
                                    orderDetails.cartItems.map(cartItem => <li className='flex items-center justify-between' key={cartItem.productId}>


                                        <span>
                                        {cartItem.title}
                                        </span>
                                        <span>
                                            ${cartItem.price} * {cartItem.quantity}
                                        </span>


                                    </li>) :null

                            }


                        </ul>

                    </div>
                </div>
                <div className='grid gap-4 '>

                    <div className='font-medium'>
                        Shipping Info

                    </div>
                    <div className='grid gap-0.5 text-muted-foreground'>
                        <span>{user?.userName}</span>
                        <span>{orderDetails?.addressInfo?.address}</span>
                        <span>{orderDetails?.addressInfo?.city}</span>
                        <span>{orderDetails?.addressInfo?.pincode}</span>
                        <span>{orderDetails?.addressInfo?.phone}</span>
                        <span>{orderDetails?.addressInfo?.notes}</span>

                    </div>
                </div>

            </div>

        </DialogContent>
    )
}

export default ShoppingOrdersDetails