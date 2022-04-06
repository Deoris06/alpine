import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { withRouter } from 'next/router'
import Link from 'next/link'
import General from '../../../components/General'
import { API } from '../../../config'
import { showSuccessMessage, showErrorMessage } from '../../../helpers/alert'

const ActivateAccount = ({ router }) => {
    const [state, setState] = useState({
        first_name: '', 
        token: '',
        buttonText: 'Activate Account',
        success: '',
        error: ''
    })
    let { first_name, token, buttonText, success, error } = state
    useEffect(() => {
        let token = router.query.id
        console.log(token)
        if(token){
            const { first_name } = jwt.decode(token)
            setState({ ...state, first_name, token })
        }
        
    }, [router]);

    const clickSubmit = async e => {
        e.preventDefault()
        setState({ ...state, buttonText: 'Activating'})
        try{
            const response = await axios.post(`${API}/register/activate`, {
                token
            })

            console.log(response)
            setState({...state, first_name: '', token: '', buttonText: 'Activated', success: response.data.message})
        }catch(error){
            setState({...state, buttonText: 'Activate Account', error: error.response.data.error})
        }
    }

    return (
        <General>
          <div className="md:w-screen md:h-screen">
            <div className='md:grid md:grid-cols-2'>
                <div className="p-16 pl-20 mb-6 md:max-w-32">
                   <div className='mb-9'>
                        <img
                        className="w-40 object-fit"
                        src="/images/default.svg"
                        alt=""
                        />
                    </div>
                    <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 ">
                    Activate your <span className='text-amber-400'>Account</span>
                    <br className="" />
                    Start Shopping{' '}
                    </h2>
                    <p className="mb-5 text-base text-gray-700 md:text-lg">
                    Welcome <span>{first_name}</span> to Knock Ecommerce! Shop for the best items here with the best User experience. Start now and get
                    the most out of Knock!!! 
                    </p>
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                   
                    <button  className="inline-flex items-center h-12 px-6 font-semibold text-white duration-200 rounded-full shadow-lg justify-self-start bg-amber-400 hover:text-deep-purple-accent-700" onClick={clickSubmit}>
                        {buttonText}
                    </button>
                   
                </div>
                <div className='flex-initial hidden md:max-w-64 md:block'>
                    <img
                    className="object-cover w-full h-screen"
                    src="/images/carousel2.jpg"
                    alt=""
                    />
                </div>
            </div>
          </div>
        </General>
    )
}

export default withRouter(ActivateAccount)