import axios from "axios";
import { NOTES_CREATE_REQ, NOTES_CREATE_SUCCESS, NOTES_DELETE_FAIL, NOTES_DELETE_REQ, NOTES_DELETE_SUCCESS, NOTES_LIST_FAIL, NOTES_LIST_REQ, NOTES_LIST_SUCCESS, NOTES_UPDATE_REQ, NOTES_UPDATE_SUCCESS } from "../constants/notesConstant";

export const listNotes = ()=>async(dispatch,getState)=>{
    try {
        dispatch({type: NOTES_LIST_REQ})
        const { userLogin: {userInfo}} = getState();

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        const { data } = await axios.get('http://localhost:4000/api/notes',config)

        dispatch({type: NOTES_LIST_SUCCESS, payload: data})

    } catch (error) {
        dispatch({ type: NOTES_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message
         })
    }
}

export const createNoteAction = (title,content,category)=>async(dispatch,getState)=>{
    try {
        dispatch({type: NOTES_CREATE_REQ})
        const { userLogin: {userInfo}} = getState();

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        const { data } = await axios.post('http://localhost:4000/api/notes/create',{title,content,category},config)

        dispatch({type: NOTES_CREATE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: NOTES_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message
         })
    }
}

export const updateNoteAction=(id,title,content,category)=>async(dispatch,getState)=>{
    try {
        dispatch({type: NOTES_UPDATE_REQ})
        const {userLogin:{userInfo}} = getState();

        const config ={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        const { data } = await axios.put(`http://localhost:4000/api/notes/${id}`,{title,content,category},config)

        dispatch({type: NOTES_UPDATE_SUCCESS, payload: data})
    } catch (error) {
        dispatch({ type: NOTES_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message
         })
    }
} 

export const deleteNoteAction=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type: NOTES_DELETE_REQ})
        const {userLogin:{userInfo}} = getState();

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.delete(`http://localhost:4000/api/notes/${id}`,config)
        dispatch({type:NOTES_DELETE_SUCCESS,payload:data});
    } catch (error) {
        dispatch({ type: NOTES_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message
         })
    }
}