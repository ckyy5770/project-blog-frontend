import axios from 'axios';
import history from '../history'

const API_URL = 'http://127.0.0.1:6001';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERR = 'AUTH_ERR';
export const CLEAR_AUTH_ERR = 'CLEAR_AUTH_ERR';

export function loginUser({email, password}){
    return function(dispatch){
        axios.post(`${API_URL}/login`, {email:email, password:password})
            .then(response =>{
                // request success
                // save token to local storage
                localStorage.setItem('token', response.data.token);
                // dispatch authenticate action
                dispatch({ type: AUTH_USER });
                // redirect
                history.push('/posts');
            })
            .catch(response =>{
                // request fail
                dispatch(authErr(`login failed. ${response}`));
            });
    }

}

export function logoutUser(){
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    }
}

export function signupUser({email, password}){
    return function(dispatch){
        axios.post(`${API_URL}/signup`, {email:email, password:password})
            .then(response =>{
                // request success
                localStorage.setItem('token', response.data.token);
                dispatch({ type: AUTH_USER });
                history.push('/posts');
            })
            .catch(response =>{
                dispatch(authErr(`signup failed. ${response.data.error}`))
            })
    }
}

export function authErr(err){
    return {
        type: AUTH_ERR,
        payload: err
    }
}

export function clearAuthErr(){
    return {
        type: CLEAR_AUTH_ERR
    }
}