import {
    FETCH_POSTS, FETCH_POST_BY_ID, DELETE_POST_BY_ID, CREATE_POST, CLEAR_DATA_ERR,
    UPDATE_POST
} from "../actions/post";
import {CREATE_COMMENT, FETCH_COMMENT_BY_ID, FETCH_COMMENTS_BY_POSTID, DELETE_COMMENT_BY_ID} from "../actions/comment";


export default function (state={}, action) {
    switch(action.type){
        case FETCH_POSTS:
            return {...state, posts: action.payload};
        case FETCH_POST_BY_ID:
            return {...state, show: action.payload};
        case DELETE_POST_BY_ID:
            return state;
        case CREATE_POST:
            return state;
        case CLEAR_DATA_ERR:
            return {...state, err: null};
        case UPDATE_POST:
            return {...state, show: action.payload};

        case CREATE_COMMENT:
            return state;
        case FETCH_COMMENTS_BY_POSTID:
            return {...state, comments: action.payload};
        case FETCH_COMMENT_BY_ID:
            return {...state, showComment: action.payload};
        case DELETE_COMMENT_BY_ID:
            return state;
        default: return state;
    }
}