import React, { useContext, useEffect, useState } from "react";
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from "../Context/WishlistContext";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Wishlist() {
  const { addProduct, setcart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const [wishlistItems, setwishlistItems] = useState([]);
  const { getWishlist, removeWishlist } = useContext(WishlistContext);

  const fetchWishlist = async () => {
    let response = await getWishlist();
    setwishlistItems(response?.data.data || []);
  };

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

  // const addproductToCart = async (prodId) => {
  //   setLoading(true);
  //   let response = await addProduct(prodId);
  //   setLoading(false);
  //   if (response.data.status === "success") {
  //     setcart(response.data);
  //     toast.success(response.data.message);
  //   } else {
  //     toast.error(response.data.message);
  //   }
  // };

  const removeWishlistProduct = async (prodId) => {
    let response = await removeWishlist(prodId);
    if (response.data.status === "success") {
      toast.success("Product removed from wishlist");
      fetchWishlist(); // Refresh the wishlist after removing a product
    } else {
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const limitTitle = (title) => {
    if (typeof title !== 'string' || title.trim() === '') {
      return "No Title"; // Default if title is empty or not a string
    }
    return title.split(" ").slice(0, 2).join(" ");
  };

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>wishlist</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div className="mx-auto overflow-hidden">
        <div className='mt-40 flex justify-center'> 
          <h2 className='text-center font-bold text-white text-2xl'>Wish List</h2>
        </div>

        <div className="relative mt-10 mb-20 pb-10 px-4 md:px-6 lg:px-8">
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
              {wishlistItems.length > 0 ? (
                wishlistItems.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700">
                    <td className="p-2 md:p-4">
                      <img
                        src={product.imageCover || 'placeholder_image_url'} // Fallback image
                        className="w-full md:w-32 lg:w-40 h-auto object-cover"
                        alt={product.title || "Product Image"} // Fallback alt text
                      />
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 font-bold text-white">
                      {limitTitle(product.title)}
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 font-semibold text-red-500">
                      {product.price} EGP
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-20 flex flex-col space-y-2 md:space-y-0 md:justify-center md:flex-row md:space-x-2">
                      <button
                        onClick={() => removeWishlistProduct(product.id)}
                        className="font-medium text-gray-400 hover:text-white rounded-md dark:text-red-500 hover:bg-red-500 p-2 md:p-3"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => addproductToCart(product.id)}
                        className="font-medium text-white bg-green-500 rounded-md p-2 md:p-3"
                      >

            {loading && productId === product.id ? (
              <i className="fa-solid fa-spinner px-1 fa-spin"></i>
            ) : (
              'Add to Cart'
            )}

                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-white">
                    No items in your wishlist.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
