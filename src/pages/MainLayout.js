import React from 'react'
import Navbar from '../ui/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/Footer/Footer'
import { useSelector } from 'react-redux';
import { getShowSearch } from '../features/search/searchSlice';
import Overlay from '../components/Overlay/Overlay';

function MainLayout() {
  const showSearch = useSelector(getShowSearch);

  return (
    <>
        <Navbar />
            {showSearch && <Overlay />}
            <Outlet />
        <Footer />
    </>
  )
}

export default MainLayout