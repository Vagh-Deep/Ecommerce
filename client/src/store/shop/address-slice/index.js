import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



export const addNewAddress = createAsyncThunk('shopppingAddress/addNewAddress', async (formData)=>{
    console.log(formData,"form data in addNewAddress")
    const response =  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/shop/address/add`,formData)
    return response?.data;

})
export const fetchAllAddresses = createAsyncThunk('shopppingAddress/fetchAllAddresses', async (userId)=>{
    
    const response =await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/shop/address/get/${userId}`)
    return response?.data;

})
export const editAddress = createAsyncThunk('shopppingAddress/editAddress', async ({userId,addressId,formData})=>{
    
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/shop/address/update/${userId}/${addressId}`,formData)
    return response?.data;

})
export const deleteAddress = createAsyncThunk('shopppingAddress/delteAddress', async ({userId,addressId})=>{
    
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/shop/address/delete/${userId}/${addressId}`)
    return response?.data;

})

const initialState={
    isLoading:false,
    addressList:[]
}


const shoppingAddressSlice = createSlice({
    name:'shoppingAddress',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewAddress.pending,(state,action)=>{
             state.isLoading=true;

        })
        .addCase(addNewAddress.fulfilled,(state,action)=>{
            state.isLoading=false;
          
            
        })
        .addCase(addNewAddress.rejected,(state,action)=>{
             state.isLoading=false;
             
        })
        .addCase(fetchAllAddresses.pending,(state,action)=>{
             state.isLoading=true;
        })
        .addCase(fetchAllAddresses.fulfilled,(state,action)=>{
             state.isLoading=false;
             state.addressList=action?.payload?.data
        })
        .addCase(fetchAllAddresses.rejected,(state,action)=>{
             state.isLoading=false;
             state.addressList=[]
        })
        .addCase(editAddress.pending,(state,action)=>{
             state.isLoading=true;
            
        })
        .addCase(editAddress.fulfilled,(state,action)=>{
             state.isLoading=false;
        })
        .addCase(editAddress.rejected,(state,action)=>{
             state.isLoading=false;
        })
        .addCase(deleteAddress.pending,(state,action)=>{
             state.isLoading=true;
        })
        .addCase(deleteAddress.fulfilled,(state,action)=>{
             state.isLoading=false;
        })
        .addCase(deleteAddress.rejected,(state,action)=>{
             state.isLoading=false;
        })




    }
})

export default shoppingAddressSlice.reducer