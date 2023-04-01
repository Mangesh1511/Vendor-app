import { useNavigate, useParams } from "react-router-dom"
import { BrowserRouter, Link, Route, Routes,Navigate } from 'react-router-dom'
import { useReducer, useEffect, useState, useContext } from "react";
import Product from '../components/Product'
import axios from 'axios';
import { Card, Badge, Button, Row, Col, ListGroup } from 'react-bootstrap'
import Ratings from '../components/Ratings'
import { Helmet } from 'react-helmet-async';
import MessageBox from "../components/MessageBox";
import Loading from '../components/Loading'
import { getError } from '../utils'
import { Store } from '../Store'
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;

    }
};
function ProductPage() {
    const navigate=useNavigate();
    const Params = useParams();
    const { slug } = Params;
    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        loading: true, error: '', product: []
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get(`/api/products/slug/${slug}`)
                console.log('Result is', result)
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
                // else
                // throw new Error('Data NotFound');
                // console.log(result);
            }
            catch (err) {
                console.log('Result is', err.response.data.message)
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }


        }
        fetchData();
    }, [slug])


    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {cart}=state;
    const addtoCartHandler = async() => {
        const existItem=cart.cartItems.find((x)=>x._id==product._id);
        const quantity=existItem?existItem.quantity+1:1;
        const data=await axios.get(`/api/products/${product._id}`);
        console.log('add to cart button is clicked!!',data);
        if(data.pquantity<quantity)
        {
            window.alert('Sorry product is out of stock!!');
            return; 
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity},
        });
        navigate('/cart');
    };

    return (

        loading ? (<div><Loading /></div>) : error ? (<div><MessageBox variant="danger">{error}</MessageBox></div>) :
            (<div>
                <Row>

                    <Col md={6}>
                        <img src={`.${product.image}`} className='image-large' alt={product.name} />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Helmet><title>{product.name}</title></Helmet>
                                <h1>{product.name}  </h1>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price : Rs.{product.price}/per pc
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Ratings rating={product.rating}
                                    numReviews={product.numReviews}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5>{product.description}</h5>
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Product Price:</Col>
                                            <Col>Rs.{product.price}/Per Pc</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item variant='flush'>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{
                                                product.pquantity > 0 ?
                                                    (<Badge bg="success">Available</Badge>) : (<Badge bg="danger">Unavailable</Badge>)
                                            }</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.pquantity > 0 ? <ListGroup.Item>
                                        Availbale Quantity: {product.pquantity}</ListGroup.Item> : ('')}
                                    {product.pquantity > 0 ? (<ListGroup.Item>
                                        <Button onClick={addtoCartHandler} variant='primary'>Add to Cart</Button>
                                    </ListGroup.Item>) : (<div>Not Available Now</div>)}

                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            )
    )
}

export default ProductPage;


{/* <div>
<img src={`.${product.image}`}/>
<p>{product.name}</p>
</div> */}