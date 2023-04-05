import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import MoviesContext from "../../context/MoviesContext";
// import {BackgroundContainer} from "./styledComponents.js"

import './index.css'
import Cookies from "js-cookie";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState(null)
    const [showPassword,togglePassword] = useState(false)
    const navigate = useNavigate()
    

    const onSubmitSuccess = (message) => {
        setTimeout(() => {
            navigate('/login')

        },2000)
        
        setError(message)
    }
    const onSubmitFailure = (error) => {
        setError(error)
    }
    const onLoginValidate = async (event) => {
        event.preventDefault()
        if (!email.includes("@") && !email.includes(".")){
            onSubmitFailure("Invalid Email")
        }else{
            setError("")
            const userDetails = {
                username,
                password,
                email
            }
            const RegisterApiUrl = "https://jayauthenticationserver.onrender.com/register"
            const options = {
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(userDetails)
            }
            const response = await fetch(RegisterApiUrl,options)
            const data = await response.json()
            if (response.ok=== true){
                const sucessMsg = data.message
                onSubmitSuccess(sucessMsg)
            }else{
                const error = data.message
                onSubmitFailure(error)
            }

        }
        
    }
    return (
        <div className="login-bg-container">
            <form className="login-form" onSubmit={onLoginValidate}>
                <h1 className="register"><span className="flipR" >S</span>IGN UP</h1>
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
                <div className="input-box">
                <input type="text" id="emailInput" className="form-input-field" value={email}
                    onChange={e=> setEmail(e.target.value)} required="required"/>
                <span className="form-label">EMAIL</span>
                </div>
                <div className="show-password-container">
                    <input id="password-toggle" type="checkbox" className="password-show-checkbox"
                        onChange={() => togglePassword(!showPassword)}/>
                    <label htmlFor="password-toggle" className="show-password-text">SHOW PASSWORD</label>
                </div>
                
                <button type="submit" className="login-btn">SIGN UP</button>
                
                {error && <p className="error-message-login">*{error}</p>}
                <p className="signup-text-login">Already have an account? <Link to="/login" className="signuop-link-login">Login here</Link></p>
            </form>
   
        </div>
    )
}

export default Register