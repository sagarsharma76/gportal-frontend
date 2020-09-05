import { authHeader } from '../helpers/auth-header';
import * as http from '../helpers/http-call';

export function login(username, password) {
    let apiEndpoint = '/employees'
    let headers = {
        'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return http.getMethod(apiEndpoint, headers
    ).then(response => {
        console.log(response);
        if (response.success == true) {
            return response
        } else {
            const error = (response && response.errors && response.errors.errorMessage) || 'Login Failed';
            return Promise.reject(error);
        }
    })
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

export function getStatusList(){
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/status/list'
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return http.getMethod(apiEndpoint, headers
    ).then(response => {
        console.log(response);
        if (response.success == true) {
            return response
        } else {
            const error = (response && response.errors && response.errors.errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}