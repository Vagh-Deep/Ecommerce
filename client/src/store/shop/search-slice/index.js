import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
isLoading:false,
searchResults:[]
}

export const getSearchResults = createAsyncThunk('shoppingSearch/getSearchResults',async(keyword)=>{
    const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/shop/search/${keyword}`
    )

    return response.data;
})
const shoppingSearchSlice = createSlice({
    name:'shoppingSearch',
    initialState,
    reducers:{
        setSearchResults:(state)=>{
            state.searchResults=[]
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getSearchResults.pending,(state)=>{
         state.isLoading=true;
        })
        .addCase(getSearchResults.fulfilled,(state,action)=>{
             state.isLoading=false;
             state.searchResults= action?.payload?.data
        })
        .addCase(getSearchResults.rejected,(state,action)=>{
             state.isLoading=false;
             state.searchResults= []
        })

    }
})

 export const {setSearchResults} = shoppingSearchSlice.actions
  export default shoppingSearchSlice.reducer;