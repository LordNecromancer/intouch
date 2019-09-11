import {combineReducers} from "redux";
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form";
import postReducer from "./postReducer";
import findUserReducer from "./findUserReducer";
import errorReducer from "./errorReducer";


export default combineReducers({
   auth : authReducer,
   form:formReducer,
   posts:postReducer,
   find:findUserReducer,
   error:errorReducer
});