import React, { useEffect, useState } from 'react'
import style from './ProtectRoutes.module.css'
import { Navigate } from 'react-router-dom'


export default function ProtectRoutes(props) {
    const [count, setcount] = useState(0)

    if(localStorage.getItem('userToken')!=null){
return props.children
    }
else{
return <Navigate to='/login'/>
}
    useEffect(()=>{
    },[])
  return <>
  </>
}
