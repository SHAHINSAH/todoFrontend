import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [emailMobile, setEmailMobile] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                emailMobile,
                password,
            });

            setMessage('');
            // Redirect to dashboard on successful login
            history.push('/dashboard');
        } catch (error) {
            setMessage('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email/Mobile:</label>
                    <input
                        type="text"
                        value={emailMobile}
                        onChange={(e) => setEmailMobile(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <p>{message}</p>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
    );
}

export default Login;
