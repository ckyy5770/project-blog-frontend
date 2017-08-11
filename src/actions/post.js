import axios from 'axios';
import history from '../history'

const API_URL = 'http://127.0.0.1:6001';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID';
export const DELETE_POST_BY_ID = 'DELETE_POST_BY_ID';


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
