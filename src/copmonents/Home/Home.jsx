import React from 'react';
import PropTypes from 'prop-types';
import HomePhoto from '../../assets/imags/avataaars.svg'
import Producte from '../Product/Producte';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';





export default function Home() {
  return <>

<div className='mx-auto overflow-hidden'>  

<div className='flex flex-col HomeStyle pt-32 pb-10 my-7 mx-10'>
  <img className='rounded-full w-82 h-60 mx-auto' src={HomePhoto} alt="" />
  <div className='my-5 text-white '>
  <h3 className='text-center text-5xl font-bold  text-white py-5'>FRESHCART</h3>
  <div className='starEditor text-center py-4 relative'>
<div className='starEditorBefore'></div>
<i class="fa-solid fa-star "></i>
<div className='starEditorAfter'></div>

  </div>
  <p className='text-center'>Electronics - Mobiles - Beauty & Health - Books - Baby & Toys - Home - SuperMarket - Women's Fashion - Men's Fashion - Music</p>
  </div>

  </div>

<CategoriesSlider/>
<Producte/>

</div>

  
  
  </>
}

