import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
// import { Wishlist } from '../Context/WishlistContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { WishlistContext } from "../Context/WishlistContext";


export default function Producte() {
  let { addProduct, setcart } = useContext(CartContext);
  let { addwishlistProduct  ,removeWishlist, setwish } = useContext(WishlistContext);
  const [product, setproduct] = useState([]);
  const [wishlistitemId , setWishlistitemId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Function to fetch data
  async function getdata() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setproduct(data.data);
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
  async function toggleWishlist (prodId){
    console.log("Toggling wishlist for item:", prodId); // Debug log
  
    try {
      // Check if the item is already in the wishlist
      const isInWishlist = wishlistitemId.includes(prodId);
      console.log("Is in wishlist:", isInWishlist); // Debug log
  
      if (isInWishlist) {
        // Remove item from wishlist
        const response = await removeWishlist(prodId);
        console.log("Remove response:", response); // Debug log
  
        if (response.data.status === "success") {
          setWishlistitemId(prevIds => prevIds.filter(id => id !== prodId));
          toast.success('Removed from wishlist', { duration: 2000, position: 'bottom-left' });
        } else {
          toast.error('Failed to remove from wishlist', { duration: 2000, position: 'bottom-left' });
        }
      } else {
        // Add item to wishlist
        const response = await addwishlistProduct(prodId);
        console.log("Add response:", response); // Debug log
  
        if (response.data.status === "success") {
          setWishlistitemId(prevIds => [...prevIds, prodId]);
          toast.success('Added to wishlist', { duration: 2000, position: 'bottom-left' });
        } else {
          toast.error('Failed to add to wishlist', { duration: 2000, position: 'bottom-left' });
        }
      }
    } catch (error) {
      console.error("Error in toggleWishlist:", error); // Debug log
      toast.error('An error occurred', { duration: 2000, position: 'bottom-left' });
    }
  }
 


  // Function to truncate text to a certain number of words
  const truncateTextByWords = (text, wordCount) => {
    const words = text.split(' ');
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ') + ''; // Join words and add ellipsis
    }
    return text;
  };

  // Fetch data on component mount
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistitemId(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistitemId));
  }, [wishlistitemId]);
  // Filter products based on search query
  const filteredProducts = product.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Product</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <div className='py-10 mt-20 md:mx-10'>
        {/* Search Input */}
        <div className='mb-0 mx-4'>
        <input
  type='text'
  placeholder='Search...'
  className='w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-600'
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

        </div>

        <div className='row'>
          {filteredProducts.length > 0 ? filteredProducts.map((productrecen) => (
            <div key={productrecen.id} className='md:w-3/12 w-11/12 mx-auto mt-10 px-2'>
              <div className='shadow-md p-1 prodseen rounded-md bg-gray-600 hover:shadow-2xl hover:shadow-gray-500'>
                <Link to={`/productDetails/${productrecen.id}/${productrecen.category.name}`}>
                  <div className='parentimg rounded-t-md'>
                    <img src={productrecen.imageCover} className='w-full' alt={productrecen.title} />
                  </div>
                  <div className="p-3">
                    <p className='catgoryStyle mt-2 text-xl font-semibold'>{productrecen.category.name}</p>
                    <h2 className='py-3 text-white text-base font-semibold'>
                      {truncateTextByWords(productrecen.title, 2)} {/* Truncate to 2 words */}
                    </h2>
                    <div className="row justify-between align-middle pb-0">
                      <p className='text-red-600 underline-offset-8 text-base font-extralight'>{productrecen.price}EGP</p>
                      <p className='text-yellow-400 text-base'>
                        <i className="fa-solid fa-star text-yellow-400"></i> {productrecen.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => toggleWishlist(productrecen.id)}
                  className="focus:outline-none mb-16 ps-6"
                >
                  { Array.isArray(wishlistitemId) && wishlistitemId.includes(productrecen.id) ? (
                    <i className=" fa fa-heart text-red-600 text-xl" />
                  ) : (
                    <i className="fa fa-heart text-gray-400 text-xl" />
                  )}

                </button>

               
                <div className='partentbtn items-center align-middle px-6'>
                  <button 
                    onClick={() => addproductToCart(productrecen.id)} 
                    className='chiledbtn btn bg-green-500 w-full align-middle'
                  >
                    {loading && productId === productrecen.id ? (
                      <i className="fa-solid fa-spinner px-1 fa-spin"></i>
                    ) : (
                      'add to cart'
                    )}
                  </button>
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
