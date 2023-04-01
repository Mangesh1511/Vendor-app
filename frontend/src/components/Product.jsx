import {Link } from 'react-router-dom'
import Card from'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Rating from './Ratings'

export default function Product(props) {
    console.log(props.product)
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
                
                <Button style={{ backgroundColor:"rgb(16, 191, 30)" }}>Add to cart</Button>
            </Card.Body>
           
           

        </Card>
    )
}