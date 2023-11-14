import React, { useState } from 'react'
import MainScreen from '../../components/MainScreen'
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterScreen = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const [name, setName] = useState();
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler=async(e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
      setMessage('Passwords do not matched')
    } else{
      setMessage(null)
      try {
        const config={
          headers:{
            'Content-Type':'application/json'
          }
        };
        setLoading(true)
        const {data} = await axios.post('http://localhost:4000/api/user/',{
          name, email, password, pic
        },config)
        setLoading(false)
        console.log(data)
        localStorage.setItem('userInfo',JSON.stringify(data))
      } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
      }
    }
  }

  const postDetails=(pics)=>{
    if(!pics){
      setPicMessage('Please Select an image')
    }
    setPicMessage(null)

    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData();
      data.append("file", pics)
      data.append("upload_preset",'note-app')
      data.append("cloud_name", 'dmumjlve0')
      fetch('https://api.cloudinary.com/v1_1/dmumjlve0/image/upload',{
        method:'post',
        body:data
      })
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data)
        setPic(data.url.toString())
      })
      .catch((err)=>{
        console.log(err)
      })
      
    } else{
      return setPicMessage("Please select an image")
    }
  }

  return (
    <MainScreen title='REGISTER'>
      
     <div className='loginContainer'>
      {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
      {message && <ErrorMessage varient='danger'>{message}</ErrorMessage>}
      {loading && <Loading/>}
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" placeholder="Confirm Password" />
      </Form.Group>

      {picMessage && (
        <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
      )}
      <Form.Group className="mb-3" controlId="pic">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type='file' label='upload pic' onChange={(e)=>{postDetails(e.target.files[0])}} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      </Form>
      <Row className='py-3'>
        <Col>
            ALready have an account ? <Link style={{color:'blue'}} to={'/login'}>Login Here</Link>
        </Col>
      </Row>
      </div>

    </MainScreen>
  )
}

export default RegisterScreen
