import  { useContext, useEffect, useState } from 'react'

import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'

export default function Forgetpass() {

    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)


let navigate =useNavigate()
    let user = {
        email:'',
    }

async function forgetform(val){
    setloading(true)
    let response= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , val)
    .then((resp)=>{

        console.log(resp);
        navigate('/verfiy')
    setloading(false)

    })
    .catch((resp)=>{

seterror(resp?.response?.data.statusMsg)
setloading(false)

    })
    
}



let valdite = Yup.object().shape({
    email:Yup.string().required('email required').email('invalied email'),

})
let formik =useFormik({
    initialValues:user ,
    onSubmit:forgetform,
    validationSchema:valdite,
})


    
  return <>
 <div className='login mt-7'>
 <div className='row flex-col text-black  '>
    <h2 className='text-center pb-4 pt-20 text-4xl font-semibold  dark:text-black'>Forgot Password</h2>
    <div className='starEditor text-center py-4 relative'>
<div className='starEditorBeforeProtfoli'></div>
<i className="fa-solid fa-star "></i>
<div className='starEditorAfterProtfoli'></div>
  </div>
  </div>  

  <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-10" >


  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:green-600  dark:border-green-600 dark:focus:border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="email" className=" text-1xl peer-focus:font-medium absolute  green-600  dark:green-600 -400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">user Email</label>
  </div>
  {formik.errors.email && formik.touched.email ?  <div class="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
 {formik.errors.email}
 </div> : null }



 


{error?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {error}
</div> : null }


  <button type="submit"  className="focus:outline-none text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loading ? <i className="fa-solid fa-spinner px-1 fa-spin"></i> : 'submit'} </button>
  
  
  <Link to={'/login'}>
 <button type="submit"  className=" hover:underline text-green-700 focus:ring-4  font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2"> Back </button>
 </Link>
  </form>

  </div>







  

  </>
}
