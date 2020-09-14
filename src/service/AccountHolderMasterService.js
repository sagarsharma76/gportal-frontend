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

export function save(accountHolderMaster) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/ahm/user'
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return http.postMethod(apiEndpoint, accountHolderMaster, headers
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

export function update(accountHolderMaster) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/ahm/' + accountHolderMaster.id;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }

    const body = { ...accountHolderMaster }
    delete body.id;
    console.log(body)
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

export function deleteAccountHolderMaster(accountHolderMasterId) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/ahm/' + accountHolderMasterId;
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
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function getAccountHolderTransactions(accountHolderId) {
    let apiEndpoint = '/ahm/transactions/' + accountHolderId;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        // 'content-type': 'application/json'
    }
    return http.getMethod(apiEndpoint
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

export function saveAccountHolderTransaction(transaction) {
    let apiEndpoint = '/anm/transactions/' + transaction.id;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }

    let body = {
        'balance': transaction.balance
    }
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

export function clearAccountHolderTransations(accountHolderId) {
    let apiEndpoint = '/ahm/transactions/' + accountHolderId + "/clear";
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        // 'content-type': 'application/json'
    }
    return http.putMethod(apiEndpoint
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


