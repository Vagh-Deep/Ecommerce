import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form';
import { addressFormControls } from '@/config';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from '@/store/shop/address-slice';
import { toast } from 'sonner';
import AddressCard from './address-card';
const intialAddressFromData = {
    address: '',
    city: '',
    pincode: '',
    phone: '',
    notes: ''
}
function Address({setCurrentSelectedAddress,currentSelectedAddress}) {
    const [formData, setFormData] = useState(intialAddressFromData);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector(state => state.shopAddress)
   // const [editMode, setEditMode] = useState(false)
    const [editAddressId,setEditAddressId]= useState(null)
    function handleManageAddress(event) {
        event.preventDefault();
        console.log('managing address')
        dispatch(addNewAddress({ ...formData, userId: user?.id })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id))
                toast("Address added to your account")
                setFormData(intialAddressFromData)
            }
        }).catch(error => {
            toast("Error while adding address to your account");
            console.log(error, "error while adding the address in frontend")
        })


    }
    function isFormValid() {
        return Object.keys(formData).map(key => formData[key].trim() !== '').every(item => item);

    }


    function handleDeleteAddress(address) {


        dispatch(deleteAddress({ userId: user?.id, addressId: address?._id })).then(data => {
            if (data?.payload?.success) {
                toast('address removed successfully')
                dispatch(fetchAllAddresses(user?.id))
            }
        })


    }
    
    function handleEditAddress(addressItem) {
        console.log( editAddressId,'editPressed')
      

        
        if (editAddressId?._id!=addressItem._id||!editAddressId) {
            const { userId, address, city, pincode, phone, notes } = addressItem;
            setFormData({ userId, address, city, pincode, phone, notes });
               setEditAddressId(addressItem);
        }
        else {
            dispatch(editAddress({userId:user?.id ,addressId:addressItem?._id, formData})).then(data=>{
                if(data?.payload?.success){
                    console.log('edit address successfull')
                    toast("Address Edited Successfully")
                    dispatch(fetchAllAddresses(user?.id))
                    setEditAddressId(null)
                    setFormData(intialAddressFromData)
                    
                }
                
            })


        }

    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    }, [])
 console.log(addressList,'addressLIst')

    return <Card>
        <div >
            <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3'>
                {addressList && addressList.length > 0 ?
                    addressList.map(addressItem => <AddressCard address={addressItem} key={addressItem._id} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress} isBtnDisabled={editAddressId?._id===addressItem._id?true:false} setCurrentSelectedAddress={setCurrentSelectedAddress} currentSelectedAddress={currentSelectedAddress} />) : null
                }
            </div>
            {addressList && addressList.length<3 || editAddressId?
              <>  <CardHeader>
                <CardTitle>{editAddressId?'Edit Address': 'Add New Address'}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-5'>

                <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={editAddressId?"Edit":"Add Address"} onSubmit={editAddressId?(e)=>{e.preventDefault();handleEditAddress(editAddressId)}:handleManageAddress} isBtnDisabled={!isFormValid()} />
            </CardContent>
            </> :<div className='text-red-500 p-4'> You have reached the max limit of address </div>}
          
        </div>
    </Card>
}

export default Address