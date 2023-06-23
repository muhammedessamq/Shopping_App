import React, { useState } from "react";


export const Admin_Page= (props)=> {

  return (
   
  <div className="auth-form-container">
            <h2>Admin Mode</h2>
        <form className="Admin-form" >
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('newSellingCompanies')}>Create New Selling Company</button>
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('New_Shipping_Companies')}>Create New Shipping Company</button>
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('customerAccounts')}>List All Customer Accounts</button>
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('shippingCompaniesList')}>List All Shipping Companies</button>
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('sellingCompaniesList')}>List All Selling Companies</button>
            <button className="link-btnAdmin" onClick={() => props.onFormSwitch('Home')}>Log Out</button>
        </form>
        </div>

  )
}
