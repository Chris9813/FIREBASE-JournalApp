import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isLoggedIn,
    component: Component,
    ...rest

}) => {
    return (
        <div>
            <Route {...rest}
            component = {
                (props) => (
                    (!isLoggedIn)
                    ? (<Component {...props} />)
                    :(<Redirect to="/" />)
                )
            }
            />
        </div>
    )
}

PublicRoute.propTypes= {
    component: PropTypes.func.isRequired,
}

