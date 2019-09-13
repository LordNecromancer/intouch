import {FETCH_POSTS, FIND_USER} from "../actions/types";

export default function findUserReducer(state=[],actions){

    switch (actions.type) {

        case FETCH_POSTS :
            return actions.payload;
            default :
            return state;
    }
}