import React, { useState, useEffect } from "react";
import axios from 'axios';

export const Create_New_Product = (props) => {
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [selling_company_id,setselling_company_id]= useState('');

  useEffect(() => {
    // When you need to retrieve the selling_company_id
  const selling_company_id = localStorage.getItem('selling_company_id');

    setselling_company_id(selling_company_id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
     name:name,
     price:price
    };

    try {
      const response = await axios.post(`http://localhost:8080/demo-1.0-SNAPSHOT/api/sellingcompany/createProduct/${selling_company_id}`, product);
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="auth-form-container">
      <h2>New Product</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Product Name</label>
        <input
          value={name}
          onChange={(e) => setname(e.target.value)}
          type="text"
          placeholder="name"
          id="name"
          name="name"
          required
        />

        <label htmlFor="price">Enter Product price</label>
        <input
          value={price}
          onChange={(e) => setprice(e.target.value)}
          type="text"
          placeholder="price"
          id="price"
          name="price"
          required
        />

        <button className="link-btncompany">Add</button>
        <button className="link-btncompany" onClick={() => props.onFormSwitch('sellingCompaniesPage')}>Back</button>
      </form>
    </div>
  );
}
