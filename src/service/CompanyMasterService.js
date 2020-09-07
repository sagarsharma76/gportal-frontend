import { authHeader } from '../helpers/auth-header';
import * as http from '../helpers/http-call';

export function getAll() {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/company/master'
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

export function save(companyMaster) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/company/master'
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return http.postMethod(apiEndpoint, companyMaster, headers
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

export function update(companyMaster) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/company/master/' + companyMaster.id;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    const body = {...companyMaster}
    delete body.id;
    return http.putMethod(apiEndpoint, body, headers
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

export function deleteCompanyMaster(companyMasterId) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/company/master/' + companyMasterId;
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
    .catch(error => {
        return Promise.reject(error);
    })
}