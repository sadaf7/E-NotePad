import React from 'react'
import {Button, Container,Row} from 'react-bootstrap'
import './LandingPage.css'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'

const LandingPage = () => {


  // useEffect(() => {
  //   const userInfo = localStorage.getItem('userInfo')
  //   if(userInfo){
  //     navigate('/mynotes')
  //   } else{
  //     navigate('/login')
  //   }
  // }, []);

  return (
    <div className='main'>
      <Container>
        <Row>
            <div className='intro-text'>
                <div>
                    <h1 className='title'>Welcome to E-NoteBook</h1>
                    <p className='subtitle'>Save Your Notes Here</p>
                </div>
                <div className="buttonContainer">
                    <Link to={"/login"}>
                        <Button size='lg' className='landingButton'>Login</Button>
                    </Link>
                    <Link to={"/register"}>
                        <Button size='lg' className='landingButton'>SignUp</Button>
                    </Link>
                </div>
            </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
