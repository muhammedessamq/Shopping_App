import React, { useState } from "react";

export const AdminLogin = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/demo-1.0-SNAPSHOT/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            

            })
        })
        
        .then(response => response.text())
  .then(data => {
    if (data === 'Login Successfully') {
        alert ('Login Successfully ')
        props.onFormSwitch('adminPage')
      // login successful
      // redirect to the user dashboard or do something else
    } else {
        alert ('login failed ')
      // login failed
      // display an error message or do something else
    }
  })
        
        .catch(error => console.error(error));
    }

    return (
        <div className="Admin auth-form-container">
            <h2>Admin Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">User Name</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="User Name" id="username" name="username" required />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
                <button type="submit" >Log In</button>
                <button type="submit" onClick={() => props.onFormSwitch('adminPage')}>Home</button>
            </form>

        </div>
    )
}