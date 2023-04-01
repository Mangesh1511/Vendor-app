import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import {Row,Col,Card} from 'react-bootstrap'
import '../index.css'
function Loading() {

    return (
        <Row>
            <Col md={3}>
            </Col>
            <Col md={6}>
                <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
                {/* <Card style={{width:'18rem'}} bg="primary"  text={"Primary" === 'light' ? 'dark' : 'white'} >
                    <Card.Img variant='top' src={'./images/loader.jpg'}/>
                    <Card.Body>
                        <Card.Title>Did you know ?</Card.Title>
                        <Card.Text>Organic vegetables and fruits contains about 20 to 40% more antioxidants than inorganic vegetables and fruits have</Card.Text>
                    </Card.Body>
                </Card> */}
                <div className='Card'>
                    <h5>Did you Know ?</h5>
                    <p><i>Organic Vegetables and fruits contains about 20% to 40% more anti-oxidants.</i></p>
                </div>
           
   
            </Col>
            <Col md={3}>

            </Col>
        </Row>


    )
}

export default Loading
