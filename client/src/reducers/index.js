import {combineReducers} from "redux";
import authReducer from "./authReducer";
import {reducer as formReducer} from "redux-form";
import postReducer from "./postReducer";


export default combineReducers({
   auth : authReducer,
   form:formReducer,
   posts:postReducer
});