import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser, resetTokenAndCredentials } from '@/store/auth-slice'
import UserCartWrapper from './cart-wrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'
import { Label } from '../ui/label'
function MenuItems() {
  const navigate=useNavigate()
  const location = useLocation()
  const [searchParams,setSearchParams] = useSearchParams();
  function handleNavigate(getCurrentMenuItem){
    console.log(getCurrentMenuItem,'pressed in menu item')
    sessionStorage.removeItem('filters');
    const currentFilter=getCurrentMenuItem.id!=='home'&&getCurrentMenuItem.id!=='products' && getCurrentMenuItem.id!=='search'?{
      category:[getCurrentMenuItem.id]
    }:null
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
location.pathname.includes('listing') && currentFilter !==null ?setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)):
    navigate(getCurrentMenuItem.path)
      
  }
  return (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row' >
      {
        shoppingViewHeaderMenuItems.map(menuItem => (
          <Label key={menuItem.id} to={menuItem.path} className='text-sm font-medium cursor-pointer ' onClick={()=>handleNavigate(menuItem)}>
            {menuItem.label
            }
          </Label>))
      }

    </nav>
  )
}
function HeaderRightContent() {
  const { user } = useSelector(state => state.auth);
  const [openCartSheet,setOpenCartSheet] = useState(false)
   const {cartItems}= useSelector(state=>state.shopCart)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // function handleLogout(e) {
  //   e.preventDefault();
  //   dispatch(logoutUser()).then(data => {
  //     if (data?.payload?.success) { 
  //       toast("logged out successfully");

  //     }

  //   }).catch(err => {
  //     console.log(err)
  //   })


  // }
  function handleLogout(e) {
    e.preventDefault();
    dispatch(resetTokenAndCredentials())
    sessionStorage.clear()
    navigate('/auth/login')


  }

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))

  },[])
  console.log(cartItems,"cart Items")
  // console.log(user)
  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4' >
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
 <Button variant='outline' size='icon' className={'relative'} onClick={()=>setOpenCartSheet(true)}>
        <ShoppingCart className='w-6 h-6' />
         <span className='absolute top-0 right-0 text-sm font-bold'>{cartItems?.items?.length?cartItems?.items?.length:''}</span>
        
        <span className='sr-only'>user cart</span>
      </Button>
       
      <UserCartWrapper cartItems={cartItems &&cartItems.items && cartItems.items.length>0?cartItems.items:[] } setOpenCartSheet={setOpenCartSheet}/>
      </Sheet>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='bg-black'>
            <AvatarFallback className='bg-black text-white font-extrabold' >
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar >

        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' className='w-56'>
          <DropdownMenuLabel> Logged in as {user?.userName.toUpperCase()}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { navigate('/shop/account') }}>
            <UserCog className='mr-2 h-4 w-4' />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' />
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background' >
      <div className='flex h-16  items-center justify-between px-4 md:px-6'>
        <Link className='items-center flex gap-2' to='/shop/home'>
          <HousePlug className='h-6 w-6' />
          <span className='font-bold'>
            Ecommerce
          </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className={'lg:hidden'}>
              <Menu className='h-6 w-6' />
              <span className='sr-only' >Toggle header menu</span>
            </Button>

          </SheetTrigger>
          <SheetContent side='left' className='w-full max-w-xs'>
            <MenuItems />
            <HeaderRightContent/>
          </SheetContent>
        </Sheet>

        <div className='hidden lg:block'>
          <MenuItems />

        </div>
         <div className='hidden lg:block'> <HeaderRightContent /></div> 
      
      </div>
    </header>
  )
}

export default ShoppingHeader
