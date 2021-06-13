import React, { Children } from 'react';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({children, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
               return localStorage.getItem("userToken") ? (
                children

                ) : (
                    <Redirect to="/" />
                )}}
        />
    )
}

export default PrivateRoute
