import "whatwg-fetch";

let IP="localhost"
let port=":3500"

export function getMethod(apiEndpoint,headers){
    return fetch("http://"+IP+port+apiEndpoint,{
        method: 'GET',
        headers:headers,
    })
    .then( response =>{
        return response.json();
    })
}

export function putMethod(apiEndpoint,body,headers){
    return fetch("http://"+IP+port+apiEndpoint, {
        method: 'PUT',
        credentials: 'include',
        headers:headers,
        body: JSON.stringify(body)
    })
    .then( reponse =>{
        return reponse.json();
    })
}

export function postMethod(apiEndpoint,body,headers){
    return fetch("http://"+IP+port+apiEndpoint, {
        method: 'POST',
        headers:headers,
        credentials: 'include',
        body: JSON.stringify(body)
    })
    .then( response =>{
        return response.json();
    })
    .catch((error) => {
        console.log(error);
      });
}

