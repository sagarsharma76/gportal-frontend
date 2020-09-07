import * as actionTypes from './action-types';

const initialState = {
    accountNameMasterList: []
}

export default function accountNameMasterReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ACCOUNT_NAME_MASTER_LIST_SUCCESS:
            return {
                accountNameMasterList: action.list
            };
        default:
            return state
    }
}