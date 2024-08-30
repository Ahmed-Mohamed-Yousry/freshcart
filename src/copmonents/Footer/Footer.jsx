import React, { useEffect, useState } from 'react'
import style from './Footer.module.css'

export default function Footer() {
    const [count, setcount] = useState(0)
    useEffect(()=>{
    },[])
  return <>
  <div className='Footer'>
<div className="row lg:flex-row flex-col backGroundFooter justify-between text-white pb-10">

<div className=' mx-auto text-center'>
  <h2 className='pb-4 pt-20 text-2xl font-semibold  dark:text-white'>LOCATION</h2>
  <h4 className='text-1xs'>2215 John Daniel Drive <br /> Clark, MO 65243</h4>
</div>

<div className='mx-auto text-center '>
  <h2 className='pb-4 pt-20 text-2xl font-semibold  dark:text-white'>AROUND THE WEB</h2>
  <div className='flex flex-row  justify-between pt-3'>
<h4 className='w-10 h-10 p-1 rounded-full  ring-2 ring-gray-300 dark:ring-gray-500'>  <i className="fa-brands text-2xl p-1 fa-facebook"></i> </h4>

<h4 className='w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'><i className="fa-brands text-2xl p-1 fa-linkedin"></i> </h4>

<h4 className='w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'> <i className="fa-brands text-2xl p-1 fa-instagram"></i> </h4>


<h4 className='w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500'> <i class="fa-brands text-2xl p-1 fa-twitter"></i> </h4>

  </div>
  
</div>


<div className='mx-auto text-center '>
  <h2 className='pb-4 pt-20 text-2xl font-semibold  dark:text-white'>ABOUT FREELANCER</h2>
  <h4 className='text-1xs'>Freelance is a free to use, licensed Bootstrap theme created <br /> by Route</h4>
</div>

</div>
  </div>
  </>
}
