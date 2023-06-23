import React, { useState, useEffect } from "react";
import axios from 'axios';

export const List_Sold_Products= (props)=> {
  const [soldProducts,setSoldProducts] = useState([]);
  const selling_company_id = localStorage.getItem('selling_company_id');
  useEffect(() => {

    axios.get(`http://localhost:8080/demo-1.0-SNAPSHOT/api/sellingcompany/getSoldProducts/${selling_company_id}`)
      .then(response => {
        setSoldProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Sold products List</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Customer Name</th>
            <th>Shipping Company Name</th>
          </tr>
        </thead>
        <tbody>
          {soldProducts.map(soldProduct => (
            <tr key={soldProduct.productName}>
              <td>{soldProduct.productName}</td>
              <td>{soldProduct.customerName}</td>
              <td>{soldProduct.shippingCompanyName}</td>
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
