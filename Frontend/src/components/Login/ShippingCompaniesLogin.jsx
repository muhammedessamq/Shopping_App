import React, { useState } from "react";
import axios from 'axios';

export const ShippingCompaniesLogin = (props) => {
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
 
 const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:8080/demo-1.0-SNAPSHOT/api/shippingcompany/login', {
    companyName: companyName,
    password: password,
  })
  .then(response => {
    if (JSON.stringify(response.data).includes('Login Successfully')) {
      alert('Login Successfully');
      const shipping_company_id = response.data.shipping_company_id;
      localStorage.setItem('shipping_company_id', shipping_company_id);
      props.onFormSwitch('shippingCompaniesPage');
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
      <h2>Shipping Company Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="companyName">Company Name</label>
        <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} type="companyName" placeholder="Company Name" id="companyName" name="companyName" required />
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
        <button type="submit">Log In</button>
        <button type="submit" onClick={() => props.onFormSwitch('Home')}>Home</button>
      </form>
    </div>
  );
}
