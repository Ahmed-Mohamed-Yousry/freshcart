import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { WishlistContext } from "../Context/WishlistContext";

export default function Producte() {
  let { addProduct, setcart } = useContext(CartContext);
  let { addwishlistProduct, removeWishlist } = useContext(WishlistContext);
  const [product, setproduct] = useState([]);
  const [wishlistitemId, setWishlistitemId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTwoColumnLayout, setIsTwoColumnLayout] = useState(false); // State for layout

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

  async function toggleWishlist(prodId) {
    try {
      const isInWishlist = wishlistitemId.includes(prodId);
      if (isInWishlist) {
        const response = await removeWishlist(prodId);
        if (response.data.status === "success") {
          setWishlistitemId(prevIds => prevIds.filter(id => id !== prodId));
          toast.success('Removed from wishlist');
        } else {
          toast.error('Failed to remove from wishlist');
        }
      } else {
        const response = await addwishlistProduct(prodId);
        if (response.data.status === "success") {
          setWishlistitemId(prevIds => [...prevIds, prodId]);
          toast.success('Added to wishlist');
        } else {
          toast.error('Failed to add to wishlist');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  }

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

  const filteredProducts = product.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to truncate title to three words
  const truncateTitle = (title) => {
    const words = title.split(' ');
    return words.length > 3 ? words.slice(0, 2).join(' ') + '...' : title;
  };

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
        <div className='mb-10 mx-4'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-600'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Layout Toggle Buttons (Mobile Only) */}
        <div className='flex justify-center mb-4 md:hidden'>
          <button 
            onClick={() => setIsTwoColumnLayout(true)} 
            className={`p-2 ${isTwoColumnLayout ? 'bg-white rounded-lg me-4' : ''}`}
          >
            <i className="fa-solid fa-grip-lines-vertical"></i> {/* Two columns layout */}
          </button>
          <button 
            onClick={() => setIsTwoColumnLayout(false)} 
            className={`p-2 ${!isTwoColumnLayout ? 'bg-white rounded-lg' : ''}`}
          >
            <i className="fa-solid fa-grip-lines"></i> {/* Single column layout */}
          </button>
        </div>

        {/* Product Grid */}
        <div className={`grid gap-4 ${isTwoColumnLayout ? 'grid-cols-2 px-6 ' : 'grid-cols-1 px-8 '} md:grid-cols-4`}>
          {filteredProducts.length > 0 ? filteredProducts.map((productrecen) => (
            <div key={productrecen.id} className='shadow-md mb-6 p-1 prodseen rounded-md bg-gray-600 hover:shadow-2xl hover:shadow-gray-500'>
              <Link to={`/productDetails/${productrecen.id}/${productrecen.category.name}`}>
                <div className='parentimg rounded-t-md'>
                  <img src={productrecen.imageCover} className='w-full' alt={productrecen.title} />
                </div>
                <div className="p-3">
                  <p className='catgoryStyle mt-2 text-xl font-semibold'>{productrecen.category.name}</p>
                  <h2 className='py-3 text-white text-base font-semibold'>
                    {truncateTitle(productrecen.title)} {/* Truncate to 3 words */}
                  </h2>
                  <div className="row justify-between align-middle pb-0">
                    <p className='text-red-600 underline-offset-8 text-base font-extralight'>{productrecen.price}EGP</p>
                    <p className='text-yellow-400 text-base'>
                      <i className="fa-solid fa-star text-yellow-400"></i> {productrecen.ratingsAverage}
                    </p>
                  </div>
                </div>
              </Link>
<div className='mb-4  '>
<button
                onClick={() => toggleWishlist(productrecen.id)}
                className="focus:outline-none mb-16 ps-6"
              >
                {Array.isArray(wishlistitemId) && wishlistitemId.includes(productrecen.id) ? (
                  <i className="fa fa-heart text-red-600 text-xl" />
                ) : (
                  <i className="fa fa-heart text-gray-400 text-xl" />
                )}
              </button>
</div>
              

              <div className='partentbtn items-center align-middle px-6'>
                <button 
                  onClick={() => addproductToCart(productrecen.id)} 
                  className='chiledbtn btn  bg-green-500 w-full align-middle'
                >
                  {loading && productId === productrecen.id ? (
                    <i className="fa-solid fa-spinner px-1 fa-spin"></i>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
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
