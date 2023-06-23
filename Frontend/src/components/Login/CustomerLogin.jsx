import React, { useState } from "react";
import axios from 'axios';

export const CustomerLogin = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/demo-1.0-SNAPSHOT/api/customer/login', {
          username: username,
          password: password,
        })
        .then(response => {
          if (JSON.stringify(response.data).includes('Login Successfully')) {
            alert('Login Successfully');
            const customer_id = response.data.customer_id;
            localStorage.setItem('customer_id', customer_id);
            props.onFormSwitch('productsList');
          } else {
            alert('Login Failed');
          }
        })
        .catch(error => {
          console.error(error);
          alert('An error occurred while logging in');
        });
      }

    return (
        <div className="Admin auth-form-container">
            <h2>Customer Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">User Name</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="User Name" id="username" name="username" required/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
                <button type="submit" >Log In</button>
            </form>
            <button type="submit" onClick={() => props.onFormSwitch('Home')}>Home</button>
            <button className="link-btn" onClick={() => props.onFormSwitch('customerRegister')}>Don't have an account? Register here.</button>
            
        </div>
    )
}