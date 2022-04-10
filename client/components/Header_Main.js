import Head from 'next/head'
import React, { Fragment, useState } from 'react'
import Router from 'next/router'
import { isAuth, logout } from '../helpers/auth'
import { Transition } from '@headlessui/react'; // for smooth transition
import Link from 'next/link'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header_Main = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    function ucfirst(string){
        const str2 = string.charAt(0).toUpperCase() + string.slice(1);
        return str2;
    }
    
    const nav = () => (
        <div class="navbar bg-base-100">
            <div className='container mx-auto'>
            <a
                href='/'
                class="btn btn-ghost normal-case text-xl mr-12"
            >
                <a>
                    <img
                        src="/images/default.svg"
                        className='object-fit w-32'            
                    /> 
                </a>
                   
            </a> 
            <div class="">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li tabindex="0">
                    <a class="justify-between">
                    Account 
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                    </a>
                    <ul class="p-2">
                    <li><a>Submenu 1</a></li>
                    <li><a>Submenu 2</a></li>
                    </ul>
                </li>
                <li><a>Cart</a></li>
                </ul>
            </div>
            {/* <a class="btn btn-ghost normal-case text-xl">daisyUI</a> */}
            </div>
            <div class=" hidden lg:flex">
            <div class="flex">
                <input type="text" placeholder="Search products, categories and brands" class="grow  pl-2 mr-4 h-12 rounded-lg input input-bordered" style={{ width: '30rem'}}/>
                <button className="text-xs font-semibold text-white px-6 h-12 rounded-lg shadow-sm bg-amber-500 duration-200 hover:text-deep-purple-accent-700">SEARCH</button>
            </div>
            <ul class="menu menu-horizontal p-0 ml-5">
               
                <li tabindex="0">
                    {isAuth() && (
                        <a className='font-bold'>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            Hi, {ucfirst(isAuth().first_name)}
                            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                        </a>
                    )}

                    {isAuth() === false && (
                        <a className=''>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Account
                            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                        </a>
                    )}
                    
                    <ul class="p-0 bg-white shadow-lg w-52">
                        {!isAuth() && (
                            <li className='p-2'>
                                <Link
                                    href='/login'
                                >
                                    <a className='p-4 px-6 h-12 rounded-lg uppercase bg-yellow-500 text-white flex justify-center font-bold shadow-sm duration-200 hover:text-deep-purple-accent-700'>
                                        SIGN IN
                                    </a>
                                </Link>
                            </li>
                            
                        )}
                        
                        <hr className='mt-4 mb-2 p-0 rounded-none'/>
                        
                        <li className=''>
                            <Link
                                href='/'
                                className="flex justify-start text-sm "
                            >   
                                <a>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className='flex self-center'>
                                    My Account
                                </span>
                                </a>
                            </Link>
                        </li> 
                        {isAuth() &&(
                            <li>
                                <Link
                                    href='/'
                                    className="flex justify-start text-sm "
                                >
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                                        </svg>
                                        <span className='flex self-center'>
                                            Inbox
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                href='/customer/order'
                                className="flex justify-start text-sm "
                            >   
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <span className='flex self-center'>
                                        Orders
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/customer/saved'
                                className="flex justify-start text-sm "
                            >   
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className='flex self-center'>
                                        Saved Items
                                    </span>
                                </a>
                            </Link>
                        </li>
                        {isAuth() &&(
                            <li>
                                <Link
                                    href='/customer/coupon'
                                    className="flex justify-start text-sm "
                                >   
                                    <a>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>
                                        <span className='flex self-center'>
                                            knock Coupon
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        )}
                        {isAuth() && (
                            <hr className='mt-4 mb-2 p-0 rounded-none'/>
                        )}
                        
                        {isAuth() &&(
                            <li>
                                <a
                                   onClick={logout}
                                    className="flex justify-center text-sm"
                                >
                                    <a className='flex self-center uppercase text-amber-500 font-extrabold'>
                                        Logout
                                    </a>
                                </a>
                            </li>
                        )}
                    </ul>
                </li>
                <li tabindex="1">
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Help
                        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
                    </a>
                    <ul class="p-0 bg-white shadow-lg w-52">
                        
                        <li className=''>
                            <Link
                                href='/customer/help'
                                className="flex justify-start text-sm "
                            >
                                
                                <a className='flex self-center'>
                                    Help Center
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/customer/track-orders'
                                className="flex justify-start text-sm "
                            >
                                <a className='flex self-center'>
                                    Place &#38; Track orders
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/customer/cancel-order'
                                className="flex justify-start text-sm "
                            >
                                <a className='flex self-center'>
                                    Order Cancellation
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/customer/refund'
                                className="flex justify-start text-sm "
                            >
                                <a className='flex self-center'>
                                    Return &#38; Refunds
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/customer/payment'
                                className="flex justify-start text-sm "
                            >
                                <a className='flex self-center'>
                                    Payment &#38; fingpay
                                </a>
                            </Link>
                        </li>
                        <hr className='mt-4 mb-2 p-0 rounded-none'/>
                        <li className='p-2'>
                            <Link
                                href='/customer/chat'
                            >   
                                <a className="uppercase flex justify-start p-4 text-xs font-semibold text-white px-6 h-12 rounded-lg shadow-sm bg-yellow-500 duration-200 hover:text-deep-purple-accent-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    <span>
                                        Live Chat
                                    </span>
                                </a>
                            </Link>
                        </li>
                        
                    </ul>
                </li>
                <li className='relative'>
                    <a href="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Cart
                    </a>
                    <div className='absolute left-7 top-2 w-4 h-4 p-1 rounded-full bg-amber-500  text-white flex justify-center text-xs'>5</div>
                </li>
            </ul>
            </div>
            </div>
            
        
      </div>
    )

    return (
        <React.Fragment>
            {nav()} <div className="container pt-5 pb-5">{children}</div>
        </React.Fragment>
    )
}

export default Header_Main; 