import React, { useState } from "react";
import axios from 'axios';

export const New_Selling_Companies = (props) => {
  const [companyname, setCompanyname] = useState('');
  const [sellingCompanyId, setsellingCompanyId] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sellingCompany = {
      companyName: companyname,
    };

    try {
      const response = await axios.post('http://localhost:8080/demo-1.0-SNAPSHOT/api/admin/createSellingCompanyAccount', sellingCompany);
      alert(response.data);
      console.log(sellingCompanyId);
    } catch (error) {
      console.error(error);
      
    }
  }

  return (
    <div className="auth-form-container">
      <h2>New Selling Company</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="companyname">Enter Selling Company Name</label>
        <input
          value={companyname}
          onChange={(e) => setCompanyname(e.target.value)}
          type="text"
          placeholder="Company Name"
          id="companyname"
          name="companyname"
          required
        />
        <button className="link-btncompany">Add</button>
        <button className="link-btncompany"onClick={() => props.onFormSwitch('adminPage')}>Back</button>
      </form>
    </div>
  );
}
