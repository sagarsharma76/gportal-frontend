import * as http from '../helpers/http-call';

export function login(userName, password) {
    let apiEndpoint = '/login'
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    let body = {
        'userName': userName,
        'password': password
    }
    return http.postMethod(apiEndpoint, body, headers
    ).then(response => {
        console.log(response);
        if (response.success === true) {
            return response
        } else if (response.status === 401) {
            const error = 'Username or Password is incorrect';
            return Promise.reject(error);
        } else {
            const error = (response && response.errors && response.errors[0].errorMessage) || 'Unexpected error occured.';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function logout() {
    debugger;
    let apiEndpoint = '/logout'
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return http.postMethod(apiEndpoint, {},headers
    ).then(response => {
        if (response.success === true) {
            return response
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function getStatusList() {
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
        if (response.success === true) {
            return response
        } else {
            const error = (response && response.errors && response.errors.errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}