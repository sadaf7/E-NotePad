import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './LoginScreen.css'
import axios from 'axios'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'

const LoginScreen = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();


  const submitHandler = async(e)=>{
    e.preventDefault();
    
    try {
        const config={
            headers:{
                "Content-Type": "application/json"
            },
        }
        setLoading(true)
        const {data} = await axios.post('http://localhost:4000/api/user/login',{
            email,password
        },config)

        localStorage.setItem('userInfo',JSON.stringify(data))
        setLoading(false)
    } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
    }

  }


  return (
    <MainScreen title={"LOGIN"}>
     <div className='loginContainer'>
      {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
      {loading && <Loading/>}
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      </Form>
      <Row className='py-3'>
        <Col>
            Didn't have account ? <Link style={{color:'blue'}} to={'/register'}>Register Here</Link>
        </Col>
      </Row>
      </div>
    </MainScreen>
  )
}

export default LoginScreen
