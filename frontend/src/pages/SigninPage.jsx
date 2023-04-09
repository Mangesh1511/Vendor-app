import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Container,Button,Form} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import {Store} from '../Store'
import {toast} from 'react-toastify'
import {getError} from '../utils'
import '../index.css'

export default function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {state,dispatch:ctxDispatch}=useContext(Store);
  const {userInfo}=state;
  const isAdmin=false;
  useEffect(()=>{
    console.log('IN the use effect of the signin page')
    console.log('USer infor is: ',userInfo)
    console.log('redirect url is:',redirect )
    if(userInfo)
    {
      navigate(redirect||'/');
    }
  },[navigate,redirect,userInfo]); 
  const SubmitHandler=async(e)=>{
    e.preventDefault();
    try{
        const {data}=await axios.post('/api/user/signin',{
          email,
          password,
          isAdmin,
        });
        ctxDispatch({type:'USER_SIGNIN', payload:data });
        localStorage.setItem('userInfo',JSON.stringify(data));
        navigate(redirect||'/');

        console.log(data);
        // navigate('/ok');

    }
    catch(err)
    {
      console.log(err);
      toast.error(getError(err));
        // console.log(err.message);

    }
   
  }

  
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={SubmitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e)=>setEmail(e.target.value)}
            
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=/`}>Create your account</Link>
        </div>
        <div className="mb-3">
          Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
        </div>
      </Form>
    </Container>
  );
}