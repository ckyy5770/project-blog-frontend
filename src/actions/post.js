import axios from 'axios';
import history from '../history'

const API_URL = 'http://127.0.0.1:6001';

export const FETCH_POSTS = 'FETCH_POSTS';


export function fetchPosts(){
    const promise = axios.get(`${API_URL}/posts`);

    return {
        type: FETCH_POSTS,
        payload: promise
    }
}