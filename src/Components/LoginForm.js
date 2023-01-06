import React, { useContext } from 'react';

import google from '../../src/images/icons8-google-48.png'
import apple from '../../src/images/icons8-apple-logo-50.png'
import facebook from '../../src/images/icons8-facebook-48.png'
import { AuthContext } from '../AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
    const { providerLogin } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const googleLogin = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user

                console.log(user)
                const emailInfo = {
                    email: user?.email
                }

                fetch('https://cvsserver.vercel.app/users', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(emailInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.acknowledged) {
                            toast.success('user Login successfully')
                            navigate('/users')
                        }
                        



                    })
            })
            .catch(error => {
            console.error(error)
        })
        
    }

    return (
        <div className=''>
            <div className="flex flex-col md:max-w-lg w-[95%] p-6 rounded-3xl mx-auto my-16 sm:p-10 bg-[#cecccc62] shadow-lg">

                <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-9 my-10">
                        <div>
                            <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-blue-600 text-white md:text-2xl text-md  shadow-md flex gap-5 items-center">

                                <img src={facebook} alt="" />

                                Continue With Facebook</button>
                        </div> <div>
                            <button
                            
                                onClick={googleLogin}
                                type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-white text-gray-500 md:text-2xl text-md shadow-md flex gap-5 items-center">

                                <img src={google} alt="" />

                                Continue with Google</button>
                        </div> <div>
                            <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-black text-white md:text-2xl text-md shadow-md flex gap-5 items-center">

                                <img src={apple} alt="" />
                                Continue With Apple</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;