import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Shopping_Cart= (props)=> {
  const [purchasedProducts,setPurchasedProducts] = useState([]);
  const customer_id = localStorage.getItem('customer_id');
  useEffect(() => {

    axios.get(`http://localhost:8080/demo-1.0-SNAPSHOT/api/customer/getPurchasedProducts/${customer_id}`)
      .then(response => {
        setPurchasedProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {purchasedProducts.map(purchasedProduct => (
            <tr key={purchasedProduct.product_id}>
              <td>{purchasedProduct.product_id}</td>
              <td>{purchasedProduct.name}</td>
              <td>{purchasedProduct.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('makeOrder')}>
        Make Order
      </button>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('productsList')}>
        Back
      </button>
      
    </div>
  )
}
