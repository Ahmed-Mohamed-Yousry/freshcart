import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const { getLoggedCart, updateProduct, removeProduct, deleteAllProduct } = useContext(CartContext);

  async function getCartItem() {
    let response = await getLoggedCart();
    console.log(response?.data.data);
    setCartItems(response?.data.data);
  }

  async function updateCartProduct(prodId, count) {
    let response = await updateProduct(prodId, count);
    console.log(response);
    setCartItems(response.data.data);
  }

  async function removeCartProduct(prodId) {
    let response = await removeProduct(prodId);
    console.log(response.data.data);
    setCartItems(response.data.data);
  }

  async function getDeleteItem() {
    let response = await deleteAllProduct();
    console.log(response);
    setCartItems([]);
  }
  const limitTitle = (title) => {
    if (typeof title !== 'string' || title.trim() === '') {
      return "No Title"; // Default if title is empty or not a string
    }
    return title.split(" ").slice(0, 2).join(" ");
  }; 
  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Cart</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div className="mx-auto ">
        <div className='mt-40  flex flex-row justify-center items-center'>
          <h2 className='text-center font-bold text-white text-2xl'>Shop Now</h2>
        </div>

        <div className="relative mx-auto overflow-x-hidden mt-10 mb-20 pb-10 px-4 md:px-10">
          <table className="w-full bg-gray-600 text-sm text-left text-gray-100">
            <thead className="text-xs uppercase bg-gray-800 text-gray-400">
              <tr>
                <th className="px-2 py-2 md:px-4 md:py-3">
                  <button onClick={getDeleteItem} className='btn bg-green-500 text-white p-2 rounded-lg'>
                    Clear All
                  </button>
                </th>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Product</th>
                <th scope="col" className="px-2 py-2 text-center md:px-4 md:py-3">Qty</th>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Price</th>
                <th scope="col" className="px-2 py-2 md:px-4 md:py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.products?.map((product) => (
                <tr key={product.product._id} className="border-b border-gray-700">
                  <td className="p-2 md:p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-24 lg:w-32 h-auto object-cover"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-2 md:px-4 py-2 font-semibold text-white">
                   {limitTitle(product.product.title)}
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    <div className="flex items-center space-x-1">
                      <button
                        className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button" 
                        onClick={() => updateCartProduct(product.product.id, product.count - 1)}
                      >
                        <span className="sr-only">Decrease Quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>

                      <span>{product.count}</span>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                        type="button" 
                        onClick={() => updateCartProduct(product.product.id, product.count + 1)}
                      >
                        <span className="sr-only">Increase Quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-2 md:px-4 py-2 font-semibold text-red-500">
                    {product.price} EGP
                  </td>
                  <td className=" md:px-4 py-2">
                    <button 
                      onClick={() => removeCartProduct(product.product.id)} 
                      className="font-medium text-gray-400 hover:text-white rounded-md hover:bg-red-500 p-2"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {cartItems?.products?.length > 0 && (
            <div className="text-center mt-8">
              <h3 className="text-xl bg-gray-600 md:text-2xl text-red-500 font-bold mb-6 py-4">
                Total Price{' '}
                <span className="text-red-600 font-normal text-lg md:text-xl">
                  {cartItems?.totalCartPrice} EGP
                </span>
                <Link to={'/checkout'}>
                  <button className='bg-green-500 text-white text-center text-base mx-4 p-3 rounded-md'>
                    Checkout
                  </button>
                </Link>
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
