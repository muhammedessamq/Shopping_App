import React, { useState } from "react";


export const Selling_Companies_Page= (props)=> {

  return (
   
  <div className="auth-form-container">
            <h2>Selling Companies Page</h2>
        <form className="Admin-form" >
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('createNewProduct')}>Create New Product</button>
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('listAvailableProducts')}>List Available Products</button>
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('listSoldProducts')}>List Sold products</button>
            <button className="link-btnAdmin" onClick={() => {
              localStorage.removeItem('selling_company_id');
              props.onFormSwitch('Home');}}>Logout</button>
        </form>
        </div>

  )
}
