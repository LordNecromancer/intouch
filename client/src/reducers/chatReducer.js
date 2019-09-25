import {FETCH_CHATS} from "../actions/types";

export default function findUserReducer(state=[],actions){

    switch (actions.type) {

        case FETCH_CHATS :
            return actions.payload;
        default :
            return state;
    }
}