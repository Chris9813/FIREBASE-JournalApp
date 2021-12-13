import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import validator from "validator"
import { useDispatch, useSelector } from 'react-redux'
import { remError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const {msgError} = useSelector(state => state.ui)


    const[values, handleInputChange] = useForm({
        name: "Chris",
        email: "chris9813@gmail.com",
        password: "123456",
        password2: "123456",
    })
    
    const {name, email, password, password2} = values

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {
            if(name.trim().length === 0){
                dispatch(setError("Name is Required"))
                return false
            } else if (!validator.isEmail(email)) {
                dispatch(setError("Email Incorrect"))
                return false
            } else if (password !== password2 || password.length < 5) {
                dispatch(setError("password Incorrect"))
                return false
            }
        dispatch(remError(""))
        return true
    }


    return (
        <div className="auth_main">
            <div className="auth_box-container">
            <div className= "animate__animated animate__fadeIn animate__faster">
            <h3 className ="auth_title">Register</h3>
            <form onSubmit = {handleRegister}>

            {
            msgError && 
            (<div className="auth_alert-error">
            {msgError}
            </div>)
            }

            <input
                className="aut_input"
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                onChange={handleInputChange}
                value={email}
                />

                <input
                className="aut_input"
                type="text"
                placeholder="Name"
                name="name"
                autoComplete="off"
                onChange={handleInputChange}
                value={name}
                />

                <input
                className="aut_input"
                type="password"
                placeholder="password"
                name="password"
                onChange={handleInputChange}
                value={password}
                />

                <input
                className="aut_input"
                type="password"
                placeholder="password2"
                name="password2"
                onChange={handleInputChange}
                value={password2}
                />

                <button
                type="submit"
                className = "btn btn-primary btn-block"
                onClick={handleRegister}
                >
                    Register
                </button>
        <Link 
        className="link"
        to = "/auth/login">
            Already register
        </Link>
        </form>
    </div>
            </div>
            
        </div>
    )
}
