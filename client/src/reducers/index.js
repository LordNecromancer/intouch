import {combineReducers} from "redux";
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form";
import postReducer from "./postReducer";
import findUserReducer from "./findUserReducer";
import errorReducer from "./errorReducer";
import chatReducer from "./chatReducer";
import feedReducer from "./feedReducer";
import showMessageReducer from "./showMessageReducer";


export default combineReducers({
   auth : authReducer,
   form:formReducer,
   posts:postReducer,
   find:findUserReducer,
   error:errorReducer,
   chats:chatReducer,
   feed:feedReducer,
   showMessage:showMessageReducer
});