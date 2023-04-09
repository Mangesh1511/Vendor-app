import React, { useContext, useState,useEffect, useReducer } from 'react'
import {useNavigate,useParams,Link} from 'react-router-dom'
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox' 
import {Store} from'../Store'
import {getError} from '../utils'
import axios from 'axios'
import {Helmet} from 'react-helmet-async'
import { ListGroup ,Card,Row,Col} from 'react-bootstrap';
import { data } from '../data';
import { toast } from 'react-toastify';
import { PayPalButtons,usePayPalScriptReducer } from '@paypal/react-paypal-js';
import '../index.css'
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return {...state,loadingPay:true};
    case 'PAY_SUCCESS':
      console.log('Payment is SuccessFull')
      return {...state,loadingPay:false,successPay:true};
    case 'PAY_FAIL':
      return{...state,loadingPay:false  };
    case 'PAY_RESET':
      return {...state,loadingPay:false,successPay:false};

    default:
      return state;
  }
}
function OrderSummaryPage() {
  const [tPrice,settPrice]=useState(0);
  const [{loading,error,order,successPay,loadingPay},dispatch]=useReducer(reducer,{
    loading:true,
    order:{},
    error:'',
    successPay:false,
    loadingPay:false,
  });
  const navigate=useNavigate();
  const {state}=useContext(Store);
  const {userInfo}=state;
  const params=useParams();
   const {id:orderId}=params;
   const [{isPending},paypalDispatch]=usePayPalScriptReducer();
   function createOrder(data,actions){
    console.log('Value of tPrice is: ',tPrice);
   
    return actions.order
    .create({
      purchase_units:[
        {
          amount:{value:tPrice},
        },
      ],
    })
    .then((orderID)=>{
      return orderID;
    }); 
   }

   function onApprove(data,actions)
   {
    console.log('Order is to be updated');
    return actions.order.capture().then(async function(details){
      try{
          dispatch({type:'PAY_REQUEST'});
          const {data}=await axios.put(`/api/orders/${order._id}/pay`,details,{
            headers:{authorization:`Bearer ${userInfo.token}`},
          });
          // console.log(data.data);
          dispatch({type:'PAY_SUCCESS',payload:data});
          toast.success('Order is Paid');

      }
      catch(err)
      {
          dispatch({type:'PAY_FAIL',payload:getError(err)});
          toast.error(getError(err));
      }
    });
   }
   function onError(err)
   {
      toast.error(getError(err)); 
   }
  useEffect(()=>{
    
    const fetchOrder=async(req,res)=>{
      try
      {
        dispatch({type:'FETCH_REQUEST'});
        const {data}=await axios.get(`/api/orders/${orderId}`,{
          headers:{authorization:`Bearer ${userInfo.token}`}
        });
        console.log('Order information is as follows: ',data.data);
        dispatch({type:'FETCH_SUCCESS',payload:data.data});
        console.log(order);
        console.log(typeof(data.data.totalPrice));
        var t=(data.data.totalPrice/81.84 );
        console.log(t);
        settPrice(t.toFixed(2));

      }
      catch(err)
      {
        console.log(err);
        dispatch({type:'FETCH_FAIL',payload:getError(err)})
      }
    }
    if(!userInfo)
      return navigate('/signin');
    
      if(!order._id||successPay||(order._id!==orderId))
      {
        fetchOrder();
        if(successPay)
        {
          dispatch({type:'PAY_RESET'});

        }
      }
      else
      {
        const loadPaypalScript=async()=>{
          const {data:clientId}=await axios.get('/api/keys/paypal',{
            headers:{authorization: `Bearer ${userInfo.token}`,
        },
           });
           paypalDispatch({
            type:'resetOptions',
            value:{
              'client-id':clientId,
              currency:'USD',
            },
           });
           paypalDispatch({type:'setLoadingStatus',value:'pending'});

        }
        loadPaypalScript();
      }
    
  },[order,userInfo,orderId,navigate,paypalDispatch,successPay,tPrice,settPrice]);
  return (
   loading?(<Loading></Loading>):error?(<MessageBox variant="danger">{error}</MessageBox>):(
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className='my-3'>Order{''}{orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong>{order.shippingAddress.fullName}<br/>
                <strong>Address: </strong>{order.shippingAddress.address}
                {order.city},{order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered?(<MessageBox variant="success">Delievered at:{order.deliveredAt}</MessageBox>):
              <MessageBox variant="primary">Not Delievered</MessageBox>}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method</strong>{order.paymentMethod}
              </Card.Text>
              {order.isPaid?(<MessageBox variant="success">Paid at{order.paidAt}</MessageBox>):(<MessageBox variant="primary">Not Paid</MessageBox>)}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Cart Items</Card.Title>
              {
                console.log(order.orderItems)
              }
              <ListGroup variant="flush">
                {order.orderItems.map((items)=>(
                  <ListGroup.Item key={items._id}>
                    <Row className="align-items-center">
                        <Col md={5}>
                          {/* {items.image} */}
                          <img src={'.'+items.image}
                              alt={items.name}
                              className=' rounded img-thumbnail'/>{' '}
                          <Link to={`/product/${items.slug}`}>{items.name}</Link>
                        </Col>
                        <Col md={4}>
                          <span>{items.quantity}</span>
                        </Col>
                        <Col md={3}>
                          &#8377;{items.price}
                        </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Total Items Price</strong></Col>
                    <Col>&#8377;{order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Shipping Cost:</strong> </Col>
                    <Col>&#8377;{order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Tax: </strong></Col>
                    <Col>&#8377;{order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                    <strong>Order Total</strong></Col>
                    <Col><strong>&#8377;{order.totalPrice.toFixed(2)}</strong></Col>
                  </Row>
                </ListGroup.Item>
                {
                  !order.isPaid&&(
                    <ListGroup.Item>
                      {isPending?(<Loading/>):(
                        <div>
                          <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}>
                          </PayPalButtons>
                          </div>
                      )}
                      {loadingPay &&<Loading/>}
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
   )
  )
}

export default OrderSummaryPage
