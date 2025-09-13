import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogOverlay } from '../ui/dialog'
import { useState } from 'react'
import ShoppingOrdersDetails from './orders-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUser, getOrderDetails, setOrderDetails } from '@/store/shop/order-slice'
import { Badge } from '../ui/badge'

function ShoppingOrders() {
   const [openDetailsDialog,setOpenDetailsDialog] =useState(false)
   const dispatch = useDispatch()
   const {user}= useSelector(state=>state.auth)
   const {orderList,orderDetails}= useSelector(state=>state.shopOrder)
   function handleFetchOrderDetails(orderItemId){
    dispatch(getOrderDetails(orderItemId)) 
    
   }

   useEffect(()=>{
    if(orderDetails!==null){
      setOpenDetailsDialog(true)
    }
   },[orderDetails])

   useEffect(()=>{
       dispatch(getAllOrdersByUser(user?.id))
   },[dispatch])
   console.log(orderDetails,'orderDetails')
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Order History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className={'text-center'}>
            <TableRow>
              <TableHead> Order Id</TableHead>
              <TableHead> Order Date</TableHead>
              <TableHead> Order Status</TableHead>
              <TableHead> Order Price</TableHead>
<TableHead> <span className='sr-only'></span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody   >
           

            {
              orderList &&orderList.length>0 ?
              orderList.map(orderItem=>(<TableRow>
              <TableCell>{orderItem._id}</TableCell>
              <TableCell>{new Date(orderItem.orderDate).toDateString()}</TableCell>
              <TableCell> 
                <Badge className={` rounded-full py-1  w-25 ${orderItem?.orderStatus==='confirmed' ? 'bg-green-500 ':orderItem?.orderStatus==='rejected'?'bg-red-600':'bg-gray-600'}`}>
{orderItem.orderStatus}
                </Badge>
              </TableCell>
              <TableCell>${orderItem.totalAmount}</TableCell>
              <TableCell>
                <Dialog open={openDetailsDialog} onOpenChange={()=>{setOpenDetailsDialog(!openDetailsDialog) ; dispatch(setOrderDetails())}}  >
 <Button onClick={()=>{handleFetchOrderDetails(orderItem._id)}}    >view details </Button>
 
 
       <ShoppingOrdersDetails orderDetails={orderDetails} />
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

export default ShoppingOrders