import {Link ,useNavigate} from 'react-router-dom'
import {Card,Button} from'react-bootstrap'
import Rating from './Ratings'
import { useContext } from "react";
import {Store} from '../Store'
import axios from 'axios'


export default function Product(props) {
    const navigate=useNavigate()
    console.log(props.product)
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {cart}=state;
    const addtoCartHandler = async() => {
        const existItem=cart.cartItems.find((x)=>x._id==props.product._id);
        const quantity=existItem?existItem.quantity+1:1;
        const data=await axios.get(`/api/products/${props.product._id}`);
        console.log('add to cart button is clicked!!',data);
        if(data.pquantity<quantity)
        {
            window.alert('Sorry product is out of stock!!');
            return; 
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...props.product, quantity},
        });
        navigate('/cart');
    };

    return (
        <Card>
            <Link to={`/product/${props.product.slug}`} >
                <img src={props.product.image} className='card-img-top' alt={props.product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${props.product.slug}`} >
                    <Card.Title>{props.product.name}</Card.Title></Link>
                    <Rating rating={props.product.rating}
                            numReviews={props.product.numReviews}/>
                <Card.Text><strong>Rs.{props.product.price}/pc</strong></Card.Text>
                {props.product.pquantity===0?(<Button variant="warning" disabled>Out of Stock</Button>):(  <Button style={{ backgroundColor:"rgb(16, 191, 30)" }} onClick={addtoCartHandler}>Add to cart</Button>)}
              
            </Card.Body>
           
           

        </Card>
    )
}