import {FETCH_POST, FETCH_POSTS, FIND_USER} from "../actions/types";
import _ from 'lodash';

export default function findUserReducer(state={},actions){

    switch (actions.type) {

        case FETCH_POST :


            return {...state,[actions.payload._id]:actions.payload};

        case FETCH_POSTS:
            return {..._.mapKeys(actions.payload,'_id')};
            default :
            return state;
    }
}