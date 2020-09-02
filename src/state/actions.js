import * as ActionTypes from "./action-types";
import * as loginService from "../service/LoginService";
import { history } from '../helpers/history';

function request(user) { return { type: ActionTypes.LOGIN_REQUEST, user } }
function success(user) { return { type: ActionTypes.LOGIN_SUCCESS, user } }
function failure(error) { return { type: ActionTypes.LOGIN_FAILURE, error } }

export function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        loginService.login(username, password)
            .then(
                response => {
                    console.log(response.success)
                    if (response.success) {
                        dispatch(success(response));
                        history.push('/');
                    }
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

export function getAll() {
    return dispatch => {
        dispatch(request());

        loginService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    // function request() { return { type: ActionTypes.GETALL_REQUEST } }
    // function success(users) { return { type: ActionTypes.GETALL_SUCCESS, users } }
    // function failure(error) { return { type: ActionTypes.GETALL_FAILURE, error } }
}