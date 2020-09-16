import * as http from '../helpers/http-call';

export function getAll() {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/hgm/users'
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
        }else if (response.status === 401) {
            const error = 401;
            return Promise.reject(error);
        } else {
            const error = (response && response.errors && response.errors[0].errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function save(holderGroupMaster) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/hgm/user'
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return http.postMethod(apiEndpoint, holderGroupMaster, headers
    ).then(response => {
        console.log(response);
        if (response.success === true) {
            return response
        }else if (response.status === 401) {
            const error = 401;
            return Promise.reject(error);
        } else {
            const error = (response && response.errors && response.errors[0].errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function update(holderGroupMaster) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/hgm/users/' + holderGroupMaster.id;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    const body = {...holderGroupMaster}
    delete body.id;
    return http.putMethod(apiEndpoint, body, headers
    ).then(response => {
        console.log(response);
        if (response.success === true) {
            return response
        }else if (response.status === 401) {
            const error = 401;
            return Promise.reject(error);
        } else {
            const error = (response && response.errors && response.errors[0].errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    }).catch(error => {
        return Promise.reject(error);
    })
}

export function deleteHolderGroupMaster(holderGroupMasterId) {
    // let apiEndpoint = '/employees'
    let apiEndpoint = '/hgm/users/' + holderGroupMasterId;
    let headers = {
        // 'Access-Control-Allow-Origin': '*',
        // 'access-control-allow-credentials': true,
        // 'content-type': 'application/json'
    }
    return http.deleteMethod(apiEndpoint,headers
    ).then(response => {
        console.log(response);
        if (response.success === true) {
            return response
        }else if (response.status === 401) {
            const error = 401;
            return Promise.reject(error);
        } else {
            const error = (response && response.errors && response.errors[0].errorMessage) || 'API Call Failed';
            return Promise.reject(error);
        }
    })
    .catch(error => {
        return Promise.reject(error);
    })
}