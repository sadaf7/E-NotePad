
import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { createNoteAction, deleteNoteAction, updateNoteAction } from '../../actions/notesActions'
import Loading from '../../components/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'

const SingleNote = () => {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {id} = useParams()
    
    const noteUpdate = useSelector((state)=>state.noteUpdate)
    const {loading, error} = noteUpdate
    
    const userLogin = useSelector((state)=>state.userLogin)
    const { userInfo} = userLogin;

    const noteDelete = useSelector((state)=>state.noteDelete)
    const {success: successDelete, error: errorDelete, loading: loadingDelete} = noteDelete

    const deleteHandler=(id)=>{
        if(window.confirm('Are You Sure?')){
            dispatch(deleteNoteAction(id))
        }
    }
    
    const resetHandler = () =>{
        setTitle("")
        setContent("")
        setCategory("")
    }
    
    useEffect(() => {
        const fetching = async()=>{

            const config = {
                headers: {
                      'Content-Type':'application/json',  
                      Authorization: `Bearer ${userInfo.token}`,
                },
              };

            const {data} = await axios.get(`http://localhost:4000/api/notes/${id}`,config);

            setTitle(data.title)
            setContent(data.content)
            setCategory(data.category)
        }
        fetching() 
    }, [userInfo,successDelete]);

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateNoteAction(id,title,content,category))

        if(!title || !content || !category){
            return
        }
        resetHandler()
        navigate('/mynotes')}

  return (
    <MainScreen title={'Update Your Notes'}>
      <Card>
        <Card.Header>Update Note</Card.Header>
        <Card.Body>
        <Form onSubmit={submitHandler}>
          {errorDelete && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
          {loadingDelete && <Loading/>}
          {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
          {loading && <Loading/>}
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Note Title" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control value={content} onChange={(e)=>setContent(e.target.value)} as="textarea" rows={3} />
          </Form.Group>
          {content && (
            <Card>
              <Card.Header>Content Preview</Card.Header>
              <Card.Body>
                <ReactMarkdown>{content}</ReactMarkdown>
              </Card.Body>
            </Card>
          )}
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder="Note Category" />
          </Form.Group>
          {loading && <Loading size={50}/>}
          <Button type='submit' variant='primary'>Update Note</Button>
          <Button variant='danger' className='mx-2' onClick={()=>{deleteHandler(id)}}>Delete Note</Button>
        </Form>
        </Card.Body>

        <Card.Footer className='text-muted'>
          Created On - {new Date().toLocaleDateString()}
        </Card.Footer>

      </Card>
    </MainScreen>
  )
}

export default SingleNote
