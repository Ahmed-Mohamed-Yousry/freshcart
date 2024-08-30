import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from "../Context/WishlistContext";
import { Helmet } from 'react-helmet';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const StyledSlider = styled(Slider)`
  .slick-dots li button:before {
    color: white; /* Change dot color to white */
  }
  .slick-dots li.slick-active button:before {
    color: white; /* Ensure the active dot is also white */
  }
`;

export default function ProductDetails() {
  let { addwishlistProduct, removeWishlist } = useContext(WishlistContext);
  const [wishlistitemId, setWishlistitemId] = useState([]);
  const [ProductDetails, setProductDetails] = useState({});
  const [Relatsprod, setRelatsprod] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  let { addProduct, setcart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const { id, category } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
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

  async function getProductDetails(id) {
    const resp = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProductDetails(resp.data.data);
  }

  async function toggleWishlist(prodId) {
    console.log("Toggling wishlist for item:", prodId);
    try {
      const isInWishlist = wishlistitemId.includes(prodId);
      console.log("Is in wishlist:", isInWishlist);
      if (isInWishlist) {
        const response = await removeWishlist(prodId);
        console.log("Remove response:", response);
        if (response.data.status === "success") {
          setWishlistitemId(prevIds => prevIds.filter(id => id !== prodId));
          toast.success('Removed from wishlist');
        } else {
          toast.error('Failed to remove from wishlist');
        }
      } else {
        const response = await addwishlistProduct(prodId);
        console.log("Add response:", response);
        if (response.data.status === "success") {
          setWishlistitemId(prevIds => [...prevIds, prodId]);
          toast.success('Added to wishlist');
        } else {
          toast.error('Failed to add to wishlist');
        }
      }
    } catch (error) {
      console.error("Error in toggleWishlist:", error);
      toast.error('An error occurred');
    }
  }

  async function getRelatedProducts() {
    const resp = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    let allProduct = resp.data.data;
    let relatedProducts = allProduct.filter((prod) => prod.category.name === category);
    setRelatsprod(relatedProducts);
  }

  const truncateTextByWords = (text, wordCount) => {
    const words = text.split(' ');
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ') + '...';
    }
    return text;
  };

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts();
  }, [id, category]);

  // Filter related products based on search query
  const filteredRelatedProducts = Relatsprod.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Product details</title>
          <link rel="canonical" href={`http://mysite.com/ProductDetails/${id}/${category}`} />
        </Helmet>
      </div>

      <div className='py-2 md:mx-10'>
        <div className='mt-40 px-8 md:px-14'>
          <div className='productStyle rounded-lg md:flex'>
            <div className="md:w-1/4 p-7 w-full">
              <StyledSlider {...settings}>
                {ProductDetails?.images?.map((src, index) => (
                  <LazyLoad height={300} offset={100} key={index}>
                    <img className='w-full h-auto object-cover md:rounded-lg' src={src} alt="Product" />
                  </LazyLoad>
                ))}
              </StyledSlider>
            </div>
            <div className="md:w-3/4 w-full p-8">
              <h3 className='catgoryStyle pb-4 font-semibold text-2xl md:text-4xl'>{ProductDetails.title}</h3>
              <p className='pb-4 text-gray-400 text-base md:text-xl'>{ProductDetails.description}</p>
              <p className='pb-4 catgoryStyle text-xl md:text-2xl text-white'>{ProductDetails?.category?.name}</p>
              <div className="flex justify-between items-center px-4 pb-4">
                <p className='text-red-600 text-base font-extralight'>{ProductDetails.price} EGP</p>
                <p className='text-yellow-400 text-base'><i className="fa-solid fa-star text-yellow-400"></i> {ProductDetails.ratingsAverage}</p>
              </div>
              <button
                onClick={() => toggleWishlist(ProductDetails.id)}
                className="focus:outline-none mb-6 ps-6"
              >
                {Array.isArray(wishlistitemId) && wishlistitemId.includes(ProductDetails.id) ? (
                  <i className="fa fa-heart text-red-600 text-xl" />
                ) : (
                  <i className="fa fa-heart text-gray-400 text-xl" />
                )}
              </button>
              <button onClick={() => addproductToCart(ProductDetails.id)} className='btn bg-green-500 w-full py-2 text-white font-semibold'>
                {loading && productId === ProductDetails.id ? (
                  <i className="fa-solid fa-spinner px-1 fa-spin"></i>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Input for Related Products */}
        <div className='py-4 mt-16 mx-4'>
          <input
            type='text'
            placeholder='Search related products...'
            className='w-full p-2 border rounded-md bg-transparent text-white placeholder-gray-600'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='row'>
          {filteredRelatedProducts.length > 0 ? filteredRelatedProducts.map((productrecent) => (
            <div key={productrecent.id} className='md:w-3/12 w-11/12 mx-auto mt-10 px-2'>
              <div className='shadow-md p-1 prodseen rounded-md bg-gray-600 hover:shadow-2xl hover:shadow-gray-500'>
                <Link to={`/ProductDetails/${productrecent?.id}/${productrecent?.category?.name}`}>
                  <div className='parentimg rounded-t-md'>
                    <img src={productrecent.imageCover} className='w-full rounded-t-md' alt={productrecent?.title} />
                  </div>
                  <div className="p-3">
                    <p className='catgoryStyle mt-2 text-xl font-semibold'>{productrecent.category.name}</p>
                    <h2 className='py-3 text-white text-base font-semibold'>
                      {truncateTextByWords(productrecent.title, 2)}
                    </h2>
                    <div className="row justify-between align-middle pb-2">
                      <p className='text-red-600 underline-offset-8 text-base font-extralight'>{productrecent.price} EGP</p>
                      <p className='text-yellow-400 text-base'><i className="fa-solid fa-star text-yellow-400"></i> {productrecent.ratingsAverage}</p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => toggleWishlist(productrecent.id)}
                  className="focus:outline-none mb-16 ps-6"
                >
                  {Array.isArray(wishlistitemId) && wishlistitemId.includes(productrecent.id) ? (
                    <i className="fa fa-heart text-red-600 text-xl" />
                  ) : (
                    <i className="fa fa-heart text-gray-400 text-xl" />
                  )}
                </button>
                <div className='partentbtn items-center align-middle px-6'>
                  <button
                    onClick={() => addproductToCart(productrecent.id)}
                    className='chiledbtn btn bg-green-500 w-full align-middle'
                  >
                    {loading && productId === productrecent.id ? (
                      <i className="fa-solid fa-spinner px-1 fa-spin"></i>
                    ) : (
                      'Add to Cart'
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

