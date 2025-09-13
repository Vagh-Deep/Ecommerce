import axios from "axios"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'








const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null
}
export const createNewOrder = createAsyncThunk('shoppingOrder/createNewOrder', async (orderData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/shop/order/create`, orderData);
    return response?.data;

})

export const capturePayment = createAsyncThunk('shoppingOrder/capturePayment', async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/shop/order/capture`, { paymentId, payerId, orderId });
    return response?.data;

})

export const getAllOrdersByUser = createAsyncThunk('shoppingOrder/getAllOrdersByUser', async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/shop/order/list/${userId}`);
    return response?.data;

})

export const getOrderDetails = createAsyncThunk('shoppingOrder/getOrderDetails', async (orderId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/shop/order/details/${orderId}`);
    return response?.data;

})







const shoppingOrderSlice = createSlice({
    name: 'shoppingOrder',
    initialState,
    reducers: {
        setOrderDetails:(state,action)=>{
            state.orderDetails=null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state, action) => {
            state.isLoading = true;


        })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderId = action.payload.orderId
                state.approvalURL = action.payload.approvalURL
                sessionStorage.setItem('currentOrderId', JSON.stringify(action?.payload?.orderId))

            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null
            })
            .addCase(getAllOrdersByUser.pending, (state, action) => {
                state.isLoading = true;


            })
            .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderList=action?.payload?.data;
            })
            .addCase(getAllOrdersByUser.rejected, (state, action) => {
                state.isLoading = false
                state.orderList=[]
            })
            .addCase(getOrderDetails.pending, (state, action) => {
                state.isLoading = true

            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderDetails=action?.payload?.data
            })

            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false
                 state.orderDetails=null
            })


    }
})

export const {setOrderDetails} =shoppingOrderSlice.actions
export default shoppingOrderSlice.reducer 