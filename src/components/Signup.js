import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [fathername, setFathername] = useState('')
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                email,
                mobile,
                password,
            });

            setMessage(response.data.message);
            // Clear form fields after successful signup
            setEmail('');
            setFathername('');
            setMobile('');
            setPassword('');
        } catch (error) {
            setMessage('An error occurred during signup');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Father Name:</label>
                    <input type="text" value={fathername} onChange={(e) => setFathername(e.target.value)} required />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign Up</button>
                <p>{message}</p>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}

export default Signup;
