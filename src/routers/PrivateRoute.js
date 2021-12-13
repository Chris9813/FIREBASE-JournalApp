import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {
    console.log(rest.location.pathname);
    localStorage.setItem("lastPath", rest.location.pathname)
    return (
        <div>
            <Route {...rest}
            component = {
                (props) => (
                    (isLoggedIn)
                    ? (<Component {...props} />)
                    :(<Redirect to="/auth" />)
                )
            }
            />
        </div>
    )
}

PrivateRoute.propTypes= {
    component: PropTypes.func.isRequired,
}
