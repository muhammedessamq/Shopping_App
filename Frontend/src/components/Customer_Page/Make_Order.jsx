import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Make_Order = (props) => {
  const [shippingCompanies, setShippingCompanies] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [shippingCompanyId, setShippingCompanyId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
      const customer_id = localStorage.getItem('customer_id');
      setCustomerId(customer_id);
      axios.post(`http://localhost:8080/demo-1.0-SNAPSHOT/api/customer/makeOrder/${customer_id}/${shippingCompanyId}`, {
      customer_id: customer_id,
      shipping_company_id: shippingCompanyId
    })
      .then(response => {
        if(JSON.stringify(response.data).includes('successfully')){

        alert('Order placed successfully');
        }
        else if(JSON.stringify(response.data).includes('geographic location')){
          alert('This Shipping Company does not cover your geographic location');
        }
        else{
          alert('Cannot place order with empty product list');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while purchasing the product');
      });
  };

  const handleShippingCompanyChange = (event) => {
    setShippingCompanyId(event.target.value);
    setErrorMessage('');
    
  };

  return (
    <div className="auth-form-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <select value={shippingCompanyId} onChange={handleShippingCompanyChange}>
          <option value="">Select Shipping Company</option>
          {shippingCompanies.map((company) => (
            <option key={company.shipping_company_id} value={company.shipping_company_id}>
              {company.companyName}
            </option>
          ))}
        </select>
        <button className="link-btnAdmin" type="submit" disabled={!shippingCompanyId}>
          Submit
        </button>
      
        <button className="link-btnAdmin" onClick={() => props.onFormSwitch('viewOrders')}>
        Back
      </button>
      </form>
    </div>
  );
  
};