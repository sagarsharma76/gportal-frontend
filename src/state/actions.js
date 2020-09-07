import * as ActionTypes from "./action-types";
import * as loginService from "../service/LoginService";
import { history } from '../helpers/history';

export function request(user) { return { type: ActionTypes.LOGIN_REQUEST, user } }
export function success(user) { return { type: ActionTypes.LOGIN_SUCCESS, user } }
export function failure(error) { return { type: ActionTypes.LOGIN_FAILURE, error } }

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


export function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        loginService.login(username, password)
            .then(
                response => {
                    dispatch(success(response));
                    const token = (response && response.data && response.data.token) || "";
                    localStorage.setItem('token', token);
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
}

export function logout() {
    loginService.logout();
    return { type: ActionTypes.LOGOUT };
}