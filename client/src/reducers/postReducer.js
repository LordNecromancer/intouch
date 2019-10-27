import {FETCH_POSTS,FETCH_POST} from "../actions/types";
import _ from 'lodash';

export default function postReducer(state={},actions){

    switch (actions.type) {


        case FETCH_POST :


            return {...state,[actions.payload._id]:actions.payload};

        case FETCH_POSTS:
                return {..._.mapKeys(actions.payload,'_id')};


        default :
            return state;
    }
}