import './App.css';
import { useContext,useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { LinkContainer } from 'react-router-bootstrap';
import { HelmetProvider } from 'react-helmet-async';
import { Nav, Badge, Navbar, Container, NavDropdown,Carousel } from 'react-bootstrap';
import CartPage from './pages/CartPage';
import { Store } from './Store'
import SigninPage from './pages/SigninPage'
import ShippingAddress from './pages/ShippingAddress';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrder from './pages/PlaceOrder';
import OrderSummaryPage from './pages/OrderSummaryPage';
import OrderHistory from './pages/OrderHistory';
function App() {
  // const navigate=useNavigate();
  // console.log(data.products)
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signOutHandler = () => {
    ctxDispatch({
      type: 'USER_SIGN_OUT',
    });
    console.log('User info is',userInfo);
    
    localStorage.removeItem('userInfo');
    localStorage.removeItem('SHIPPING_ADDRESS');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('OrderHistory');
  }
  console.log('Infor of the user is as follows:',userInfo);
  if(userInfo==null||userInfo==undefined)
  {
    console.log('Yes now user is logged out\n');
  }
 
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position="bottom-center" limit={1}/>
        <header>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>SastaBazaar</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {(
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {(userInfo)?(
                  <NavDropdown title={userInfo.username} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signOutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>)
                   :(
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:slug' element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path='/signin' element={<SigninPage />} />
              <Route path='/signup' element={<SignupPage/>}/>
              <Route path="/shipping" element={<ShippingAddress/>}/>
              <Route path='/payment' element={<PaymentPage/>}/>
              <Route path='/placeOrder' element={<PlaceOrder/>}/>
              <Route path='/order/:id' element={<OrderSummaryPage/>}/>
              <Route path="/orderhistory" element={<OrderHistory/>}/>
            </Routes>
          </Container>

        </main>
        {/* <footer>
          <div className='text-center'>All Rights Reserved</div>
        </footer> */}
        
<footer class="mainfooter" role="contentinfo">
  <div class="footer-middle">
  <div class="container">
    <div class="row">
      <div class="col-md-3 col-sm-6">
        <div class="footer-pad">
          <h4>Get to Know Us</h4>
          <ul class="list-unstyled">
            <li><a href="#"></a></li>
            <li><a href="#">Payment Center</a></li>
            <li><a href="#">Contact Directory</a></li>
            <li><a href="#">Forms</a></li>
            <li><a href="#">News and Updates</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="footer-pad">
          <h4>Make Money With Us</h4>
          <ul class="list-unstyled">
            <li><a href="#">Website Tutorial</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Disclaimer</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Webmaster</a></li>
          </ul>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="footer-pad">
          <h4>Payment Products</h4>
          <ul class="list-unstyled">
            <li><a href="#">Parks and Recreation</a></li>
            <li><a href="#">Public Works</a></li>
            <li><a href="#">Police Department</a></li>
            <li><a href="#">Fire</a></li>
            <li><a href="#">Mayor and City Council</a></li>
            <li>
              <a href="#"></a>
            </li>
          </ul>
        </div>
      </div>
    	<div class="col-md-3">
    		<h4>Follow Us</h4>
            <ul class="social-network social-circle">
             <li><a href="#" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
             <li><a href="#" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
            </ul>				
		</div>
    </div>
	<div class="row">
		<div class="col-md-12 copy">
			<p class="text-center">&copy; Copyright 2018 - Company Name.  All rights reserved.</p>
		</div>
	</div>


  </div>
  </div>
</footer>
  

      </div>
    </BrowserRouter>

  );
}

export default App;
