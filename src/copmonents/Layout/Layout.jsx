import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar'
import Footer from './../Footer/Footer'
import { Offline } from "react-detect-offline";
import Copyright from '../Copyright/Copyright'
import { useFormik } from 'formik'

export default function Layout() {
    const [count, setcount] = useState(0)
    useEffect(()=>{
    },[])
  return <>
 <Navbar/>
<div className='container mx-auto '>
<Outlet/>
</div>
<div className='top-80 shadow-md fixed start-3 rounded-md border-spacing-5 text-gray-600  bg-white'>
<Offline>please conect network</Offline>
</div>

<Footer/>
<Copyright/>
  </>
}
