import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {
    let { cart } = useContext(CartContext);
    let navigate = useNavigate();
    let { userLogin, setuserLogin } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false); // Close the menu when a link is clicked
    };

    function logout() {
        localStorage.removeItem('userToken');
        setuserLogin(null);
        navigate('/Login');
    }

    return (
        <>
            <nav className="backgroundNav border-gray-200 dark:bg-gray-900 fixed left-0 right-0 top-0 z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-6 md:px-0 px-10">
                    <a className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Start Framework
                        </span>
                    </a>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-25 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        onClick={handleToggle}
                        aria-controls="navbar-default"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
                        id="navbar-default"
                    >
                        <div className='flex md:flex-row md:space-x-80 rtl:space-x-reverse'>
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent text-white">
                                {userLogin != null ? (
                                    <>
                                        <li>
                                            <NavLink className="" aria-current="page" to="" onClick={handleLinkClick}>
                                                {/* Add any content here */}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="block py-2 px-3 rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 text-green-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                                to=""
                                                onClick={handleLinkClick}
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="block py-2 px-3 rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 text-green-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                                to="producte"
                                                onClick={handleLinkClick}
                                            >
                                                Producte
                                            </NavLink>
                                        </li>
                                        <li className='relative'>
                                            <NavLink
                                                className="block rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 text-green-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                                to="cart"
                                                onClick={handleLinkClick}
                                            >
                                                Cart
                                            </NavLink>
                                            <span className="absolute top-[-7px] end-[-14px] bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{cart?.numOfCartItems}</span>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="block py-2 px-3 rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 text-green-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                                to="wishlist"
                                                onClick={handleLinkClick}
                                            >
                                                Wishlist
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="block py-2 px-3 rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 text-green-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                                to="categories"
                                                onClick={handleLinkClick}
                                            >
                                                Categories
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="block py-2 px-3 rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 text-green-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                                to="brand"
                                                onClick={handleLinkClick}
                                            >
                                                Brand
                                            </NavLink>
                                        </li>
                                    </>
                                ) : null}
                            </ul>

                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
                                {userLogin === null ? (
                                    <>
                                        <li>
                                            <NavLink
                                                className="block py-2 px-3 text-green-600 rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                                to="contact"
                                                onClick={handleLinkClick}
                                            >
                                                Sign Up
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="block py-2 px-3 text-green-600 rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                                to="login"
                                                onClick={handleLinkClick}
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <NavLink
                                            className="block py-2 px-3 text-green-600 rounded md:hover:bg-blue md:border-0 md:p-2 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-blue-500"
                                            onClick={logout}
                                        >
                                            Logout
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
