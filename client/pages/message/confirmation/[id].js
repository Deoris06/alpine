import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { withRouter } from 'next/router'
import Link from 'next/link'
import General from '../../../components/General'
const Confirmation = ({ router }) => {
    const [state, setState] = useState({
        email: '', 
        
    })
    let { email } = state
    useEffect(() => {
        // let token = router.query.id
        let email  = router.query.id;  
         setState({...state, email})
    }, [router]);
   
    return (
        <General>
            <div className='bg-gradient-to-r from-cyan-200 to-blue-100'>
                <div className="md:w-96 md:h-screen mx-auto overflow-hidden">
                    <div className='mt-20 flex flex-col items-center'>
                        <img
                        className="object-fit w-60 rounded-full"
                        src="/images/email.jpg"
                        alt=""
                        />
                        <div className='text-emerald-500 mt-10'>
                        Verification mail has been sent to {email}. Please check your mail and click on the activation link.
                        Thank you!
                        </div>
                    </div>
                    
                </div>
            </div>
        </General>
    )
}

export default withRouter(Confirmation)