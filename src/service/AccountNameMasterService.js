import { authHeader } from '../helpers/auth-header';
import * as http from '../helpers/http-call';

export function getAll() {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/anm/all'
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
            const error = (response && response.errors && response.errors[0].errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function save(accountNameMaster) {
    let apiEndpoint = '/anm/user'
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return http.postMethod(apiEndpoint, accountNameMaster, headers
    ).then(response => {
        console.log(response);
        if (response.success === true) {
            return response
        } else {
            const error = (response && response.errors && response.errors[0].errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function update(accountNameMaster) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/anm/' + accountNameMaster.id;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    const body = {...accountNameMaster}
    delete body.id;
    return http.putMethod(apiEndpoint, body, headers
    ).then(response => {
        console.log(response);
        if (response.success === true) {
            return response
        } else {
            const error = (response && response.errors && response.errors[0].errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function deleteAccountNameMaster(accountNameMasterId) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/anm/' + accountNameMasterId;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        // 'content-type': 'application/json'
    }
    return http.deleteMethod(apiEndpoint
    ).then(response => {
        console.log(response);
        if (response.success === true) {
            return response
        } else {
            const error = (response && response.errors && response.errors[0].errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    })
    .catch(error => {
        return Promise.reject(error);
    })
}