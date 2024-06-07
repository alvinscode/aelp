import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ closeLoginBox }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                const registerResponse = await axios.post('http://localhost:5000/register', { email, password });
                console.log('Register response:', registerResponse)
                setMessage('User registered successfully');
            } else {
                const loginResponse = await axios.post('http://localhost:5000/login', { email, password });
                console.log('Login response:', loginResponse);
                if (loginResponse.data && loginResponse.data.token) {
                    const { token } = loginResponse.data;
                    localStorage.setItem('token', token);
                    setIsLoggedIn(true);
                    setMessage('User logged in successfully');
                } else {
                    setMessage('Login failed: no token received');
                }

            }
            setEmail('');
            setPassword('');
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <div className='login-modal'>
            <div className='login-container'>
                <button className='close-button' onClick={closeLoginBox}>x</button>
                <h2>{isLoggedIn? 'Logout' : (isRegister ? 'Register' : 'Login')}</h2>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
                    <p>{message}</p>
                </form>
                )}
                <button onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
                </button>
            </div>
        </div>
    )
}

export default Login;