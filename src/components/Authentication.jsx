import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import {loginAPI, registerAPI} from '../services/allApi'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';

function Authentication({ register }) {

    const [userData, setUserData] = useState({
        username:"",
        email:"",
        password:""
    })
 
    const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

    const registerForm = register ? true : false

    const navigate = useNavigate()

    // Function to register
    const handleRegister = async(e)=>{
        e.preventDefault()
        const {username, email, password} = userData

        if(!username || !email || !password){
            toast.warning('Please fill the form completely')
        }
        else{
            const result = await registerAPI(userData)
            console.log(result);
            if(result.status==200){
                toast.success(`${result.data.username} registered successfully`)
                setUserData({
                    username:"",
                    email:"",
                    password:""
                })

                navigate('/login')
            }
            else{
                toast.error(`${result.response.data}`);
            }
        }
    }

    // Function to login
    const handleLogin = async(e)=>{
        e.preventDefault()

        const {email, password} = userData
        if(!email || !password){
            toast.warning('Please fill the form completely')
        }
        else{
            const result = await loginAPI(userData)
            console.log(result);

            if(result.status===200){
                setIsAuthToken(true)
                // Store data
                // In session storage, key:string value:string
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                toast.success('Login successful')
                setUserData({
                    username:"",
                    email:"",
                    password:""
                })

                setTimeout(() => {
                    navigate('/')
                }, 2000);

                /* navigate('/') */
            }
            else{
                toast.warning(result.response.data)
            }
        }
    }

    return (
        <div style={{ height: '100vh', width: '100%'}} className='d-flex justify-content-center align-items-center bg-dark'>

            <div className="container w-75">
                <Link className='fs-5' style={{ textDecoration: 'none', color: 'white' }} to={'/'}><i class="fa-solid fa-arrow-left"></i> Back to home</Link>
                <div className="card shadow p-5 mt-2">
                    <div className="row align-items-center">

                        <div className="col-lg-6">
                            <img src="https://cdn.dribbble.com/users/2213143/screenshots/7971141/media/184cdea9758c029d9feef05432222403.gif" alt="" className='w-100' />
                        </div>

                        <div className="col-lg-6">
                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                <h1>Project fair</h1>

                                <h5 className='mt-3 mb-3'>
                                    {
                                        registerForm ? "Sign up to your account" : "Sign in to your account"
                                    }
                                </h5>

                                <Form className='w-100'>

                                    { registerForm &&
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="text" placeholder="Enter username" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}/>
                                    </Form.Group>
                                    }

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter email Id" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="password" placeholder="Enter your password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                                    </Form.Group>

                                    { registerForm?
                                        <div>
                                        <button onClick={handleRegister} className='btn btn-success'>Register</button>
                                        <p className='mt-2'>Existing user? Click here to <Link to={'/login'}>login</Link></p>
                                    </div>
                                        :
                                    <div>
                                        <button onClick={handleLogin} className='btn btn-success'>Log in</button>
                                        <p className='mt-2'>New here? Click here to <Link to={'/register'}>register</Link></p>
                                    </div>}

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
        </div>

        
    )
}

export default Authentication