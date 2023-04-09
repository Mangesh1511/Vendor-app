import React, { useEffect } from 'react'
import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Form, Button } from 'react-bootstrap'
import {Store} from '../Store'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingAddress() {
    const navigate=useNavigate();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo,cart:{shippingAddress}}=state;
    const [fullName, setfullName] = useState(shippingAddress.fullName||'')
    const [address, setAddress] = useState(shippingAddress.address||'')
    const [cityName, setCityName] = useState(shippingAddress.cityName||'')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode||'')
    const [country, setCountry] = useState(shippingAddress.country||'')
 

    const SubmitHandler = (e) => {
        e.preventDefault();
        console.log('Next button Clicked\n');

        ctxDispatch({
            type:'SAVE_SHIPPING_ADDRESS',
            payload:{
                fullName,
                address,
                cityName,
                postalCode,
                country
            }
        });
        console.log('Current Shipping address is: ',shippingAddress);
        localStorage.setItem('SHIPPING_ADDRESS',JSON.stringify({
            fullName,
            address,
            cityName,
            postalCode,
            country,
          }));
          console.log('after next button clicked Shipping address is: ',shippingAddress);


        navigate('/payment');
    }
    useEffect(()=>{
        if(!userInfo)
        {
            navigate('/signin?redirect=/shipping')
        }
        // if(shippingAddress)
        // {
        //     console.log('Full name is : ',shippingAddress.fullName)

        //     setfullName(shippingAddress.fullName);
        //     setAddress(shippingAddress.address);
        //     setCityName(shippingAddress.cityName);
        //     setPostalCode(shippingAddress.postalCode);
        //     setCountry(shippingAddress.country);
        // }
    },[setfullName,setAddress,setCityName,setPostalCode,setCountry,navigate,userInfo]);
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2/>
            <div className="container small-container"> 
                <h1 className='my-3'>Shipping Address</h1>

                <Form onSubmit={SubmitHandler}>
                    
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            value={fullName}
                            onChange={(e) => setfullName(e.target.value)}
                            required></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cityName">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={cityName}
                            onChange={(e) => setCityName(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required>
                        </Form.Control>
                    </Form.Group>

                    <div className="mb-3">
                        <Button variant="primary" type="submit">Continue</Button>
                    </div>

                </Form>
              
                </div>
              
    </div>
       
          
    );
}

export default ShippingAddress
