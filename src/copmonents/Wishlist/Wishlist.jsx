import React, { useContext, useEffect, useState } from "react";
import { CartContext } from '../Context/CartContext';

import { WishlistContext } from "../Context/WishlistContext";
// import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Wishlist() {
  let { addProduct, setcart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const [productId, setProductId] = useState(null);

  const [wishlistItems, setwishlistItems] = useState(null);


  let { getWishlist  , removeWishlist } = useContext(WishlistContext);


  async function getwishcart() {
    let response = await getWishlist();
    console.log(response);
    setwishlistItems(response?.data.data);

  }

  async function addproductToCart(prodId) {
    setProductId(prodId);
    setLoading(true);
    let response = await addProduct(prodId);
    if (response.data.status === "success") {
      setLoading(false);
      setcart(response.data);
      toast.success(response.data.message);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  }
  async function removeWishlistProduct(prodId ) {
    let response = await removeWishlist(prodId );
    console.log(response.data.data);
    
    setwishlistItems(response?.data.data)
    
  }


  useEffect(() => {
    getwishcart();
  }, [wishlistItems]);
  return (
    <>
    <div>
    <Helmet>
                    <meta charSet="utf-8" />
                    <title>wishlist</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
    </div>
    
    
        <div className='mt-40 row flex-row justify-center align-middle'> 
        <h2 className='text-center font-bold text-white  text-2xl'>wish list</h2>
        
        </div>
       
       <div className="mx-auto overflow-hidden">
       <div className="relative overflow-x-auto mt-10 mb-20 pb-10 px-4 md:px-6 lg:px-8">
  <table className="w-full bg-gray-600 text-sm text-left text-gray-100">
    <thead className="text-xs text-gray-400 uppercase bg-gray-800">
      <tr>
        <th scope="col" className="px-2 py-2 md:px-4 md:py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Product</th>
        <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Price</th>
        <th scope="col" className="px-2 py-2 text-center md:px-10 md:py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      {wishlistItems?.map((product) => (
        <tr key={product.id} className="border-b border-gray-700">
          <td className="p-2 md:p-4">
            <img
              src={product.imageCover}
              className="w-24 md:w-32 lg:w-40 h-auto object-cover"
              alt={product.title}
            />
          </td>
          <td className="px-2 md:px-4 py-2 md:py-4 font-bold text-white">
            {product.title}
          </td>
          <td className="px-2 md:px-4 py-2 md:py-4 font-semibold text-red-500">
            {product.price} EGP
          </td>
          <td className="px-2 md:px-4 py-2 md:py-20 flex flex-col  space-y-2 md:space-y-0 md:justify-center md:align-middle md:flex-row md:space-x-2">
            <button
              onClick={() => { removeWishlistProduct(product.id); }}
              className="font-medium text-gray-400 hover:text-white rounded-md dark:text-red-500 hover:bg-red-500 p-2 md:p-3"
            >
              Remove
            </button>
            <button
              onClick={() => { addproductToCart(product.id); }}
              className="font-medium text-white bg-green-500  rounded-md  p-2 md:p-3"
            >
              Add to Cart
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


       </div>
        
    
        </>
  );
}
