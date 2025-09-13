import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
  import { Badge } from '../ui/badge'
import { useState } from 'react'
import AdminOrderDetailsView from './order-details'
import { Dialog } from '../ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin } from '@/store/admin/order-slice'
import { setOrderDetails } from '@/store/admin/order-slice'
const statusFormControlMap={
inProcess: "In Process",
inShipping : "In Shipping",
rejected: "Rejected" ,
pending: "Pending",
delivered:"Delivered",
confirmed:"Confirmed"
}
function AdminOrdersView() {
    const [openDetailsDialog,setOpenDetailsDialog] =useState(false)
    const {orderList, orderDetails} = useSelector(state=>state.adminOrder)
   const dispatch= useDispatch();

   function handleFetchOrderDetailsForAdmin(orderId){

dispatch(getOrderDetailsForAdmin(orderId));
   }


    useEffect(()=>{
       if(orderDetails!==null){
         setOpenDetailsDialog(true)
       }
      },[orderDetails])

    useEffect(()=>{
      dispatch(getAllOrdersForAdmin())
    },[dispatch])

    console.log(orderDetails,"orderDetails")
  return (

       <Card>
      <CardHeader>
        <CardTitle>
          All Orders
        </CardTitle>
      </CardHeader>
       <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Order Id</TableHead>
              <TableHead> Order Date</TableHead>
              <TableHead> Order Status</TableHead>
              <TableHead> Order Price</TableHead>
<TableHead> <span className='sr-only'></span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            
            {
              orderList &&orderList.length>0 ?
              orderList.map(orderItem=>(<TableRow>
              <TableCell>{orderItem._id}</TableCell>
              <TableCell>{new Date(orderItem.orderDate).toDateString()}</TableCell>
              <TableCell> 
                <Badge className={` rounded-full py-1  w-25 ${orderItem?.orderStatus==='confirmed' ? 'bg-green-500 ':orderItem?.orderStatus==='rejected'?'bg-red-600':'bg-gray-600'}`}>
   {orderItem?.orderStatus?
                                statusFormControlMap[orderItem?.orderStatus]:null
                                 }
                </Badge>
              </TableCell>
              <TableCell>${orderItem.totalAmount}</TableCell>
              <TableCell>
                <Dialog open={openDetailsDialog} onOpenChange={()=>{setOpenDetailsDialog(!openDetailsDialog) ; dispatch(setOrderDetails())}}  >
 <Button onClick={()=>{handleFetchOrderDetailsForAdmin(orderItem._id)}}    >view details </Button>
 
 
     <AdminOrderDetailsView orderDetails={orderDetails}/>
                </Dialog>
                
                </TableCell>
            </TableRow>))
                :null

                
              
            } 




            
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrdersView