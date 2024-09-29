import React from 'react';
import PropTypes from 'prop-types';
import HomePhoto from '../../assets/imags/avataaars.svg'
import Producte from '../Product/Producte';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';





export default function Home() {
  return <>

<div className='mx-auto overflow-hidden'>  

<div className='flex flex-col HomeStyle pt-32 pb-10 mt-7'>
  <img className='rounded-full w-82 h-60 mx-auto' src={HomePhoto} alt="" />
  <div className='my-5 text-white '>
  <h3 className='text-center text-5xl font-bold  dark:text-white py-5'>start Framework</h3>
  <div className='starEditor text-center py-4 relative'>
<div className='starEditorBefore'></div>
<i class="fa-solid fa-star "></i>
<div className='starEditorAfter'></div>

  </div>
  <p className='text-center'>Graphic Artist - Web Designer - Illustrator</p>
  </div>

  </div>

<CategoriesSlider/>
<Producte/>

</div>

  
  
  </>
}

