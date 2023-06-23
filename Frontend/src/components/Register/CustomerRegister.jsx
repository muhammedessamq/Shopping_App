import React, { useState } from "react";

export const CustomerRegister = (props) => {
    const [password, setPass] = useState('');
    const [username, setName] = useState('');
    const [address, setAddress] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/demo-1.0-SNAPSHOT/api/customer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                address:address

            })
        })
        
        .then(response => {
            console.log(response);
            alert("User Registered Successfully")
            return response.json();
        })
        
        .catch(error => console.error(error));
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
      
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">User Name</label>
            <input value={username} name="username" onChange={(e) => setName(e.target.value)} id="username" placeholder="User Name" required />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
            <label htmlFor="address">Adress</label>
            <input value={address} name="address" onChange={(e) => setAddress(e.target.value)} id="address" placeholder="address" required />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('customerLogin')}>Already have an account? Login here.</button>
    </div>
    )
}
