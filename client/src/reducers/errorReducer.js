import {CATCH_ERROR} from "../actions/types";
import { SubmissionError } from 'redux-form';

export default function errorReducer(state=false,action) {

    switch (action.type) {



        case CATCH_ERROR :

            if(action.payload){
                throw new SubmissionError({
                    username : "username already exists"
                });
                return action.payload
            } else{
                return false;
            };
        default:    return state;

    }
}