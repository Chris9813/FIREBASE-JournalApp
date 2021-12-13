import React from 'react'


import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPaswword } from '../../actions/auth'
import { useForm } from '../hooks/useForm'


export const LoginScreen = () => {

    const {loading} = useSelector(state => state.ui)
    
    const dispatch = useDispatch();
    
    
    const [formValues, handleInputChange ] = useForm({
        email: "chris9813@gmail.com",
        password: "123456"
    });

    const {email, password} = formValues

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch( startLoginEmailPaswword(email, password ));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }


    return (
        <div className="auth_main">
            <div className="auth_box-container">
            <h3 className ="auth_title">Login</h3>
            <form onSubmit={handleLogin}
            className= "animate__animated animate__fadeIn animate__faster"
            >
                <input
                className="aut_input"
                type="text"
                placeholder="email"
                name="email"
                autoComplete="off"
                value = {email}
                onChange={handleInputChange}
                />

                <input
                className="aut_input"
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                />

                <button
                type="submit"
                className = "btn btn-primary btn-block"
                disabled={loading}
                >
                    Login
                </button>


        <div className="auth_social-networks">
            <p>Login with social networks</p>
            
            
            <div 
                className="google-btn"
                onClick= {handleGoogleLogin}
            >
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>
            </div>


        </div>
        <Link 
        className="link"
        to = "/auth/register">
            create new account
        </Link>
        </form>
            </div>
            
    </div>
    )
}
