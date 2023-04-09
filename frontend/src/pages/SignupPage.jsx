import {React,useState,useEffect,useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import {Helmet} from 'react-helmet-async';
import {toast} from 'react-toastify'
import axios from 'axios'
import { getError } from '../utils';
import {Store } from '../Store'


function SignupPage() {
    const navigate=useNavigate();
    const {search}=useLocation();
    const redirectUrl=new URLSearchParams(search).get('redirect')
    const redirect=redirectUrl?redirectUrl:'/';
    const [Name,setName]=useState('');
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const [cPassword,setCPassword]=useState('');
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart:{userInfo}}=state;
    useEffect(()=>{
        if(userInfo)
        {
            navigate(redirect);
        }
    },[navigate,redirect,userInfo]);
    const SubmitHandler=async(e)=>{
        e.preventDefault();
        if(Password!==cPassword)
        {
            toast.error('Passwords do not match');
            return;
        }
        else
        {
            try
            {
                const {data}=await axios.post('/api/user/signup',{
                    Name,
                    Email,
                    Password
                });
                ctxDispatch({type:'USER_SIGNIN', payload:data });
                localStorage.setItem('userInfo',JSON.stringify(data));
                // toast.success(data.reponse.message);
                navigate(redirect);
            }
            catch(err)
            {
                
                if(Response.status==404)
                {
                    navigate('/signin');
                }
                else toast.error(getError(err));
            }
           

        }
    }
  return (
    <div>
    <Helmet><title>Sign Up</title></Helmet>
 
    <div className='container small-container'>
    <h1 className='my-3'>Sign Up</h1>
        <Form onSubmit={SubmitHandler}>
            <Form.Group className="mb-3" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                value={Name}
                onChange={(e)=>setName(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control  type="email"
                value={Email}
                onChange={(e)=>setEmail(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control value={Password}
                type="password"
                onChange={(e)=>setPassword(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="cPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control value={cPassword}
                type="password"
                onChange={(e)=>setCPassword(e.target.value)} required></Form.Control>
            </Form.Group>
            <div className="mb-3">
                <Button variant="primary" type="submit" >Sign Up</Button>
            </div>
            <div className="mb-3">
                Already have an account ? {' '}
                <Link to={`/signin`}>Signin</Link>
            </div>
        </Form>
      
    </div>
    </div>
  )
}

export default SignupPage
