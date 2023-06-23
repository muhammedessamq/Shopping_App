import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Customer_Accounts = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/demo-1.0-SNAPSHOT/api/admin/getCustomer')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while fetching customers');
      });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Customers Accounts List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.customer_id}</td>
              <td>{customer.username}</td>
              <td>{customer.password}</td>
              <td>{customer.address}</td>
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
