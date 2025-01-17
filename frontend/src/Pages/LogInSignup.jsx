import React, { useState } from 'react';
import './CSS/LogInSignup.css'

// LogInSignup component to handle login and signup functionality
const LogInSignup = () => {
    const [state, setState] = useState("Login"); // State to track whether the user is logging in or signing up
    const [formData, setFormData] = useState({ // State to hold form data for username, email, and password
        username: "",
        password: "",
        email: "",
    });
    const [errors, setErrors] = useState({}); // State to track validation errors
    // Handles changes in the form fields and updates the formData state
    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    // Validates the form input fields based on the current state (Login/Sign Up)
    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (state === "Sign Up" && !formData.username.trim()) {
            errors.username = "Username is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
            isValid = false;
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    }
    // Function to handle login logic
    const login = async () => {
        if (validateForm()) {
            console.log("Login Function Executed", formData);
            let responseData;
            await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json()).then((data) => responseData = data);

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/"); // Redirect to the home page
            } else {
                alert(responseData.errors) // Show errors if login fails
            }
        }
    }
    // Function to handle signup logic
    const signup = async () => {
        if (validateForm()) {
            console.log("Signup Function Executed", formData);
            let responseData;
            await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json()).then((data) => responseData = data);

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token); // Store token in localStorage
                window.location.replace("/"); // Redirect to the home page
            } else {
                alert(responseData.errors) // Show errors if signup fails
            }
        }
    }

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && (
                        <>
                            <input 
                                name='username' 
                                value={formData.username} 
                                onChange={changeHandler} 
                                type="text" 
                                placeholder='Your Name'
                            />
                            {errors.username && <p className="error">{errors.username}</p>}
                        </>
                    )}
                    <input 
                        name='email' 
                        value={formData.email} 
                        onChange={changeHandler} 
                        type="email" 
                        placeholder='Email'
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <input 
                        name='password' 
                        value={formData.password} 
                        onChange={changeHandler} 
                        type="password" 
                        placeholder='Password'
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button> {/* Button to trigger either login or signup */}
                {state === "Sign Up"  // Links to switch between Login and Sign Up
                    ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Log In Here</span></p>
                    : <p className="loginsignup-login">Create an account <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>
                }
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id="agree" />
                    <label htmlFor="agree">By continuing, I agree to the terms of use and privacy policy</label>
                </div>
            </div>
        </div>
    )
};

export default LogInSignup;
