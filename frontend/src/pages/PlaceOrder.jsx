import React from 'react'
import axios from 'axios'
import {Helmet } from 'react-helmet-async'
import {Row,Col,Card,Button,ListGroup} from 'react-bootstrap'
import {Store} from '../Store'
import { useContext,useEffect,useState,useReducer } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import {getError} from '../utils'
import '../index.css'
import {toast} from 'react-toastify'
import Loading from '../components/Loading'
const reducer=(state,action)=>{
    switch(action.type)
    {
        case 'CREATE_REQUEST':
        return {...state,loading:true};
        case 'CREATE_SUCCESS':
            return {...state,loading:false};
        case 'CREATE_FAIL':
            return{...state,loading:false};
        default:
        return state;
    }
}
function PlaceOrder() {
    const navigate=useNavigate();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart,userInfo}=state;
    const [{loading },dispatch]=useReducer(reducer,{
        loading:false,
    });




    const round2=(num)=>{
        return Math.round(num*100+Number.EPSILON)/100;
    }
    cart.itemsPrice=round2(cart.cartItems.reduce((a,c) => a + c.quantity * c.price,0)
    );
    cart.shippingPrice=cart.itemsPrice>100?round2(0):round2(10);
    cart.taxPrice=round2(0.15*cart.itemsPrice);
    cart.totalPrice=cart.itemsPrice+cart.shippingPrice+cart.taxPrice;

    const placeOrderHandler=async(e)=>{
        e.preventDefault();
        try{
            dispatch({type:'CREATE_REQUEST'});
            const {data}=await axios.post('/api/orders/',
            {
                orderItems:cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod:cart.paymentMethod,
                itemsPrice:cart.itemsPrice,
                shippingPrice:cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice
            },
            {
                headers:{
                    authorization:`Bearer ${userInfo.token}`,
                },
            });
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({type:'CREATE_SUCCESS'});
            localStorage.removeItem('cartItems');
            console.log('Order id is as follows:',data);
            navigate(`/order/${data.newOrder._id}`);

        }catch(err)
        {
            console.log('Error from the request is as follows: ',err);
            dispatch({type:'CREATE_FAIL'});
            toast.error(getError(err));
        }
    }
    useEffect(()=>{
        if(!cart.paymentMethod)
        {
            navigate('/payment');

        }
    },[cart,navigate])
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Helmet><title>Preview Order</title></Helmet>
        <h1 className='my-3'>Preview Order</h1>
        <Row>
            <Col md={8}>
                <Card className="mb-3">
                    <Card.Body>
                    <Card.Title>Shipping</Card.Title>
                    <Card.Text>
                        <strong>Name:</strong>{cart.shippingAddress.fullName}<br/>
                        <strong>Address: </strong>{cart.shippingAddress.address},
                        {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}
                    </Card.Text>
                    <div className='mb-3'>
                            <Button variant="primary"><Link to ='/shipping'>Edit</Link></Button> 
                            </div>
                    </Card.Body>
                    
                </Card>
                <Card className='mb-3'>
                    <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <strong>Payment method:</strong>{cart.paymentMethod}
                        </Card.Text>
                        <div className='mb-3'>
                            <Button variant="primary"><Link to ='/payment'>Edit</Link></Button> 
                            </div>
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Items</Card.Title>
                        <ListGroup variant="flush">
                            {
                            
                            cart.cartItems.map((item)=>(
                                <ListGroup.Item key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>
                                            {' '}<br/>
                                            <Link to ={`/product/{item.slug}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={3}>Quantity:{' '}<span>{item.quantity}</span></Col>
                                        <Col md={3}>Price Per kg/Pc:{' '}&#8377;{item.price}</Col>
                                    </Row>

                                </ListGroup.Item>
                            ))
                            }
                           
                        </ListGroup>
                        <div className='mb-3'>
                            <Button variant="primary"><Link to ='/cart'>Edit</Link></Button> 
                            </div>
                        
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>&#8377;{cart.itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>&#8377;{cart.shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>&#8377;{cart.taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Order Total</strong></Col>
                                    <Col><strong>&#8377;{cart.totalPrice. toFixed(2)}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    disabled={cart.cartItems.length==0}>
                                        Place  Order
                                    </Button>
                                </div>
                                {loading &&<Loading></Loading>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>   
            </Col>
        </Row>

      
    </div>
  )
}

export default PlaceOrder
