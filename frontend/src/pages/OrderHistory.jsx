import React from 'react'
import axios from 'axios'
import {useState,useEffect,useReducer,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { ListGroup,Row,Col,Container,Button  } from 'react-bootstrap'
import {Helmet} from 'react-helmet-async';
import {Store} from '../Store';

function OrderHistory() {
    const navigate=useNavigate();
    const {state }=useContext(Store);
    const {userInfo}=state;
    const [orderData,setorderData]=useState([]);

    useEffect(()=>{
        const fetchData=async()=>{

            const {data}=await axios.get(`/api/orders/getorders/${userInfo._id}`,
            {headers:{authorization:`Bearer ${userInfo.token}`}
        
            });
                localStorage.setItem('OrderHistory',data);
                setorderData(localStorage.getItem('OrderHistory'));
        }
        fetchData();

    })
  return (
    <div>
        <Helmet><title>Order History</title></Helmet>
        <div className='my-3'>
            <h1>Order History</h1>
        </div>
        <Container className="mt-3">
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col md={4}>Order ID</Col>
                        <Col md={2}>DATE</Col>
                        <Col md={1}>TOTAL</Col>
                        <Col md={2}>PAID</Col>
                        <Col md={1}>DELIEVERED</Col>
                        <Col md={2}>ACTIONS</Col>

                    </Row>
                </ListGroup.Item>
                {
                    orderData.map((order)=>(
                        
                <ListGroup.Item>
                        <Row>
                        <Col md={4}>{order._id}</Col>
                        <Col md={2}>{order.createdAt}</Col>
                        <Col md={1}>{order.totalPrice}</Col>
                        <Col md={2}>{order.isPaid}</Col>
                        <Col md={1}>{order.isDelivered}</Col>
                        <Col md={2}><Button>DETAILS</Button></Col>
                        </Row>
                </ListGroup.Item>
                        

                    ))
                }
            </ListGroup>
        </Container>
      
    </div>
  )
}

export default OrderHistory
