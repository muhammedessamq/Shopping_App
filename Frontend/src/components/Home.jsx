import React, { useState } from "react";


export const Home= (props)=> {

  return (
   
  <div className="home-container">
            <h2>Home Page</h2>
        <form className="Login-form" >
            <button className="link-btn" onClick={() => props.onFormSwitch('customerLogin')}>Customer Login</button>
            <button className="link-btn" onClick={() => props.onFormSwitch('sellingCompaniesLogin')}>Selling Company Login</button>
            <button className="link-btn" onClick={() => props.onFormSwitch('shippingCompaniesLogin')}>Shipping Company Login</button>
            <button className="link-btn" onClick={() => props.onFormSwitch('adminLogin')}>Admin Login</button>
        </form>
        </div>

  )
}
