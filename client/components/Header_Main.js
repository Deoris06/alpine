import Head from 'next/head'
import React, { Fragment, useState } from 'react'
import Router from 'next/router'
import { isAuth, logout } from '../helpers/auth'
import { Transition } from '@headlessui/react'; // for smooth transition
import { Link } from 'react-scroll/modules'; 
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header_Main = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const nav = () => (
        <div>
        <nav className='fixed z-10 w-full shadow-sm'>
            <div className='w-full'>
                <div className='flex items-center w-full h-20'>
                    {/* First block section Outer part */}
                    <div className='flex items-center justify-between w-full mx-20 items'>
                        <div className='flex items-center justify-center flex-shrink-0'>
                            <h1 className='text-xl font-bold cursor-pointer'>
                                Stream<span className='text-blue-500'>line</span>
                            </h1>
                        </div>
                        {/* for small screen size */}
                        <div className='hidden md:block'>
                            <div className='flex items-baseline ml-10 space-x-4'>
                                <Link activeClass='Home' to='about' 
                                smooth={true} 
                                offset={50} 
                                duration={500}
                                className="px-3 py-2 font-medium text-blue-600 cursor-pointer rosemibold text-md hover:font-black"
                                >
                                    Home
                                </Link>
                                <Link 
                                activeClass='About' 
                                to='about' 
                                smooth={true} 
                                offset={50} 
                                duration={500}
                                className="px-3 py-2 text-sm font-medium rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    About
                                </Link>
                                <Link 
                                activeClass='Projects' 
                                to='projects' 
                                smooth={true} 
                                offset={50} 
                                duration={500}
                                className="px-3 py-2 text-sm font-medium rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    Projects
                                </Link>
                                <Link 
                                activeClass='Services' 
                                to='services' 
                                smooth={true} 
                                offset={50} 
                                duration={500}
                                className="px-3 py-2 text-sm font-medium rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    Services
                                </Link>
                                <Link 
                                activeClass='Contact' 
                                to='contact' 
                                smooth={true} 
                                offset={50} 
                                duration={500}
                                className="px-3 py-2 text-sm font-medium rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* mobile responsiveness */}
                    <div className='flex mr-10 md:hidden'>
                        <button 
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className='inline-flex items-center justify-center p-2 text-white bg-blue-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-offset-blue-800 focus:ring-white'
                        aria-controls='mobile-menu'
                        aria-expanded='false'
                        >
                           {!isOpen ? (
                               <svg className='block w-6 h-6' xmlns='http:www.w3.org/2000/svg' fill="none" viewBox='0 0 24 24' 
                               stroke='currentColor'
                               aria-hidden="true"
                               >
                                   <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                               </svg>
                           ): (
                            <svg className='block w-6 h-6' xmlns='http:www.w3.org/2000/svg' fill="none" viewBox='0 0 24 24' 
                            stroke='currentColor'
                            aria-hidden="true"
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                           )} 
                        </button>
                    </div>
                </div>
            </div>
            {/* smooth ui transition with headless ui */}
            <Transition show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='transition ease-in duration-75 transform'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
            >
                {(ref) => (
                    <div className='md:hidden id-mobile-menu'>
                        <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 bg-white sm:px-3">
                            <Link 
                                href="/home"
                                activeClass='home'
                                to='home'
                                smooth={true}
                                offset={50}
                                duration={500}
                                className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    Home
                            </Link>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    </div>
    )

    return (
        <React.Fragment>
            {nav()} <div className="container pt-5 pb-5">{children}</div>
        </React.Fragment>
    )
}

export default Header_Main;