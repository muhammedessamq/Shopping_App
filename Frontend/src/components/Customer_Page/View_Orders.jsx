import React, { useState, useEffect } from "react";
import axios from 'axios';

export const View_Orders= (props)=> {
  const [availableOrders,setAvailableOrders] = useState([]);
  const customer_id = localStorage.getItem('customer_id');
  useEffect(() => {

    axios.get(`http://localhost:8080/demo-1.0-SNAPSHOT/api/customer/getOrders/${customer_id}`)
      .then(response => {
        setAvailableOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Orders List</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Name</th>
            <th>Shipping Company Name</th>
            <th>Products</th>
            <th>Price of product</th>
            <th>Status</th>
            <th>Last Notification Content</th>
    
          </tr>
        </thead>
        <tbody>
          {availableOrders.map(availableOrders => (
            <tr key={availableOrders.customer_id}>
              <td>{availableOrders.id}</td>
              <td>{availableOrders.customer.username}</td>
              <td>{availableOrders.shippingCompany.companyName}</td>
              <td>
                {availableOrders.orderProducts.map(product => (
                  <div key={product.id}>
                    {product.name}
                  </div>
                ))}
              </td>
              <td>
                {availableOrders.orderProducts.map(product => (
                  <div key={product.id}>
                    {product.price}
                  </div>
                ))}
              </td>
              <td>{availableOrders.status}</td>
              <td>{availableOrders.customer.message}</td>
            </tr>
          ))}
          
          
        </tbody>
      </table>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('productsList')}>
        Back
      </button>
    </div>
  )
}
