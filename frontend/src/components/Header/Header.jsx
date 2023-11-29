import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';

const Header = ({setSearch}) => {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state)=>state.userLogin)

  const { userInfo } = userLogin

  const logoutHandler = () =>{
    dispatch(logout())
    navigate('/')
  }

  return (
    <Navbar bg='primary' variant='dark' expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to='/'>E-NotePad</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {userInfo ?( <Nav
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
              onChange={(e)=>setSearch(e.target.value)}
            />
          </Form>
            </Nav>
            <Nav.Link >
              <Link to='/mynotes'>My Notes</Link>
            </Nav.Link>
            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>):(<Nav>
            <Nav.Link><Link to="/login">Login</Link></Nav.Link>
          </Nav>)}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
