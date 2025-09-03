
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios

from "axios";
 

const initialState={
 isAuthenticated: false,
 isLoading :true,
 user:null
}
export const registerUser =createAsyncThunk('/auth/register', async (formData)=>{
    console.log("start registerUser")
    const response = await axios.post('http://localhost:5000/api/auth/register',formData,{
        withCredentials:true,
        
    })
     console.log("end registerUser ")
     return response.data;
})

export const loginUser = createAsyncThunk('/auth/login',async(formData)=>{
      console.log("start loginUser")

    const response = await axios.post('http://localhost:5000/api/auth/login',formData,{withCredentials:true});
     console.log("end loginUser")
    return response.data;
})
export const logoutUser = createAsyncThunk('/auth/logout',async(formData)=>{
      console.log("start logoutUser")

    const response = await axios.post('http://localhost:5000/api/auth/logout',{},{withCredentials:true});
     console.log("end logoutUser")
    return response.data;
})

export const checkAuth = createAsyncThunk('/auth/checkauth',async()=>{
      console.log("start checkAuth")
    const response = await axios.get('http://localhost:5000/api/auth/check-auth',{withCredentials:true,
         headers:{
            "Cache-Control":'no-store, no-cache, must-revalidate,proxy-revalidate',
            
         }});
    console.log("end checkAuth")

    return response.data;


})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
            state.isLoading= true
            console.log(action)
            console.log(state.isAuthenticated,state.isLoading,state.user)
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.user= null
            state.isAuthenticated=false
             console.log(action)
             console.log(state.isAuthenticated,state.isLoading,state.user)
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.user= null
            state.isAuthenticated=false
             console.log(action)
            console.log(state.isAuthenticated,state.isLoading,state.user)

        })
        .addCase(loginUser.pending,(state,action)=>{
            state.isLoading=true
             console.log(action)
            console.log(state.isAuthenticated,state.isLoading,state.user)
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=action.payload.success?true:false
            
            state.user=action.payload.success?action.payload.user:null
             console.log(action)
             console.log(state.isAuthenticated,state.isLoading,state.user)
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false
             console.log(action)
             console.log(state.isAuthenticated,state.isLoading,state.user)
        })
        .addCase(checkAuth.pending,(state,action)=>{
            state.isLoading=true
 console.log(action)
             console.log(state.isAuthenticated,state.isLoading,state.user)
        })
         .addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=action.payload.success
            state.user=action.payload.success? action.payload.user:null
             console.log(action)
             console.log(state.isAuthenticated,state.isLoading,state.user)
        })
         .addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=false
            state.user=null
             console.log(action)
             console.log(state.isAuthenticated,state.isLoading,state.user)
        })
         .addCase(logoutUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated= false
            state.user= null
        })
    }
})

export const {setUser}= authSlice.actions
export default authSlice.reducer