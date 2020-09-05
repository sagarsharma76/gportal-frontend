import * as actionTypes from './action-types';

const initialState = {
    holderGroupMasterList: []
}

export default function holderGroupMasterReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOLDER_GROUP_MASTER_LIST_SUCCESS:
            return {
                holderGroupMasterList: action.list
            };
        default:
            return state
    }
}