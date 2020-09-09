import {CATCH_ERROR} from "../actions/types";
import { SubmissionError } from 'redux-form';

export default function errorReducer(state=null,action) {

    switch (action.type) {


        case CATCH_ERROR :

            if(action.payload) {

                if (action.payload.type === "sign_up_username_error") {
                    console.log(action.payload.type)
                    throw new SubmissionError({
                        username: action.payload.error
                    });

                } else if (action.payload.type === "sign_up_email_error") {

                    throw new SubmissionError({
                        email: action.payload.error
                    });
                } else if (action.payload.type === "log_in_error") {

                    throw new SubmissionError({
                        username: action.payload.error
                    });
                } else {
                    return null
                }
            }else{
                return null
            }






        default:    return state;

    }
}