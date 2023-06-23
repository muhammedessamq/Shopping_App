import React, { useState, useEffect } from "react";
import axios from 'axios';

export const List_Available_Products= (props)=> {
  const [availableProducts,setAvailableProducts] = useState([]);
  const selling_company_id = localStorage.getItem('selling_company_id');
  useEffect(() => {

    axios.get(`http://localhost:8080/demo-1.0-SNAPSHOT/api/sellingcompany/getProduct/${selling_company_id}`)
      .then(response => {
        setAvailableProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Available products List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {availableProducts.map(availableProduct => (
            <tr key={availableProduct.product_id}>
              <td>{availableProduct.product_id}</td>
              <td>{availableProduct.name}</td>
              <td>{availableProduct.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('sellingCompaniesPage')}>
        Back
      </button>
    </div>
  )
}
