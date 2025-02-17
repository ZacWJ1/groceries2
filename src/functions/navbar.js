import React from 'react';
import './navbar.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import logoo from './G.png'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
/*import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';*/
import Button from '@mui/material/Button';
import Logout from '../pages/logout';



const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation()

  if(location.pathname === '/login') {
    return null
  }
  
  return (
    <Navbar expand="xl" className=" gradient_bg navi">
      <Container>
      <Navbar.Brand href="#home" className='font-bold'>
      <img
              alt=""
              src={logoo}
              width="50"
              height="50"
              className="d-inline-block align-top rounded"
      />
       </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto underline">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
            
            {isLoggedIn ? (
                        <>
            
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/items/new">Recipes</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="#link">Logout</Nav.Link>
            <Logout /*setIsLoggedIn={setIsLoggedIn}*/ />

                            
                        </>
                    ) : (
                        <Logout /*setIsLoggedIn={setIsLoggedIn}*/ />
                    )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;