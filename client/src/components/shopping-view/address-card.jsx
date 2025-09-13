import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCard({ address,handleDeleteAddress ,handleEditAddress,isBtnDisabled,setCurrentSelectedAddress,currentSelectedAddress}) {
    return <Card className={    `shadow-sm cursor-pointer [&_*]:cursor-pointer ${currentSelectedAddress?._id===address._id?'bg-gray-100':null}`}   onClick={setCurrentSelectedAddress?()=>setCurrentSelectedAddress(address):null}>
        <CardContent className={'grid gap-4'}>
            <Label>
            Address:    {address?.address}

            </Label>
            <Label>
             City:   {address?.city}
            </Label>
            <Label>
             Pincode:   {address?.pincode}
            </Label>

            <Label>
              Phone:  {address?.phone}
            </Label>

            <Label>
              Note:  {address?.notes}
            </Label>

        </CardContent>
        <CardFooter className='flex w-full justify-between'>
            <Button  onClick={()=>{handleEditAddress(address)}}  disabled={isBtnDisabled}>
                Edit
            </Button>
              <Button onClick={()=>handleDeleteAddress(address)} disabled={isBtnDisabled}>
                Delete
            </Button>
        </CardFooter>
    </Card>


}

export default AddressCard