import "whatwg-fetch";
import MS from '../store';

let IP = "18.191.204.2"
let port = ":8080"



// let IP="localhost"
// let port=":3500"

let token = ''

function getToken(){
    token = "Bearer "+MS.store.getState().authenticationReducer.token;
    console.log(token)
}

const unsubscribe = MS.store.subscribe(getToken)
unsubscribe()

export function getMethod(apiEndpoint, headers) {
    getToken()
    headers.Authorization = token;
    return fetch("http://" + IP + port + apiEndpoint, {
        method: 'GET',
        headers: headers,
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export function putMethod(apiEndpoint, body, headers) {
    getToken()
    headers.Authorization = token;
    return fetch("http://" + IP + port + apiEndpoint, {
        method: 'PUT',
        headers: headers,
        // credentials: 'include',
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export function postMethod(apiEndpoint, body, headers) {
    getToken()
    if (apiEndpoint !== '/login') {
        headers.Authorization = token;
    }
    return fetch("http://" + IP + port + apiEndpoint, {
        method: 'POST',
        headers: headers,
        // credentials: 'include',
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export function deleteMethod(apiEndpoint, headers) {
    getToken()
    headers.Authorization = token;
    return fetch("http://" + IP + port + apiEndpoint, {
        method: 'DELETE',
        headers: headers,
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

