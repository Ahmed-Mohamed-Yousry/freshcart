import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext(0)

export default function CartContextProvider(props){
const [cart, setcart] = useState(null)
const [cartId, setcartId] = useState(null)
    let headers={token:localStorage.getItem('userToken')}

    function getLoggedCart(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
        headers
    })
    .then((respone)=>respone)
    .catch((error)=>error)
   }
    function addProduct(prodId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
            productId:prodId
        } ,{
            headers
        })
        .then((respone)=>respone)
        .catch((error)=>error)
    }
    function updateProduct(prodId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}` , {
            count:count 
        } ,{
            headers
        })
        .then((respone)=>respone)
        .catch((error)=>error)
    }
    function removeProduct(prodId ){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}` ,{
            headers
        })
        .then((respone)=>respone)
        .catch((error)=>error)
    }
    function deleteAllProduct( ){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,{
            headers
        })
        .then((respone)=>respone)
        .catch((error)=>error)
    }
    function checkoutCart(checkId , url ,formValu ){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${checkId}?url=${url}`, {
            shippingAddress:formValu
        } ,{
            headers
        })
        .then((respone)=>respone)
        .catch((error)=>error)
    }

    async function getAllItem(){
        let response= await getLoggedCart()
        // console.log(response.data.data._id);
        // setcart(response.data)
        setcartId(response?.data.data._id)
    } 
    useEffect(() => {
        getAllItem()
    }, [])
    
return <CartContext.Provider value={{getLoggedCart , addProduct , deleteAllProduct , updateProduct , removeProduct ,checkoutCart , cart ,setcart ,setcartId ,cartId}} >
{props.children}
</CartContext.Provider>

 }