import React, { useState } from "react";


export const Shipping_Companies_Page= (props)=> {

  return (
   
  <div className="auth-form-container">
            <h2>Shipping Companies Page</h2>
        <form className="Admin-form" >
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('listOrders')}>List Orders</button>
            <button className="link-btnAdmin" onClick={() => {
              localStorage.removeItem('shipping_company_id');
              props.onFormSwitch('Home');}}>Logout</button>
        </form>
        </div>

  )
}
