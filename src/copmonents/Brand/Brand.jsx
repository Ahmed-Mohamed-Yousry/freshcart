import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import style from './Brand.module.css'; // Ensure this file exists and is properly configured

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch brands data
  async function getBrands() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  // Filter brands based on search query
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Brands</title>
          <link rel="canonical" href="http://mysite.com/brands" />
        </Helmet>
      </div>

      <div className='py-40 md:mx-10'>
        {/* Search Input */}
        <div className='mb-4 mx-4'>
          <input
            type='text'
            placeholder='Search by brand name...'
            className='w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-600'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='row'>
          {filteredBrands.length > 0 ? filteredBrands.map((brand) => (
            <div key={brand.id} className='md:w-3/12 w-11/12 mt-16 px-2'>
              <div className='shadow-md p-1 bg-gray-600 rounded-md hover:shadow-2xl hover:shadow-gray-500'>
                <img src={brand.image} className='imgBrand rounded-t-md' alt={brand.name} />
                <div className="p-3">
                  <p className='catgoryStyle mt-2 text-xl font-semibold text-center'>{brand.name}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="preLoader text-center">
              <span className="loader"></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
