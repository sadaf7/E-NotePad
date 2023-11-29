import React, { useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../../components/Loading'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Loading from '../../components/Loading'
import { updateProfile } from '../../actions/userAction'
import './ProfileScreen.css'

const ProfileScreen = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [pic, setPic] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [picMessage, setPicMessage] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userLogin = useSelector((state)=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector((state)=>state.userUpdate)
    const {loading, error , success} = userUpdate

    useEffect(() => {
      if(!userInfo){
        navigate('/')
      } else{
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPic(userInfo.pic);
      }
    }, [navigate,userInfo]);

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

    const submitHandler=async(e)=>{
      e.preventDefault();
      
      if(password === confirmPassword){
        dispatch(updateProfile(name,email,password,pic))
      }
    }

  return (
    <MainScreen title={'Edit Profile'}>
      <div>
        <Row className='profileContainer'>
            <Col md={6}>
    <Form onSubmit={submitHandler}>
      {loading && <Loading/>}
      {success && (<ErrorMessage varient='success'>Updated Succesfully</ErrorMessage>)}
      {error && (<ErrorMessage varient='danger'>{error}</ErrorMessage>)}
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
        <Form.Control value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" placeholder="Password" />
      </Form.Group>
      {picMessage && (<ErrorMessage variant='danger'>{error}</ErrorMessage>)}
      <Form.Group className="mb-3" controlId="pic">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type='file' label='upload pic' onChange={(e)=>{postDetails(e.target.files[0])}} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

    </Form>
            </Col>
            <Col style={{display:'flow',justifyContent:'center',alignItems:'center'}}>
                <img src={pic} width={'300px'} className='profilePic' alt="" />
            </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default ProfileScreen
