import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { API } from '../config';
import General from '../components/General';
import Link from 'next/link';
import Metadata from '../components/MetaData';
import { showSuccessMessage, showErrorMessage } from '../helpers/alert';
import { GoogleLogin } from 'react-google-login';
import { authenticate, isAuth } from '../helpers/auth';

const LoginAccount = () => {
    const [state, setState] = useState({
        email: '',
        password:'',
        error: '',
        success: '',
        buttonText: 'Login Account'
    })

    const {  email, password, error, success, buttonText } = state;
    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Sign In' });
    };
    const handleSubmit = async event => {
        event.preventDefault();
        setState({ ...state, buttonText: 'Signing in...'})

        try{
            const response = await axios.post(`${API}/login`, {
                email,
                password
            })
            console.log(response);
            authenticate(response, () => 
                isAuth() && isAuth().role === 'admin' ? Router.push('admin') : Router.push('/')
            )
            
        } catch(error) {
            console.log(error);
            setState({ ...state, buttonText:'Create Account', error: error.response.data.error})
        }
    }
    const loginForm= () => (
        <form onSubmit={handleSubmit} >
            <div className='bg-white shadow-lg p-3 m-10 mt-20 mr-28 rounded-xl h-screen overflow-hidden'>
                <div className='p-8'>
                    <div className='text-3xl font-bold tracking-wide text-gray-800 lg:text-4xl'>
                        Sign in
                    </div>
                    <div className='text-sm mt-3'>
                        <span>New user? &nbsp;</span>
                        <Link
                            href="/create-account"
                        >
                            <a className='text-yellow-500'>Create an account</a>
                        </Link>
                    </div>
                    <div className='mt-8'>
                        <label className="font-light text-xs" for="usernameField">Email Address</label>
                        <input 
                        value={email}
                        onChange={handleChange('email')}
                        className="text-xs flex items-center h-12 px-4 w-full ring-1 ring-yellow-500 border-t-0  mt-2 rounded-lg focus:outline-yellow-500 focus:ring-1" 
                        type="email" 
                        placeholder='Enter your email'
                        />
                    </div>
                    <div className='mt-5'>
                        <label className="font-light text-xs" for="usernameField">Password</label>
                        <input 
                        value={password}
                        onChange={handleChange('password')}
                        className="text-xs flex items-center h-12 px-4 w-full ring-1 ring-yellow-500 bg-white mt-2 rounded-lg focus:outline-yellow-500 focus:ring-1" 
                        type="password" 
                        placeholder='Enter your password'
                        />
                    </div>
                    <div className='mt-5'>
                        <button  className="justify-self-start inline-flex items-center text-xs font-semibold text-white px-6 h-12 rounded-full shadow-sm bg-yellow-500 duration-200 hover:text-deep-purple-accent-700">
                            {buttonText}
                        </button>
                    </div>
                    <div className=' mt-8'>
                        <div className=" relative border-t-2 border-gray-200">
                            <div className='text-amber-500 bg-white p-3 absolute left-52 -top-5 bottom-56 text-xs'>Or</div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </form>
    )

    return (
        <General>
            <Metadata title="Login" />
            <div className="md:w-screen md:h-screen overflow-hidden bg-pattern">
                <div className='md:grid md:grid-cols-2 bg-gray-900 bg-opacity-50'>
                    <div className="flex justify-center items-center">
                        <div className='flex flex-col content-center'>
                            <img
                            className="object-fit w-40"
                            src="/images/logo-3.svg"
                            alt=""
                            />
                        </div>
                    
                        {/* {success && showSuccessMessage(success)}
                        {error && showErrorMessage(error)}
                        {loginForm()} */}
                        
                       
                    </div>
                    <div className='bg-transparent'>
                        {loginForm()}
                        {success && showSuccessMessage(success)}
                        {error && showErrorMessage(error)}
                    </div>
                    
                </div>
            </div>
        </General>
    );
}

export default LoginAccount;
