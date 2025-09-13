import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentSuccessPage() {
  const navigate= useNavigate()
  return (
   <Card className={'p-10'}>
      <CardHeader>
        <CardTitle className='text-4xl'>
          Payment SuccessFull
        </CardTitle>
      </CardHeader>
      <Button className={'mt-5 w-30'} onClick={()=>navigate('/shop/account')}>View Orders</Button>
    </Card>
  )
  
}

export default PaymentSuccessPage