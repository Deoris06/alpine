import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { API } from '../config';
import General from '../components/General';
import Link from 'next/link';
import Metadata from '../components/MetaData';
import { showSuccessMessage, showErrorMessage } from '../helpers/alert';

const CreateAccount = () => {
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password:'',
        c_password: '',
        error: '',
        success: '',
        buttonText: 'Create Account'
    })

    const { first_name, last_name, email, password, c_password, error, success, buttonText } = state;
    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Create Account' });
    };
    const handleSubmit = async event => {
        event.preventDefault();
        setState({ ...state, buttonText: 'Please wait...'})

        try{
            if(password !== c_password){
                setState({...state, buttonText: 'Create Account', error: 'Password does not match!'})
            }
            const response = await axios.post(`${API}/register`, {
                first_name,
                last_name,
                email,
                password
            })
            console.log(response);
            setState({
                ...state,
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                buttonText: 'Done',
                success: response.data.message
            });
            Router.push(`/message/confirmation/${email}`)
        } catch(error) {
            console.log(error);
            setState({ ...state, buttonText:'Create Account', error: error.response.data.error})
        }
    }
    const registerForm= () => (
        <form onSubmit={handleSubmit} >
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" for="first_name">First name</label>
                <input 
                value={first_name}
                onChange={handleChange('first_name')}
                placeholder="Enter your First name"
                type="text" 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" for="last_name">Last name</label>
                <input 
                value={last_name}
                onChange={handleChange('last_name')}
                placeholder="Enter your Last name"
                type="text" 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
            <div>
                <label className="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
                <input 
                value={email}
                onChange={handleChange('email')}
                placeholder="Enter your email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" for="password">Password</label>
                <input 
                value={password}
                onChange={handleChange('password')}
                placeholder="Enter password"
                type="password" 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Password Confirmation</label>
                <input 
                value={c_password}
                onChange={handleChange('c_password')}
                placeholder="Confirm password" 
                type="password" 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
            </div>
        </div>
        <div className='flex justify-between mt-8'>
            <button  className="justify-self-start inline-flex items-center font-semibold text-white px-6 h-12 rounded-full shadow-lg bg-amber-400 duration-200 hover:text-deep-purple-accent-700">
                {buttonText}
            </button>
            <Link
            href="/"
            >
            <a  className=" self-center font-semibold text-gray-600 text-lg underline hover:text-amber-400">
                Have an account? Login
            </a>
            </Link>
        </div>

        
    </form>
    )

    return (
        <General>
            <Metadata title="Create Account" />
            <div className="md:w-screen md:h-screen overflow-hidden">
                <div className='md:grid md:grid-cols-2'>
                    <div className="p-8 pl-16 mb-4 md:max-w-32">
                        <div className='mb-6'>
                            <img
                            className="object-fit w-40"
                            src="/images/default.svg"
                            alt=""
                            />
                        </div>
                        <h2 className=" mb-6 font-sans text-3xl font-bold tracking-tight text-gray-600 ">
                        Sign Up
                        </h2>
                        {success && showSuccessMessage(success)}
                        {error && showErrorMessage(error)}
                        {registerForm()}
                        
                       
                    </div>
                    <div className='flex-initial md:max-w-64 hidden md:block'>
                        <img
                        className="object-cover w-full h-screen"
                        src="/images/carousel5.png"
                        alt=""
                        />
                    </div>
                </div>
            </div>
        </General>
    );
}

export default CreateAccount;
