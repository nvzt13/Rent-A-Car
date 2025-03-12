import React from 'react'
import SideMenu from './components/SideMenu'

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* SideMenu sadece medium (md) ve daha büyük ekranlarda gösterilecek */}
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
