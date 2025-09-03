import React, { Fragment } from 'react'
import { ChartNoAxesCombined } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBasket, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBasket />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <ShoppingBag />
  }
]

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className='mt-8 flex-col flex gap-2' >
      {
        adminSidebarMenuItems.map(menuItem => <div key={menuItem.id} className='flex  text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground' onClick={() => { setOpen ? setOpen(false) : null; navigate(menuItem.path) }}>
          {menuItem.icon}
          <span>{menuItem.label}</span>

        </div>)
      }

    </nav>
  )


}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className='w-64'>
          <div className='flex flex-col h-full' >

            <SheetHeader className='border-b' >
              <SheetTitle className='flex gap-2 mt-5' >
                <ChartNoAxesCombined size={30} />
                <b className='text-2xl font-extrabold'>Admin Panel</b>


              </SheetTitle>


            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>

        </SheetContent>

      </Sheet>

      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div className='flex cursor-pointer items-center gap-2' onClick={() => navigate('/admin/dashboard')} >

          <ChartNoAxesCombined size={30} />
          <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  )
}

export default AdminSideBar