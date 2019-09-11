import {CATCH_ERROR} from "../actions/types";
import { SubmissionError } from 'redux-form';

export default function authReducer(state=false,action) {

    switch (action.type) {



        case CATCH_ERROR :

            if(action.payload){
                throw new SubmissionError({
                    username : "lool"
                });
                return action.payload
            } else{
                return false;
            };
        default:    return state;

    }
}