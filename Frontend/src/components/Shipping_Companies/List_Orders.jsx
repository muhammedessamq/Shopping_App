import React, { useState, useEffect } from "react";
import axios from 'axios';

export const List_Orders= (props)=> {
  const [orders,setOrders] = useState([]);
  const [updateMade, setUpdateMade] = useState(false); // add state variable

  const shipping_company_id = localStorage.getItem('shipping_company_id');
  useEffect(() => {

    axios.get(`http://localhost:8080/demo-1.0-SNAPSHOT/api/shippingcompany/getOrders/${shipping_company_id}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [updateMade]); // add updateMade to dependency array


  const updateOrderStatus = (orderId, x) => {
    axios.put(`http://localhost:8080/demo-1.0-SNAPSHOT/api/shippingcompany/updateOrderStatus/${orderId}`, {x})
      .then(response => {
        alert(response.data);
        setUpdateMade(!updateMade); // update state variable to refresh orders list
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  return (
    <div className="auth-form-container">
      <h2>Orders List</h2>
      <table id="my-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer address</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer.username}</td>
              <td>{order.customer.address}</td>
              <td>
                {order.orderProducts.map(product => (
                  <div key={product.id}>
                    {product.name}
                  </div>
                ))}
              </td>
              <td>
                {order.orderProducts.map(product => (
                  <div key={product.id}>
                    {product.price}
                  </div>
                ))}
              </td>
              <td>{order.status}</td>
              <td>
                <select id="my-select" value="" onChange={(event) => updateOrderStatus(order.id,event.target.value)}>
                  <option value="" disabled>Update status</option>
                  <option value="Processing">Processing</option>
                  <option value="In-Delivery">In-Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('shippingCompaniesPage')}>
        Back
      </button>
    </div>
  )
}
