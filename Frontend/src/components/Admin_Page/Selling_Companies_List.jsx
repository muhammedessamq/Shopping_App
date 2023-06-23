import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Selling_Companies_List= (props)=> {
  const [sellingCompanies, setSellingCompanies] = useState([]);

  useEffect(() => {
    // Fetch selling companies list on component mount
    axios.get('http://localhost:8080/demo-1.0-SNAPSHOT/api/admin/getSellingCompany')
      .then(response => {
        setSellingCompanies(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Selling Companies List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {sellingCompanies.map(company => (
            <tr key={company.selling_company_id}>
              <td>{company.selling_company_id}</td>
              <td>{company.companyName}</td>
              <td>{company.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('adminPage')}>
        Back
      </button>
    </div>
  )
}
