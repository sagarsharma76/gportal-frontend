import { authHeader } from '../helpers/auth-header';
import * as http from '../helpers/http-call';

export function getAll() {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/ahm/all'
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
    })
}

export function save(accountHolderMaster){
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/ahm/user'
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return http.postMethod(apiEndpoint,accountHolderMaster, headers
    ).then(response => {
        console.log(response);
        if (response.success == true) {
            return response
        } else {
            const error = (response && response.errors && response.errors.errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    })
}

export function update(accountHolderMaster){
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/ahm/'+accountHolderMaster.id;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }

    const body = {...accountHolderMaster}
    delete body.id;
    console.log(body)
    return http.putMethod(apiEndpoint,body, headers
    ).then(response => {
        console.log(response);
        if (response.success == true) {
            return response
        } else {
            const error = (response && response.errors && response.errors.errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    })
}

export function deleteAccountHolderMaster(accountHolderMasterId){
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/ahm/'+accountHolderMasterId;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        // 'content-type': 'application/json'
    }
    return http.deleteMethod(apiEndpoint
    ).then(response => {
        console.log(response);
        if (response.success == true) {
            return response
        } else {
            const error = (response && response.errors && response.errors.errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    })
}