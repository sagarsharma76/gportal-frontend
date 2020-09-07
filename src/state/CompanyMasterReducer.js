import * as actionTypes from './action-types';

const initialState = {
    companyMasterList: []
}

export default function companyMasterReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_COMPANY_MASTER_LIST_SUCCESS:
            return {
                companyMasterList: action.list
            };
        default:
            return state
    }
}