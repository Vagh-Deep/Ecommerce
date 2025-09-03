import CommonForm from '@/components/common/form'
import { loginFormControls } from '../../config/index'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth-slice'
import { toast } from 'sonner'
const initalState = {

  email: "",
  password: ""
}
 
 
function AuthLogin() {
  const [formData, setFromData] = useState(initalState)
  const dispatch= useDispatch()
const navigate=useNavigate()
function onSubmit(event) {
event.preventDefault();
dispatch(loginUser(formData)).then((data)=>{
  console.log(data)
   
  if(data?.payload?.success){
     
toast(`${data.payload.message}`)
  }
  else{
    toast(`${data.payload.message}`,)
  }
})



}
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-light text-foreground'>Log In </h1>
        <p>Don't  have an account
          <Link to='/auth/register' className='font-medium text-primary hover:underline'> Register
          </Link>
        </p>
      </div>
      <CommonForm formControls={loginFormControls}
        formData={formData}
        setFormData={setFromData}
        onSubmit={
          onSubmit
        }
        buttonText={"Sign In"}>

      </CommonForm>
    </div>
  )
}

export default AuthLogin