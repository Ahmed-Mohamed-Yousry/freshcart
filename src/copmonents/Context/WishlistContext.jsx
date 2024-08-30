import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext(0);

export default function WishlistContextProvider(props) {
    const [wish, setwish] = useState(null);


  let headers = { token: localStorage.getItem("userToken") };
  
  
  function getWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((respone) => respone)
      .catch((error) => error);
  }
  function removeWishlist(prodId ){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}` ,{
        headers
    })
    .then((respone)=>respone)
    .catch((error)=>error)
}

function addwishlistProduct(prodId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        productId:prodId
    } ,{
        headers
    })
    .then((respone)=>respone)
    .catch((error)=>error)
}


//   async function getAllIwish(){
//     let response= await getWishlist()
//     // console.log(response.data.data._id);
//     // setcart(response.data)
//     setwish(response?.data.data._id)
// } 

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ getWishlist , removeWishlist , addwishlistProduct , setwish , wish}}>
      {props.children}
    </WishlistContext.Provider>
  );
}
