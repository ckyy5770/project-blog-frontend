import axios from 'axios';
import './axiosConfig'
import history from '../history'

import { DATA_ERR } from'./post';
import {API_URL} from "./axiosConfig"


export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CLEAR_DATA_ERR = 'CLEAR_DATA_ERR';
export const FETCH_COMMENTS_BY_POSTID = 'FETCH_COMMENTS_BY_POSTID';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const FETCH_COMMENT_BY_ID = 'FETCH_COMMENT_BY_ID';
export const DELETE_COMMENT_BY_ID = 'DELETE_COMMENT_BY_ID';



export function createComment(comment, postId){
    return function(dispatch){
        axios.post(`${API_URL}/posts/${postId}/comments`, comment)
            .then(response =>{
                // request success
                dispatch({ type: CREATE_COMMENT });
                // reload current page
                window.location.reload();
                //fetchCommentsByPostId(postId);
                //history.push(`/posts/${postId}`);
            })
            .catch(response =>{
                // request fail
                dispatch({ type: DATA_ERR, payload: response})
            });
    }
}

export function fetchCommentsByPostId(postId){
    const promise = axios.get(`${API_URL}/posts/${postId}/comments`);

    return {
        type: FETCH_COMMENTS_BY_POSTID,
        payload: promise
    }
}

export function updateComment(comment, postId, commentId) {
    return function(dispatch){
        axios.put(`${API_URL}/posts/${postId}/comments/${commentId}`, comment)
            .then(response =>{
                // request success
                dispatch({ type: UPDATE_COMMENT, payload: response });
                // redirect
                history.push(`/posts/${postId}`);
            })
            .catch(response =>{
                // request fail
                dispatch({ type: DATA_ERR, payload: response})
            });
    }
}

export function fetchCommentById(postId, commentId) {
    const promise = axios.get(`${API_URL}/posts/${postId}/comments/${commentId}`);

    return {
        type: FETCH_COMMENT_BY_ID,
        payload: promise
    }
}

export function deleteCommentById(postId, commentId){
    return function(dispatch){
        axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`)
            .then(response =>{
                // request success
                dispatch({ type: DELETE_COMMENT_BY_ID });
                // reload current page
                window.location.reload();
            })
            .catch(response =>{
                // request fail
            });
    }
}