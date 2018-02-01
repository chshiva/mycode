import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('userAuthToken')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (<Component {...props} />)} />
// )