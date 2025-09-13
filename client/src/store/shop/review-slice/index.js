import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    reviews: []
}
export const addNewReview = createAsyncThunk('shopProductReviewSlice/addNewReview', async (reviewData,{rejectWithValue}) => {

    try {
         const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/shop/review/add`, reviewData);

    return response?.data
    } catch (error) {
        console.log(error,'error in addNewReview')

        return rejectWithValue(error.response?.data|| {message:"some erro occured",success:false})
    }
    
})

export const getProductAllReview = createAsyncThunk('shopProductReviewSlice/getProductAllReview', async (productId) => {
    const response =await  axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/shop/review/get/${productId}`,);

    return response?.data
})




const shoppingProductReviewSlice = createSlice({
    name: 'shopProductReviewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewReview.pending, (state) => { 
            state.isLoading=true
        })
            .addCase(addNewReview.fulfilled, (state, action) => {

state.isLoading=false
console.log(action ,'action in add new product thunk')
 
            })
        .addCase(addNewReview.rejected, (state, action) => { 
state.isLoading=false
 console.log(action ,'action in add new product thunk')
        })

        .addCase(getProductAllReview.pending, (state) => { 
   state.isLoading=true
        })
         .addCase(getProductAllReview.fulfilled, (state,action) => {
state.isLoading=false
state.reviews=action?.payload?.data
          })
          .addCase(getProductAllReview.rejected, (state,action) => { 
state.isLoading=false
state.reviews=[]
          })

    },
})

export default shoppingProductReviewSlice.reducer