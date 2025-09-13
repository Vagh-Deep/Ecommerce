
import axios from "axios"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState={
    orderList:[],
    isLoading:false,
    orderDetails:null
}


export const getAllOrdersForAdmin = createAsyncThunk('shoppingOrder/getAllOrdersForAdmin', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/order/list`);
    return response?.data;

})
export const getOrderDetailsForAdmin = createAsyncThunk('shoppingOrder/getOrderDetailsForAdmin', async (orderId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/order/details/${orderId}`);
    return response?.data;

})

export const updateOrderStatusForAdmin = createAsyncThunk('shoppingOrder/updateOrderStatusForAdmin', async ({orderId,orderStatus}) => {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/admin/order/update/${orderId}`,{orderStatus});
    return response?.data;

})



const adminOrderSlice= createSlice({
    name:'adminOrder',
    initialState,
    reducers:{
setOrderDetails:(state,action)=>{
            state.orderDetails=null;
        }
    },
    extraReducers:(builder)=>{
        builder .addCase(getAllOrdersForAdmin.pending, (state, action) => {
                        state.isLoading = true;
        
        
                    })
                    .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.orderList=action?.payload?.data;
                    })
                    .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
                        state.isLoading = false
                        state.orderList=[]
                    })
                    .addCase(getOrderDetailsForAdmin.pending, (state, action) => {
                        state.isLoading = true
        
                    })
                    .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.orderDetails=action?.payload?.data
                    })
        
                    .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
                        state.isLoading = false
                         state.orderDetails=null
                    })
        

    }

})
export const {setOrderDetails} = adminOrderSlice.actions
export default  adminOrderSlice.reducer