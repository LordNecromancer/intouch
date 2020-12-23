import {SHOW_MESSAGE} from "../actions/types";
import React from 'react';
import {Link} from "react-router-dom";
import SendEmail from "../components/SendEmail";

export default function showMessageReducer(state=null,action) {

    switch (action.type) {


        case SHOW_MESSAGE :

            if (action.payload) {


                if(action.payload.type==='verify_email'){
                    return ({message:'a verification token was sent to your email',
                    element:'send_email'
                    })
                }


            }




        default:
            return state;


    }
}