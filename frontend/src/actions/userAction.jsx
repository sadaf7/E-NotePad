import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_LOGOUT,USER_REGISTER_REQ,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQ, USER_UPDATE_FAIL } from "../constants/userConstants";

export const login = (email,password)=> async(dispatch)=>{
    try {
        dispatch({ type: USER_LOGIN_REQ })
        const config = {
            headers:{
                'Content-Type':'application/json'
            },
        };
        const { data } = await axios.post('http://localhost:4000/api/user/login',{email,password},config)

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, 
                   payload: error.response && error.response.data.message ? 
                   error.response.data.message :
                   error.message
                })
    }
}

export const logout = () => (dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const register = (name,email,password,pic)=> async (dispatch)=>{
    try {
        dispatch({ type: USER_REGISTER_REQ })

        const config={
            headers:{
                'Content-Type':'application/json'
            },
        };

        const { data } = await axios.post('http://localhost:4000/api/user/',{name,email,password,pic},config)

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message
         })
    }
}
export const updateProfile = (name,email,password,pic)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: USER_UPDATE_REQ })
        const {userLogin:{userInfo}} = getState()

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.post('http://localhost:4000/api/user/profile',{name,email,password,pic},config)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? 
            error.response.data.message :
            error.message
         })
    }
}
