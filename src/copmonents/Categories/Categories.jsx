import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch categories data
  async function getCategories() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Categories</title>
          <link rel="canonical" href="http://mysite.com/categories" />
        </Helmet>
      </div>

      <div className='py-40 md:mx-10'>
        {/* Search Input */}
        <div className='mb-4 mx-4'>
          <input
            type='text'
            placeholder='Search by category name...'
            className='w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-600'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='row'>
          {filteredCategories.length > 0 ? filteredCategories.map((category) => (
            <div key={category.id} className='md:w-4/12 w-11/12 mx-auto mt-16 px-2'>
              <div className='shadow-md p-1 bg-gray-600 rounded-md hover:shadow-2xl hover:shadow-gray-500'>
                <img src={category.image} className='imgCatg rounded-t-md' alt={category.name} />
                <div className="p-3">
                  <p className='catgoryStyle mt-2 text-xl font-semibold'>{category.name}</p>
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
