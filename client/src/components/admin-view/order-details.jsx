import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { useState } from 'react'
import { Badge } from '../ui/badge'
import { useDispatch } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, setOrderDetails, updateOrderStatusForAdmin } from '@/store/admin/order-slice'
import { toast } from 'sonner'
const statusFormControlMap={
inProcess: "In Process",
inShipping : "In Shipping",
rejected: "Rejected" ,
pending: "Pending",
delivered:"Delivered"
}
const statusFormControls = [{
    label: "Order Status",
    name: "status",
    componentType: "select",
    options: [
        { id: 'inProcess', label: "In Process" },
        { id: 'inShipping', label: "In Shipping" },
        { id: 'rejected', label: "Rejected" },
        { id: 'pending', label: "Pending" },
        { id: 'delivered', label: "Delivered" },

    ],
}]
function AdminOrderDetailsView({ orderDetails }) {
    const initialFormData = {
        status:''

    }
     
    const [formData, setFormData] = useState(initialFormData)
    const dispatch= useDispatch()

    
    function handleUpdateStatus(event) {
        console.log(formData,'fromData')
        event.preventDefault()
        const {status} = formData;
        dispatch(updateOrderStatusForAdmin({orderStatus:status,orderId:orderDetails._id})).then(data=>{
            if(data?.payload?.success){
                toast('order Status updated Successfully')
                dispatch(setOrderDetails());
                dispatch(getOrderDetailsForAdmin(orderDetails?._id))
                  dispatch(getAllOrdersForAdmin())
                
                setFormData(initialFormData)
            }
        })
    }

    return (

        <DialogContent className='sm:max-w-[600px] overflow-y-auto h-[95%]' >
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
                            <Badge className={` rounded-full py-1  w-25 ${orderDetails?.paymentStatus === 'paid' ? 'bg-green-600 ' : 'bg-gray-600'}`}>
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
                            <Badge className={` rounded-full py-1  w-25 ${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-500 ' :orderDetails?.orderStatus==='rejected'?'bg-red-600' : 'bg-gray-600'}`}>
                                {orderDetails?.orderStatus?
                                statusFormControlMap[orderDetails?.orderStatus]:null
                                 }
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


                                    </li>) : null

                            }


                        </ul>

                    </div>
                </div>
                <div className='grid gap-4 '>

                    <div className='font-medium'>
                        Shipping Info

                    </div>
                    <div className='grid gap-0.5 text-muted-foreground'>
                        {/* <span>{user?.userName}</span> */}
                        <span>{orderDetails?.addressInfo?.address}</span>
                        <span>{orderDetails?.addressInfo?.city}</span>
                        <span>{orderDetails?.addressInfo?.pincode}</span>
                        <span>{orderDetails?.addressInfo?.phone}</span>
                        <span>{orderDetails?.addressInfo?.notes}</span>

                    </div>
                </div>
                <div>
                    <CommonForm formControls={statusFormControls} formData={formData} setFormData={setFormData} buttonText={'Update Order Status'} onSubmit={handleUpdateStatus} />
                </div>
            </div>

        </DialogContent>

    )
}

export default AdminOrderDetailsView