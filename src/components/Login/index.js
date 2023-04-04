import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MoviesContext from "../../context/MoviesContext";
import {BackgroundContainer} from "./styledComponents.js"

import './index.css'
import Cookies from "js-cookie";


const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(null)
    const [showPassword,togglePassword] = useState(false)
    const navigate = useNavigate()

    
    useEffect(() => {
        let count = 0
        let timerId = setInterval(() => {
            if (count === 5){
                clearInterval(timerId)
            }
            count += 1
            fetch('https://jayauthenticationserver.onrender.com/users')
            .then(res => console.log(res))
        }, 2000)
        return () => clearInterval(timerId)       
    },[])

    const onSubmitSuccess = (jwtToken) => {
        Cookies.set('jwt_token',jwtToken,{expires:30})
        setError(null)
        navigate('/')
    }

    const onSubmitFailure = (error) => {
        setError(error)
    }

    const onLoginValidate = async (event) => {
        event.preventDefault()
        const userDetails = {
            username,
            password
        }
        const LoginApiUrl = "https://jayauthenticationserver.onrender.com/login"
        const options = {
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(LoginApiUrl,options)
        const data = await response.json()
        if (response.ok=== true){
            const jwtToken = data.jwt_token
            onSubmitSuccess(jwtToken)
        }else{
            const error = data.message
            onSubmitFailure(error)
        }
    }
    return (
        <div className="login-bg-container">
            <form className="login-form" onSubmit={onLoginValidate}>
                <h1 className="login"><span>L</span>OGIN</h1>
                <div className="input-box">
                <input type="text" id="usernameInput" className="form-input-field" value={username} 
                    onChange={e=> setUsername(e.target.value)} required="required"/>
                <span className="form-label">USERNAME</span>
                </div>
                
                <div className="input-box">
                
                <input type={showPassword?"text":"password"} id="passwordInput" className="form-input-field" value={password} 
                    onChange={e=> setPassword(e.target.value)} required="required"/>
                <span className="form-label">PASSWORD</span>
                
                
                </div>
                <div className="show-password-container">
                    <input id="password-toggle" type="checkbox" className="password-show-checkbox"
                        onChange={() => togglePassword(!showPassword)}/>
                    <label htmlFor="password-toggle" className="show-password-text">SHOW PASSWORD</label>
                </div>
                
                <button type="submit" className="login-btn">LET'S GO</button>
                
                {error && <p className="error-message-login">*{error}</p>}
                <p className="signup-text-login">Didn't have an account? <Link to="/register" className="signuop-link-login">Signup Now</Link></p>
            
            </form>
   
        </div>
    )
}

export default Login