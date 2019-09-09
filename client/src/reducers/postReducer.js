import {FETCH_POSTS} from "../actions/types";

export default function postReducer(state=[],actions){

    switch (actions.type) {

        case FETCH_POSTS :
            return actions.payload;
        default :
            return state;
    }
}