import React from 'react'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import notes from '../../../data/notes'

const MyNotes = () => {

    const deleteHandler=(id)=>{
        if(window.confirm('Are You Sure?')){

        }
    }


    return (
        <div>
            <MainScreen title='Welcome Back'>
                <Link to='/createnote'>
                    <Button>
                        Create New Note
                    </Button>
                </Link>
                    {
                        notes.map((note) => {
                            
                            return (

                                <Accordion>
                                    <Card style={{ margin: "10px" }}  key={note._id}>
                                    <Card.Header style={{ display: "flex" }}>

                                        <span style={{ flex: '1', alignSelf: "center", color: "black", cursor: "pointer", textDecoration: "none", fontSize: "19px" }}>
                                            
                                        <Accordion.Header style={{border:"none",outline:"none"}}  as={Card.Text} variant='link' eventKey='0'>
                                            {note.title}
                                        </Accordion.Header>
                                        </span>


                                        <div>
                                            <Button href={`/note/${note._id}`}>Edit</Button>
                                            <Button variant='danger' onClick={()=>{deleteHandler(note._id)}} className='mx-2'>Delete</Button>
                                        </div>
                                    </Card.Header>

                                    <Accordion.Body eventKey='0'>
                                    <Card.Body>
                                    <h3>
                                        <Badge variant='success'>
                                            Category - {note.category}
                                        </Badge>
                                    </h3>

                                    <blockquote className="blockquote mb-0">
                                      <p>
                                        {note.content}
                                      </p>
                                      <footer className="blockquote-footer">
                                           Created on -Date
                                      </footer>
                                    </blockquote>
                                    </Card.Body>
                                    </Accordion.Body>
                                </Card>
                                </Accordion>

                            )
                        })
                    }

            </MainScreen>
        </div>
    )
}

export default MyNotes
