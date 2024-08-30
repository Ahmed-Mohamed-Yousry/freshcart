import {  useContext, useEffect, useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './copmonents/Home/Home'
import About from './copmonents/About/About'
import Portfolio from './copmonents/Portfolio/Portfolio'
import Contact from './copmonents/Contact/Contact'
import Layout from './copmonents/Layout/Layout'
import { useFormik } from 'formik'
import Login from './copmonents/Login/Login'
import UserContextProvider from './copmonents/Context/UserContext'
import Producte from './copmonents/Product/Producte'
import ProtectRoutes from './copmonents/ProtectRoutes/ProtectRoutes'
import ProductDetails from './copmonents/ProductDetails/ProductDetails'
import Cart from './copmonents/Cart/Cart'
import CartContextProvider from './copmonents/Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Checkout from './copmonents/Checkout/Checkout'
import Allorders from './copmonents/Allorders/Allorders'
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Categories from './copmonents/Categories/Categories'
import Brand from './copmonents/Brand/Brand'

import WishlistContextProvider from './copmonents/Context/WishlistContext'
import Wishlist from './copmonents/Wishlist/Wishlist'
import Forgetpass from './copmonents/Forgetpass/Forgetpass'
import Verify from './copmonents/Verfiy/Verfiy'
import ResetPassword from './copmonents/Resetpassword/Resetpassword'


let query= new QueryClient()

let x = createBrowserRouter([
{path:'' , element:<Layout/> , children:[
  {index:true , element:<ProtectRoutes><Home/></ProtectRoutes>},
  {path:'about' , element:<ProtectRoutes><About/></ProtectRoutes>},
  {path:'cart' , element:<ProtectRoutes><Cart/></ProtectRoutes>},

  {path:'categories' , element:<ProtectRoutes><Categories/></ProtectRoutes>},
  {path:'brand' , element:<ProtectRoutes><Brand/></ProtectRoutes>},
  {path:'Wishlist' , element:<ProtectRoutes><Wishlist/></ProtectRoutes>},

 
  {path:'checkout' , element:<ProtectRoutes><Checkout/></ProtectRoutes>},
  {path:'allorders' , element:<ProtectRoutes><Allorders/></ProtectRoutes>},

  {path:'productDetails/:id/:category' , element:<ProtectRoutes><ProductDetails/></ProtectRoutes>},
  {path:'producte',element:<ProtectRoutes><Producte/></ProtectRoutes>},
  {path:'contact' , element:<Contact/>},
  {path:'login' , element:<Login/>},
  {path:'forgetpass' , element:<Forgetpass/>},
  {path:'resetpassword' , element:<ResetPassword/>},
  {path:'verfiy' , element:<Verify/>}

]}

])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <QueryClientProvider  client={query}>

<WishlistContextProvider>
<CartContextProvider>
<UserContextProvider >

<RouterProvider router={x}></RouterProvider>
<ReactQueryDevtools></ReactQueryDevtools>
<Toaster />
</UserContextProvider>
</CartContextProvider>
</WishlistContextProvider>


   </QueryClientProvider>


     
    </>
  )
}

export default App
