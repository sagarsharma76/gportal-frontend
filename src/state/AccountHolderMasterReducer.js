import * as actionTypes from './action-types';

const initialState = {
    accountHolderMasterList: [],
    statusList: []
}

export default function AccountHolderMasterReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ACCOUNT_HOLDER_MASTER_LIST_SUCCESS:
            return Object.assign({}, state, { accountHolderMasterList: action.list });
        case actionTypes.GET_STATUS_LIST_SUCCESS:
            return Object.assign({}, state, { statusList: action.list });
        default:
            return state
    }
}