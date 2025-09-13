
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
isLoading:false,
featureImageList :[]
}

export const addFeatureImage = createAsyncThunk('commonSlice/addFeatureImage',async(image)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/common/feature/add`,{image})
    return response?.data
})

export const getFeatureImages = createAsyncThunk('commonSlice/getFeatureImages',async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/common/feature/get`,)
    return response?.data
})

export const deleteFeatureImage = createAsyncThunk('commonSlice/deleteFeatureImage',async(featureImageId)=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/common/feature/delete/${featureImageId}`,)
    return response?.data
})

const  commonSlice = createSlice({
    name:'commonSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getFeatureImages.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getFeatureImages.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.featureImageList= action?.payload?.data
        })
        .addCase(getFeatureImages.rejected,(state,action)=>{
            state.isLoading=false;
            state.featureImageList= []

        })
          .addCase(addFeatureImage.pending,(state,action)=>{
            state.isLoading=true;
             

        })
.addCase(addFeatureImage.fulfilled,(state,action)=>{
            state.isLoading=false;
             

        })
.addCase(addFeatureImage.rejected,(state,action)=>{
            state.isLoading=false;
             

        })


    }

})

export default commonSlice.reducer