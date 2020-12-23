import axios from 'axios';
import {
    FETCH_USER,
    FETCH_POSTS,
    FIND_USER,
    SIGN_UP,
    CATCH_ERROR,
    FETCH_CHATS,
    FETCH_MESSAGES,
    FETCH_POST,
    UPDATE_LIKES,
    FETCH_FEED,
    UPDATE_CHATS,
    SHOW_MESSAGE,
    RESEND_TOKEN
} from "./types";
import {socket} from "../index";

export function fetchUser() {

     return async (dispatch)=>{
         const res=await axios.get('/api/current_user');
         dispatch({type:FETCH_USER,payload:res.data});
     }
}

export function sendPost(postId,values,imageData,history,userId) {
    console.log(imageData)
    return async (dispatch) => {
        let t=await JSON.stringify(imageData)
        const res=await axios.post('/api/post/'+userId,imageData);
       // dispatch({type:FETCH_POSTS,payload:res.data} );
        history.push('/dashboard');

    }
}

export function sendComment(values,postId,history) {
    return async (dispatch) => {
        const res=await axios.post('/api/post/comment',{postId :postId,comment:values});
       // history.push('/dashboard');
        dispatch({type:FETCH_POST,payload:res.data} );
    }
}

export function deletePost(postId,history) {
    return async (dispatch) => {
        const res=await axios.post('/api/post/delete',{postId :postId});
       await dispatch({type:FETCH_USER,payload:res.data} );
        history.push('/dashboard');

    }
}

export function fetchPosts(skip) {

    return async (dispatch)=>{
        try {
            const res = await axios.get('/api/posts/'+skip);
            dispatch({type: FETCH_POSTS, payload: res.data});
        }catch (e) {
            console.log(e)
        }
    }
}


export function fetchFeed() {

    return async (dispatch)=>{
        try {


            const res = await axios.get('/api/feed');
            dispatch({type: FETCH_FEED, payload: res.data});
        }catch (e) {
            console.log(e)
        }
    }
}

export function findUser(name,history) {

    return async (dispatch)=> {

        try {
            const res = await axios.get('/api/users/' + name);
            history.push('/users/' + name);
            dispatch({type: FETCH_POSTS, payload: res.data});
        }catch (e) {
            dispatch({type: CATCH_ERROR, payload: {type:"user_not_found",error:"this user doesn't exist"}});

        }

        }

}

export function signUp(values,history) {

    return async (dispatch) => {


        let res;
        try {
            res = await axios.post('/api/sign_up', values);
        }catch (e) {

            return
        }
        if (!res.data) {
            dispatch({type: SHOW_MESSAGE, payload: {type:"verify_email"}});

            history.push('/showMessage');
        }
        else
            dispatch({type: CATCH_ERROR, payload: res.data});


    }
}

export function logIn(values,history) {


    return async (dispatch)=> {
        let res;
        try {
             res = await axios.post('/login/common', values);
            if (res.data) {
                history.push('/dashboard');
                dispatch({type: FETCH_USER, payload: res.data});
            }

        }catch (e) {
            dispatch({type: CATCH_ERROR, payload: {type:'log_in_error',error:"incorrect username or password"}});

            return
        }



    }
}

export function resendToken(value,history) {

    return async (dispatch) => {


        let res;
        try {
            res = await axios.post('/api/resendToken', {email:value});
        }catch (e) {

            return
        }
        if (!res.data) {
            dispatch({type: SHOW_MESSAGE, payload: {type:'verify_email'}});

            history.push('/showMessage');
        }
        else
            dispatch({type: CATCH_ERROR, payload: res.data});


    }
}

export function likePost(postId) {

    try{
    return async (dispatch)=>{
        const res=await axios.post('/api/like',{postId :postId});
        dispatch({type:UPDATE_LIKES,payload:res.data});
    }
    }catch (e) {
        console.log(e)
    }
}

export function getMoreComments(postId,num) {

    return async (dispatch)=>{
        const res=await axios.post('/api/comment',{postId :postId,num:num});
        dispatch({type:FETCH_POSTS,payload:res.data});
    }
}

export function sendFriendRequest(username) {

    try {


    return async (dispatch)=>{
        const res=await axios.post('/api/add_friend',{username:username});
        dispatch({type:FETCH_USER,payload:res.data});
    }
    }catch (e) {
        console.log(e)
    }
}

export function acceptFriendRequest(userId) {


    return async (dispatch) => {
        try {
            const res = await axios.post('/api/accept', {userId: userId});
            dispatch({type: FETCH_USER, payload: res.data});
        } catch (e) {
            console.log(e)
        }
    }
}

export function fetchMessageList() {
    return async (dispatch) => {
        try {
            //const res=await axios.get('/api/message/'+name);
            const res = await axios.get('/api/messages');
            dispatch({type: FETCH_USER, payload: res.data});
        } catch (e) {
            console.log(e)
        }

    }
}

export function fetchChats(myId,name) {
    return async (dispatch)=>{
        //const res=await axios.get('/api/message/'+name);
        socket.emit('initial_data', {myId: myId, name: name});
        socket.on('initial_data',(chat)=>{
            dispatch({type:FETCH_CHATS,payload:chat});

        })
    }

}

export function sendMessage(myId,name,message) {

    return async (dispatch)=>{

        socket.emit('send_message', {myId: myId, name: name,message:message});
        socket.on('updated_chat',(chat)=>{

            dispatch({type:UPDATE_CHATS,payload:chat});

            socket.off('updated_chat')

        })
        //const res=await axios.post('/api/message/'+name,{message:message});
    }

}

export function uploadImage(file){
    console.log(file)
    return async (dispatch)=> {
        try {
            const res = await axios.post('/api/upload', file);
            dispatch({type: FETCH_USER, payload: res.data});
        }catch (e) {
                console.log(e)
            }
    }
}
