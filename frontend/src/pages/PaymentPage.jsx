import {React,useEffect,useState, useContext } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {Form,Button} from 'react-bootstrap'
import { Navigate } from 'react-router-dom';
import {Store} from '../Store'

function PaymentPage() {
    const navigate=useNavigate();
    const  {state,dispatch:ctxDispatch}=useContext(Store);
    const {
        cart:
        {
            shippingAddress,
            paymentMethod
        }
        ,
    }=state;
    
    
    const [paymentMethodName,setPaymentMethodName]=useState(paymentMethod||'');
    useEffect(()=>{
        if(shippingAddress===undefined)
        {
            navigate('/shipping');
        }
    },[navigate,shippingAddress])
    const submitHandler=(e)=>{
        e.preventDefault();
        ctxDispatch({
            type:'SAVE_PAYMENT_METHOD',
            payload: paymentMethodName
        });
        console.log('Payment Method selected is: ',paymentMethodName);
        localStorage.setItem('paymentMethod',paymentMethodName);
        navigate('/placeOrder')

    }
  return (
    <div>
      <CheckoutSteps step1 step2 step3/>
      <div className='container small-container'>
        <Helmet>
            <title>Payment Method</title>
        </Helmet>
        <h1 className='mb-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <div className='mb-3'>
            <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName==='PayPal'}
            onChange={(e)=>setPaymentMethodName(e.target.value)}/>
            </div>
            <div className='mb-3'>
                <Form.Check
                type="radio"
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={paymentMethodName==="Stripe"}
                onChange={(e)=>setPaymentMethodName(e.target.value)}/>
            </div>
           <div className='mb-3'>
            <Button variant="primary" type="submit">Continue</Button>
           </div>
        </Form>
      </div>
    </div>
  )
}

export default PaymentPage
