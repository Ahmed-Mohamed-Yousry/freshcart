import React, { useEffect, useState } from 'react'
import style from './Copyright.module.css'

export default function Copyright() {
    const [count, setcount] = useState(0)
    useEffect(()=>{
    },[])
  return <>
  <div className='CopyRightStyle'>
  <h3 className='text-center text-white py-12'>Copyright © by Ahmed Yousry</h3>
  </div>
  
  </>
}
