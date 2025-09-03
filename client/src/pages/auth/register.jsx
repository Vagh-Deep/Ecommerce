import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from "sonner"
const initalState={
  userName:"",
  email:"",
  password:""
}
 
function AuthRegister() {
  const [formData,setFormData]= useState(initalState) 
  const dispatch =useDispatch();
 
  const navigate= useNavigate();

  function onSubmit(event){
  event.preventDefault();
  dispatch(registerUser(formData)).unwrap().then((data)=> { console.log(data,"this is data") 
        toast(`${data.message}`)
      
    if(data.success){ 
     
      navigate("/auth/login") }
     

  }).catch((err) => {
    console.error("❌ Error in registerUser:", err)
  })



}
  console.log(formData) 
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-light text-foreground'>Create new account</h1>
        <p>Already have an account
          <Link to='/auth/login'  className='font-medium text-primary hover:underline'>Login
           </Link>
        </p>
      </div>
      <CommonForm  formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit }
        buttonText={"Sign Up"}>
        
      </CommonForm>
    </div>
  )
}

export default AuthRegister