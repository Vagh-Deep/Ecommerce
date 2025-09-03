import React, { useState } from 'react'
import AdminHeader from './header'
import AdminSideBar from './sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  const [open,setOpen] = useState(false);
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <AdminSideBar open={open} setOpen={setOpen}/>
        <div className='flex flex-1 flex-col'>
            {/*admin header*/}
            <AdminHeader setOpen={setOpen}/>
            <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>

        </div>
    </div>
  )
}
