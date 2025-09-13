import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/order-slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

function PaypalReturn() {
  const dispatch=useDispatch()
  const location=useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId= params.get('paymentId');
  const payerId= params.get('PayerID')


  useEffect(()=>{
    if(paymentId && payerId){
      const getCurrentOrderId= JSON.parse(sessionStorage.getItem('currentOrderId'));
      console.log(getCurrentOrderId,'orderID')
      dispatch(capturePayment({paymentId,payerId,orderId:getCurrentOrderId})).then(data=>{
        if(data?.payload?.success){

          sessionStorage.removeItem('currentOrderId')
          window.location.href='/shop/payment-success'
        
        }
      })
    }
  },[paymentId,payerId,dispatch])
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Processing Payment... Please Wait Do NOt Refresh the Page 
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturn