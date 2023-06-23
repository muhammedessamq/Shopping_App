import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Shipping_Companies_List = (props) => {
  const [shippingCompanies, setShippingCompanies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/demo-1.0-SNAPSHOT/api/admin/getShippingCompany');
        setShippingCompanies(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Shipping Companies List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Password</th>
            <th>Area</th>
          </tr>
        </thead>
        <tbody>
          {shippingCompanies.map(company => (
            <tr key={company.shipping_company_id}>
              <td>{company.shipping_company_id}</td>
              <td>{company.companyName}</td>
              <td>{company.password}</td>
              <td>{company.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('adminPage')}>
        Back
      </button>
    </div>
  );
}
