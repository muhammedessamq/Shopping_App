import React, { useState } from "react";
import axios from 'axios';

export const New_Shipping_Companies = (props) => {
  const [companyname, setCompanyname] = useState('');
  const [area,setArea]= useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const shippingCompany = {
      companyName: companyname,
      area:area
    };

    try {
      const response = await axios.post('http://localhost:8080/demo-1.0-SNAPSHOT/api/admin/createShippingCompanyAccount', shippingCompany);
      alert("Shipping Company Account Created");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="auth-form-container">
      <h2>New Shipping Company</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="companyname">Enter Shipping Company Name</label>
        <input
          value={companyname}
          onChange={(e) => setCompanyname(e.target.value)}
          type="text"
          placeholder="Company Name"
          id="companyname"
          name="companyname"
          required
        />
        <label htmlFor="area">Enter Area</label>
        <input
             value={area}
                onChange={(e) => setArea(e.target.value)}
                type="text"
                placeholder="Area"
                id="area"
                name="area"
                required
/>

        <button className="link-btncompany">Add</button>
        <button className="link-btncompany"onClick={() => props.onFormSwitch('adminPage')}>Back</button>
      </form>
    </div>
  );
}
