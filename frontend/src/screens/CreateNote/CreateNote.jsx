import React, { useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { createNoteAction } from '../../actions/notesActions'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import ReactMarkdown from 'react-markdown'

const CreateNote = () => {

const [title, setTitle] = useState();
const [content, setContent] = useState();
const [category, setCategory] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const noteCreate = useSelector((state)=>state.noteCreate)
  const {loading, note, error} = noteCreate

  const resetHandler = () =>{
    setTitle("")
    setContent("")
    setCategory("")
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    if(!title || !content || !category){
      return
    }
    dispatch(createNoteAction(title,content,category))

    resetHandler()
    navigate('/mynotes')
  }

  return (
    <MainScreen title={'Write Your Notes'}>
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
        <Form onSubmit={submitHandler}>
          {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
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
          <Button type='submit' variant='primary'>Create Note</Button>
          <Button variant='danger' className='mx-2' onClick={resetHandler}>Reset</Button>
        </Form>
        </Card.Body>

        <Card.Footer className='text-muted'>
          Created On - {new Date().toLocaleDateString()}
        </Card.Footer>

      </Card>
    </MainScreen>
  )
}

export default CreateNote
