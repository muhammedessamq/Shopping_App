import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Products_List = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/demo-1.0-SNAPSHOT/api/customer/getAllProducts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while fetching Products');
      });
  }, []);

  const handlePurchase = (product) => {
    const customerId = localStorage.getItem('customer_id');
    axios.post(`http://localhost:8080/demo-1.0-SNAPSHOT/api/customer/purchaseProduct/${customerId}/${product.product_id}`, {
      customer_id: customerId,
      product_id: product.product_id
    })
      .then(response => {
        alert('Added to cart successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while purchasing the product');
      });
  };

  return (
    <div className="auth-form-container">
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td><button onClick={() => handlePurchase(product)}>Purchase</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('shoppingCart')}>
        View Shopping Cart
      </button>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('viewNotifications')}>
          View Notifications
        </button>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('viewOrders')}>
          View Orders
        </button>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('customerLogin')}>
        Logout
      </button>
      
    </div>
  );
}
