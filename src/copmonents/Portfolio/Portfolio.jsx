import React, { useEffect, useState } from 'react'
import style from './Portfolio.module.css'
import photoProt1 from '../../assets/imags/poert1.png'
import photoProt2 from '../../assets/imags/port2.png'
import photoProt3 from '../../assets/imags/port3.png'


export default function Portfolio() {
    const [count, setcount] = useState(0)
    useEffect(()=>{
    },[])
  return <>
  <div className='About bg-white mt-7'>

  
    <div className='row flex-col text-black  '>
    <h2 className='text-center pb-4 pt-20 text-4xl font-semibold  dark:text-black'>PROTOFOLIO</h2>
    <div className='starEditor text-center py-4 relative'>
<div className='starEditorBeforeProtfoli'></div>
<i class="fa-solid fa-star "></i>
<div className='starEditorAfterProtfoli'></div>
  </div>
  </div>
 
 
  <div className='text-white row md:px-20 px-5'>
    <div className="mx-auto md:grid grid-flow-col">
<div className='chilled1 pb-0 pt-0 md:px-10 px-0 '>
  <img className='py-6 w-full rounded' src={photoProt1} alt="" />
  <img className='py-6 w-full rounded-lg' src={photoProt1} alt="" />

</div>
<div className='chilled2 pb-0 pt-0 md:px-10 px-0'>
 <img className='py-6 w-full rounded-lg' src={photoProt2} alt="" />
 <img className='py-6 w-full rounded-lg' src={photoProt2} alt="" />

</div>
<div className='chilled3 pb-0 pt-0 md:px-10 px-0'>
 <img className='py-6 w-full rounded-lg' src={photoProt3} alt="" />
 <img className='py-6 w-full rounded-lg' src={photoProt3} alt="" />

</div>
</div>
  </div>
  </div>
  </>
}
