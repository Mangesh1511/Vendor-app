import {React,useContext,useReducer,useEffect }from 'react'
import {Store} from '../Store';
import {ListGroup,Button,Row,Col,Card} from 'react-bootstrap';
import MessageBox from '../components/MessageBox'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'


function CartPage() {
  const {state,dispatch:ctxDispatch}=useContext(Store);
  const{
    cart:{cartItems},

  }=state;
  console.log('Length of the cart is : ',cartItems.length);
  cartItems.map((item)=>(
    console.log(item._id,item.image,item.name)
  ))
    return (
    <div>
      <Helmet>Shopping Cart</Helmet>
      <h1>Your Shopping Cart</h1>
      <Row>
        <Col md={8}>
        {
        cartItems.length===0?(<MessageBox>Your Cart is Empty for Now.<Link to ="/">Get Items in Your Cart</Link></MessageBox>):
        (
            <ListGroup>
                {cartItems.map((item)=>(
                    <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <img src={item.image}
                                    alt={item.name}
                                    className='rounded img-thumbnail'
                                ></img>{' '}
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                                <Button variant="Light" disabled={item.quantity==1}>
                                    <i className='fas fa-minus-circle'></i>
                                </Button>{' '}
                                <span>{item.quantity}</span>{' '}
                                <Button variang='Light' disabled={item.quantity==item.pquantity}>
                                    <i className='fas fa-plus-circle'></i>
                                </Button>
                            </Col>
                            <Col md={3}>&#8377;{item.price}</Col>
                            <Col md={2}>
                                <Button variant="light">
                                <i className="fas fa-trash"></i>
                                </Button>
                            </Col>

                        </Row>
                    </ListGroup.Item>
                    ))}
            </ListGroup>
        )}
        </Col>
        <Col md={4}>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>
                                Subtotal ({cartItems.reduce((a,c)=>a+c.quantity,0)}{' '}items):$
                                {cartItems.reduce((a,c)=>a+c.price*c.quantity,0)}
                            </h3>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartPage
