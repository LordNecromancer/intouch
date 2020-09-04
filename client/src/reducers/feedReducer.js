import {FETCH_FEED, FETCH_POST, FETCH_POSTS, UPDATE_LIKES} from "../actions/types";
import _ from 'lodash';

export default function feedReducer(state={},actions){

    switch (actions.type) {



        case UPDATE_LIKES:
            return {...state,[actions.payload._id]:{...state[actions.payload._id],likes:actions.payload.likes}};

        case FETCH_POST :


            return {...state,[actions.payload._id]:actions.payload};


        case FETCH_FEED:
                return {..._.mapKeys(actions.payload,'_id')};


        default :
            return state;
    }
}