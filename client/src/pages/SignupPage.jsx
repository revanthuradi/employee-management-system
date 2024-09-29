import React, { useState } from 'react'
import { signUpSchema } from "../schema";
import { useFormik } from "formik";
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import FullLoader from '../components/FullLoader';

const Signup = () => {
    //   const { setData, setTokenValue, isAuthenticated } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { setTokenValue, setData } = useAuth()
    // const navigate = useNavigate()
    const initialValues = {
        userName: "",
        password: "",
        confirmPassword: ""
    };
    const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
        useFormik({
            initialValues: initialValues,
            validationSchema: signUpSchema,
            onSubmit: async (values, action) => {
                console.log(values)
                try {

                    const res = await axios.post("http://localhost:4000/auth/signup",{...values})
                    console.log(res)
                    setData(res.data.admin)
                    setTokenValue(res.data.token)
                } catch (error) {
                    console.log(error)
                }
            },
        });


    return (
        <div className="flex max-h-[100vh] overflow-hidden flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className='m-auto flex flex-col items-center gap-3'>
                    <h2 className='text-xl font-medium'>SignIn to your Account</h2>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userName" className="block px-2 text-sm font-medium leading-6 text-gray-900">username</label>
                        <div className="mt-2">
                            <input onBlur={handleBlur} value={values.userName} onChange={handleChange} id="userName" name="userName" type="text" autoComplete="userName" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div>
                            {
                                touched.userName && errors.userName && <p className='text-red-400'>{errors.userName}</p>
                            }
                        </div>
                    </div>


                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block px-2 text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2 relative">
                            <input onBlur={handleBlur} value={values.password} onChange={handleChange} id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div className='absolute right-3 bottom-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye className='' />
                                }
                            </div>
                        </div>
                        <div>
                            {
                                touched.password && errors.password && <p className='text-red-400'>{errors.password}</p>
                            }
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmPassword" className="block px-2 text-sm font-medium leading-6 text-gray-900">confirm Password</label>
                        </div>
                        <div className="mt-2 relative">
                            <input onBlur={handleBlur} value={values.confirmPassword} onChange={handleChange} id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div className='absolute right-3 bottom-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye className='' />
                                }
                            </div>
                        </div>
                        <div>
                            {
                                touched.confirmPassword && errors.confirmPassword && <p className='text-red-400'>{errors.confirmPassword}</p>
                            }
                        </div>
                    </div>
                    <div>

                        <button type="submit" className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
                <div className='mt-5 text-center'><Link to='/login' >Already have an Account ?</Link></div>
            </div>
            {
                isLoading && <FullLoader />
            }
        </div>
    )
}

export default Signup
