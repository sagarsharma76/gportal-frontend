import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MS from './store';

let token=''

function getToken(){
    token = MS.store.getState().authenticationReducer.token;
    console.log(token)
}

const unsubscribe = MS.store.subscribe(getToken)
unsubscribe()

export default ({ component: Component, ...rest }) => {
    getToken()
    return (
    <Route {...rest} render={props => (
        token!==undefined && token!=='' && token!==null
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
    )} />
)}