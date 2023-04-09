import { data } from '../data';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { useEffect, useState, useReducer } from 'react';
import logger from 'use-reducer-logger'
import axios from 'axios';
import {Row,Col,Carousel} from 'react-bootstrap'
import Product from '../components/Product'
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading'
import MessageBox from '../components/MessageBox';
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;

    };
};
export default function HomePage() {
    // const [products,setProducts]=useState([]);
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        loading: true, error: '', products: []
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get('/api/products')
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
                console.log(result);
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.msg })
            }


        }
        fetchData();
    }, []);
    return (
        <div className='Homepage'>
         <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/carousel1.png"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./images/carousel2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
            src="./images/carousel3.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <div>

        <Helmet><title>SastaBazaar</title></Helmet>
       
        <h1>Daily Products</h1>

        <div className='products'>
            {
                loading ? (<div><Loading/></div>) : error ? (<div><MessageBox variant="danger">{error}</MessageBox></div>):
                 (
                    <Row>
                        {
                            products.map((item) => (
                                <Col key={item.slug} sm={6} mid={4} lg={3} className='mb-3'>{
                               
                                    <Product product={item}/>
                                 }</Col>
                            ))

                        }
                    </Row>
                )
            }
        </div>
</div>
</div>);}