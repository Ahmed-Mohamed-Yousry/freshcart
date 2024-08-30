import React, { useEffect, useState } from 'react'
import style from './About.module.css'

export default function About() {
    const [count, setcount] = useState(0)
    useEffect(()=>{
    },[])
  return <>

 
  <div className='row flex-col text-white mt-7'>
    <h2 className='text-center pb-4 pt-20 text-4xl font-semibold  dark:text-white'>ABOUT COMPONENT</h2>
    <div className='starEditor text-center py-4 relative'>
<div className='starEditorBefore'></div>
<i class="fa-solid fa-star "></i>
<div className='starEditorAfter'></div>

  </div>
  </div>

  <div className='text-white '>
    <div className="mx-auto md:grid grid-flow-col">
<div className='chilled1 pb-20 pt-10 md:px-20 px-10 '>
  <p>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
</div>
<div className='chilled2 pb-20 pt-10 md:px-20 px-10'>
  <p>Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p>
</div>
</div>
  </div>
  </>
}
