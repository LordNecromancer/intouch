import axios from 'axios';
import {FETCH_USER,FETCH_POSTS} from "./types";

export function fetchUser() {

     return async (dispatch)=>{
         const res=await axios.get('/api/current_user');
         dispatch({type:FETCH_USER,payload:res.data});
     }
}

export function sendPost(values,history) {
    return async (dispatch) => {
        const res=await axios.post('/api/post',values);
        history.push('/dashboard');
        dispatch({type:FETCH_USER,payload:res.data} );
    }
}

export function fetchPosts() {

    return async (dispatch)=>{
        const res=await axios.get('/api/posts');
        dispatch({type:FETCH_POSTS,payload:res.data});
    }
}