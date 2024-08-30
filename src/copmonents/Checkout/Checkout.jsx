import  { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { CartContext } from '../Context/CartContext'


export default function Checkout() {
let {checkoutCart , cartId }= useContext(CartContext)

console.log(cartId);



    let user = {
        
      details:'',
      phone:'',
      city:''
    }
    let formik =useFormik({
      initialValues:user ,
      onSubmit:()=>{
        handleCheckout(cartId ,'http://localhost:5173')
      },
  })

async function handleCheckout(cartId , url){
  let response = await checkoutCart(cartId , url , formik.values)
  console.log(response);
  if(response.data.status === "success"){
    window.location.href=response.data.session.url

  }
  
}




    useEffect(()=>{
    },[])

  return <>
 <div className='Contact mt-7'>
 <div className='row flex-col text-black  '>
    <h2 className='text-center pb-4 pt-20 text-4xl font-semibold  dark:text-black'>Pay now</h2>
    <div className='starEditor text-center py-4 relative'>
<div className='starEditorBeforeProtfoli'></div>
<i className="fa-solid fa-star "></i>
<div className='starEditorAfterProtfoli'></div>
  </div>
  </div>  

  <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-10" >
  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur} type="name" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:green-600  dark:border-green-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="details" className=" text-1xl peer-focus:font-medium absolute  green-600  dark:green-600 -400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your details</label>
  </div>
 



  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} type="phone" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:green-600  dark:border-green-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="phone" className=" text-1xl peer-focus:font-medium absolute  green-600  dark:green-600 -400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
  </div>
  



 <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur} type="city" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:green-600  dark:border-green-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="city" className=" text-1xl peer-focus:font-medium absolute  green-600  dark:green-600 -400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>
  </div>





  <button type="submit"  className="focus:outline-none text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> check Out </button>
  </form>

  </div>







  

  </>
}

