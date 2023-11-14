import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {


  const navigate = useNavigate()

  return (
    <Navbar bg='primary' variant='dark' expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to='/'>E-NotePad</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav className='m-auto'>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
            </Nav>
            <Nav.Link >
              <Link to='/mynotes'>My Notes</Link>
            </Nav.Link>
            <NavDropdown title="Sadaf Hossain" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{
                localStorage.removeItem('userInfo');
                navigate('/')
              }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
