import axios from 'axios';
import './axiosConfig'

import history from '../history'

const API_URL = 'http://127.0.0.1:6001';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID';
export const DELETE_POST_BY_ID = 'DELETE_POST_BY_ID';
export const CREATE_POST = 'CREATE_POST';
export const DATA_ERR = 'DATA_ERR';
export const CLEAR_DATA_ERR = 'CLEAR_DATA_ERR';
export const UPDATE_POST = 'UPDATE_POST';


export function fetchPosts(){
    const promise = axios.get(`${API_URL}/posts`);

    return {
        type: FETCH_POSTS,
        payload: promise
    }
}

export function fetchPostById(id){
    const promise = axios.get(`${API_URL}/posts/${id}`);

    return {
        type: FETCH_POST_BY_ID,
        payload: promise
    }
}

export function deletePostById(id) {
    return function(dispatch){
        axios.delete(`${API_URL}/posts/${id}`)
            .then(response =>{
                // request success
                dispatch({ type: DELETE_POST_BY_ID });
                // redirect
                history.push('/posts');
            })
            .catch(response =>{
                // request fail
            });
    }
}

export function createPost(post){
    return function(dispatch){
        axios.post(`${API_URL}/posts`, post)
            .then(response =>{
                // request success
                dispatch({ type: CREATE_POST });
                // redirect
                history.push('/posts');
            })
            .catch(response =>{
                // request fail
                dispatch({ type: DATA_ERR, payload: response})
            });
    }
}

export function clearDataErr(){
    return {
        type: CLEAR_DATA_ERR
    }

}

export function updatePost(post, id) {
    return function(dispatch){
        axios.put(`${API_URL}/posts/${id}`, post)
            .then(response =>{
                // request success
                dispatch({ type: UPDATE_POST, payload: response });
                // redirect
                history.push(`/posts/${id}`);
            })
            .catch(response =>{
                // request fail
                dispatch({ type: DATA_ERR, payload: response})
            });
    }
}