import { Route, Router, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminOrders from "./pages/admin-view/orders"
import AdminFeatures from "./pages/admin-view/features"
import AdminProducts from "./pages/admin-view/products"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingListing from "./pages/shopping-view/listing"

import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"

function App() {
     console.log('start app')
   const {isAuthenticated,user,isLoading}= useSelector(state=>state.auth);
   // the following data is used to access the admin page without login 
  // const isAuthenticated=true;
  // const user={ email:'admin@admin',
  //               password:'admin',
  //               role:"admin",
  //               userName:'admin'
  // }
  // const isLoading=false;

   const dispatch= useDispatch()
   useEffect(()=>{
    console.log(" start useeffect")
    dispatch(checkAuth())
    console.log("end useEffect ")

   },[dispatch])     

   if(isLoading) return  (<Skeleton className="h-[300px] w-[300px] bg-gray-900 rounded-full" />)
    console.log('end app')
  return (
    <div className="flex flex-col overlow-hidden bg-white">
       
      <Routes >
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>

        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>

          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />

        </Route>


        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        } >
          <Route path='home' element={<ShoppingHome />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='listing' element={<ShoppingListing />} />

        </Route>
         <Route path='/unauth-page' element={<UnauthPage />} />
        <Route path='*' element={<NotFound />} />

      </Routes>

    </div>
  )
}

export default App
