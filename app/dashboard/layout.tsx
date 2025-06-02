import React from 'react'
import SideMenu from './_components/SideMenu'
import AppNavbar from "./_components/AppNavbar";
const Layout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
   <AppNavbar />
      <div className="hidden md:block md:w-1/4 lg:w-1/5">
        <SideMenu />
      </div>
      
      {/* İçerik alanı */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        {children}
      </div>
    </div>
  )
}

export default Layout
