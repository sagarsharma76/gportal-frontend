import * as ActionTypes from "./action-types";


export function loginSuccess(token) { return { type: ActionTypes.LOGIN_SUCCESS, token } }

export function logout() { return { type: ActionTypes.LOGOUT } }

export function getHolderGroupMasterListSuccess(list) { 
    return { type: ActionTypes.GET_HOLDER_GROUP_MASTER_LIST_SUCCESS, list } 
}
export function getHolderGroupMasterListFailure(error) { 
    return { type: ActionTypes.GET_HOLDER_GROUP_MASTER_LIST_FAILURE, error } 
}

export function getAccountHolderMasterListSuccess(list){
    return { type: ActionTypes.GET_ACCOUNT_HOLDER_MASTER_LIST_SUCCESS, list }
}
export function getAccountHolderMasterListFailure(error) { 
    return { type: ActionTypes.GET_ACCOUNT_HOLDER_MASTER_LIST_FAILURE, error } 
}
export function getStatusListSuccess(list){
    return { type: ActionTypes.GET_STATUS_LIST_SUCCESS, list }
}

export function getCompanyMasterListSuccess(list){
    return { type: ActionTypes.GET_COMPANY_MASTER_LIST_SUCCESS, list }
}
export function getCompanyMasterListFailure(error) { 
    return { type: ActionTypes.GET_COMPANY_MASTER_LIST_FAILURE, error } 
}

export function getAccountNameMasterListSuccess(list){
    return { type: ActionTypes.GET_ACCOUNT_NAME_MASTER_LIST_SUCCESS, list }
}
export function getAccountNameMasterListFailure(error) { 
    return { type: ActionTypes.GET_ACCOUNT_NAME_MASTER_LIST_FAILURE, error } 
}