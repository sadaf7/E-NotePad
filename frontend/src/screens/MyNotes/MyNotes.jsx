import React, { useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { deleteNoteAction, listNotes } from '../../actions/notesActions'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'

const MyNotes = ({search}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const noteList = useSelector((state)=>state.noteList)
    const {loading, error, notes} = noteList

    const userLogin = useSelector((state)=>state.userLogin)
    const {userInfo} = userLogin

    const noteCreate = useSelector((state)=>state.noteCreate)
    const {success: successCreate} = noteCreate

    const noteUpdate = useSelector((state)=>state.noteUpdate)
    const {success: successUpdate} = noteUpdate

    const noteDelete = useSelector((state)=>state.noteDelete)
    const {success: successDelete, error: errorDelete, loading: loadingDelete} = noteDelete

    const deleteHandler=(id)=>{
        if(window.confirm('Are You Sure?')){
            dispatch(deleteNoteAction(id))
        }
    }

    useEffect(() => {
        dispatch(listNotes())
        if(!userInfo){
            navigate('/')
        }
    }, [dispatch,successCreate,navigate,userInfo,successUpdate,successDelete]);

    return (
        <div>
            <MainScreen title={`Welcome Back ${userInfo.name}`}>
                <Link to='/createnote'>
                    <Button>
                        Create New Note
                    </Button>
                </Link>
                {errorDelete && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
                {loadingDelete && <Loading/>}
                {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
                {loading && <Loading/>}
                    {
                        notes?.reverse().map((note) => {
                            
                            return (

                                <Accordion>
                                    <Card style={{ margin: "10px" }}  key={note._id}>
                                    <Card.Header style={{ display: "flex" }}>

                                        <span style={{ flex: '1', alignSelf: "center", color: "black", cursor: "pointer", textDecoration: "none", fontSize: "19px" }}>
                                            
                                        <Accordion.Header  border="primary" as={Card.Text} variant='link' eventKey='0'>
                                            {note.title}
                                        </Accordion.Header>
                                        </span>

                                        <div>
                                            <Link to={`/note/${note._id}`}>Edit</Link>
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
                                           Created on 
                                             {note.createdAt}
                                           <cite title='Source Title'>
                                           </cite>
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
