import { authHeader } from '../helpers/auth-header';
import * as http from '../helpers/http-call';

let IP = "localhost"
let port = ":3500"

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
        if(response.success==true){
            const token = (response && response.data && response.data.token) || "";
            localStorage.setItem('token', token);
            return response
        }else{
            const error = (response && response.errors && response.errors.errorMessage) || 'Login Failed';
            return Promise.reject(error);
        }
        
    })

}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

export function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}