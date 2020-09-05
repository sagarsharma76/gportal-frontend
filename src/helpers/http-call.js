import "whatwg-fetch";

let IP="18.191.204.2"
let port=":8080"

// let IP="localhost"
// let port=":3500"

export function getMethod(apiEndpoint,headers){
    return fetch("http://"+IP+port+apiEndpoint,{
        method: 'GET',
        headers:headers,
    })
    .then( response =>{
        return response.json();
    })
    .catch(error=>{
        return Promise.reject(error);
    })
}

export function putMethod(apiEndpoint,body,headers){
    return fetch("http://"+IP+port+apiEndpoint, {
        method: 'PUT',
        headers:headers,
        // credentials: 'include',
        body: JSON.stringify(body)
    })
    .then( response =>{
        return response.json();
    })
    .catch(error => {
        return Promise.reject(error);
    })
}

export function postMethod(apiEndpoint,body,headers){
    return fetch("http://"+IP+port+apiEndpoint, {
        method: 'POST',
        headers:headers,
        // credentials: 'include',
        body: JSON.stringify(body)
    })
    .then( response =>{
        return response.json();
    })
    .catch(error=>{
        return Promise.reject(error);
    })
}

export function deleteMethod(apiEndpoint,headers){
    return fetch("http://"+IP+port+apiEndpoint,{
        method: 'DELETE',
        headers:headers,
    })
    .then( response =>{
        return response.json();
    })
    .catch(error => {
        return Promise.reject(error);
    })
}

