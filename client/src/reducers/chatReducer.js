import {FETCH_CHATS,UPDATE_CHATS} from "../actions/types";

export default function chatReducer(state={},actions){

    switch (actions.type) {

        case FETCH_CHATS :
            return actions.payload;

        case UPDATE_CHATS: {
            console.log(actions.type)
            let t = [...state.messages];
            t.push(actions.payload.messages)
            return {...state, messages: t};
        }
        default :
            return state;
    }
}