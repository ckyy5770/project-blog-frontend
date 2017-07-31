import axios from 'axios';
import history from '../history'

const API_URL = 'http://127.0.0.1:6001';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const AUTH_ERR = 'AUTH_ERR';

export function loginUser({email, password}){
    return function(dispatch){
        axios.post(`${API_URL}/login`, {email:email, password:password})
            .then(response =>{
                // request success
                // save token to local storage
                localStorage.setItem('token', response.data.token);
                // dispatch authenticate action
                dispatch({ type: AUTH_USER});
                // redirect
                history.push('/');
            })
            .catch(response =>{
                // request fail
                dispatch(authErr(`login failed. ${response}`));
            });
    }

}

export function authErr(err){
    return {
        type: AUTH_ERR,
        payload: err
    }
}