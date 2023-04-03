
import './App.css';
import { useContext,useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { LinkContainer } from 'react-router-bootstrap';
import { HelmetProvider } from 'react-helmet-async';
import { Nav, Badge, Navbar, Container, NavDropdown } from 'react-bootstrap';
import CartPage from './pages/CartPage';
import { Store } from './Store'
import SigninPage from './pages/SigninPage'
function App() {
  // const navigate=useNavigate();
  // console.log(data.products)
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signOutHandler = () => {
    ctxDispatch({
      type: 'USER_SIGN_OUT',
    });
    localStorage.removeItem('userInfo');
    // window.location.reload(true);
  }
  // console.log('Currently user info is: ',userInfo);
  // useEffect(()=>{
  //   // const arr=Object.keys(userInfo.userInfo);
  //   // console.log('Currently user info is ',arr);
  // }))
  // console.log('User info is: ',userInfo);
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
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
                {userInfo?(
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
            </Routes>
          </Container>

        </main>
        <footer>
          <div className='text-center'>All Rights Reserved</div>
        </footer>

      </div>
    </BrowserRouter>

  );
}

export default App;
