import axios from 'axios';
import {FETCH_USER, FETCH_POSTS, FIND_USER, SIGN_UP, CATCH_ERROR, FETCH_CHATS} from "./types";
import {socket} from "../components/App";

export function fetchUser() {

     return async (dispatch)=>{
         const res=await axios.get('/api/current_user');
         dispatch({type:FETCH_USER,payload:res.data});
     }
}

export function sendPost(postId,values,history) {
    return async (dispatch) => {
        const res=await axios.post('/api/post',{postId :postId,values});
        history.push('/dashboard');
        dispatch({type:FETCH_POSTS,payload:res.data} );
    }
}

export function sendComment(values,postId,history) {
    return async (dispatch) => {
        const res=await axios.post('/api/post/comment',{postId :postId,comment:values});
        console.log(res.data)
       // history.push('/dashboard');
        dispatch({type:FETCH_POSTS,payload:res.data} );
    }
}

export function deletePost(postId,history) {
    return async (dispatch) => {
        const res=await axios.post('/api/post/delete',{postId :postId});
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

export function findUser(name,history) {

    return async (dispatch)=> {

            const res = await axios.get('/api/users/'+name);
            history.push('/users/' + name);
            dispatch({type: FETCH_POSTS, payload: res.data});
        }

}

export function signUp(values,history) {

    return async (dispatch)=> {

            const res = await axios.post('/api/sign_up', values);
            if(!res.data)
                history.push('/');
            dispatch({type: CATCH_ERROR, payload: res.data});
        }

}

export function logIn(values,history) {

    return async (dispatch)=> {

        const res = await axios.post('/login/common', values);
        history.push('/dashboard');
        dispatch({type: FETCH_USER, payload: res.data});
    }

}

export function likePost(postId) {

    return async (dispatch)=>{
        const res=await axios.post('/api/like',{postId :postId});
        dispatch({type:FETCH_POSTS,payload:res.data});
    }
}

export function getMoreComments(postId,num) {

    return async (dispatch)=>{
        const res=await axios.post('/api/comment',{postId :postId,num:num});
        dispatch({type:FETCH_POSTS,payload:res.data});
    }
}

export function sendFriendRequest(username) {

    return async (dispatch)=>{
        const res=await axios.post('/api/add_friend',{username:username});
        dispatch({type:FETCH_USER,payload:res.data});
    }
}

export function acceptFriendRequest(userId) {

    return async (dispatch)=>{
        const res=await axios.post('/api/accept',{userId:userId});
          dispatch({type:FETCH_USER,payload:res.data});
    }
}

export function fetchChats(myId,name) {
    return async (dispatch)=>{
        //const res=await axios.get('/api/message/'+name);
        socket.emit('initial_data', {myId: myId, name: name})
        socket.on('initial_data',(chat)=>{
            dispatch({type:FETCH_CHATS,payload:chat});

        })
    }

}

export function sendMessage(myId,name,message) {

    return async (dispatch)=>{

        socket.emit('send_message', {myId: myId, name: name,message:message})
        socket.on('updated_chat',(chat)=>{
            dispatch({type:FETCH_CHATS,payload:chat});

        })
        //const res=await axios.post('/api/message/'+name,{message:message});
    }

}

export function uploadImage(file){
    console.log(file)
    return async (dispatch)=> {
        const res = await axios.post('/api/upload', file);
        dispatch({type: FETCH_USER, payload: res.data});
    }
}
