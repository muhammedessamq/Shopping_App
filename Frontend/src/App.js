import React, { useState, useEffect } from "react";
import { Home } from './components/Home';
import { CustomerLogin } from './components/Login/CustomerLogin';
import { SellingCompaniesLogin } from './components/Login/SellingCopmaniesLogin';
import { AdminLogin } from './components/Login/AdminLogin';
import { ShippingCompaniesLogin } from './components/Login/ShippingCompaniesLogin';
import {Admin_Page} from './components/Admin_Page/Admin_Page';
import { New_Selling_Companies } from './components/Admin_Page/New_Selling_Companies';
import { New_Shipping_Companies } from './components/Admin_Page/New_Shipping_Companies';
import { Customer_Accounts } from './components/Admin_Page/Customer_Accounts';
import {CustomerRegister} from './components/Register/CustomerRegister';
import logo from './logo.svg';
import './App.css';
import { Shipping_Companies_List } from './components/Admin_Page/Shipping_Companies_List';
import { Selling_Companies_List } from './components/Admin_Page/Selling_Companies_List';
import {Selling_Companies_Page} from './components/Selling_Companies/Selling_Companies_Page';
import {Shipping_Companies_Page} from './components/Shipping_Companies/Shipping_Companies_Page';
import { Create_New_Product } from './components/Selling_Companies/Create_New_Product';
import { Products_List } from './components/Customer_Page/Products_List';
import { List_Available_Products } from './components/Selling_Companies/List_Available_Products';
import { List_Sold_Products } from './components/Selling_Companies/List_Sold_Products';
import { List_Orders } from './components/Shipping_Companies/List_Orders';
import { Shopping_Cart } from "./components/Customer_Page/Shopping_Cart";
import { Make_Order } from "./components/Customer_Page/Make_Order";
import { View_Orders } from "./components/Customer_Page/View_Orders";
import { View_Notifications } from "./components/Customer_Page/View_Notifications";
function App() {
  const [currentForm, setCurrentForm] = useState('Home');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {currentForm === "Home" ? ( <Home onFormSwitch={toggleForm} />)
       :currentForm === "customerLogin" ? ( <CustomerLogin onFormSwitch={toggleForm} />)
       : currentForm === "customerRegister" ? ( <CustomerRegister onFormSwitch={toggleForm} /> )
       : currentForm === "sellingCompaniesLogin" ? ( <SellingCompaniesLogin onFormSwitch={toggleForm} /> )
       : currentForm === "adminLogin" ? ( <AdminLogin onFormSwitch={toggleForm} /> )
       : currentForm === "shippingCompaniesLogin" ? ( <ShippingCompaniesLogin onFormSwitch={toggleForm} /> )
       : currentForm === "newSellingCompanies" ?( <New_Selling_Companies onFormSwitch={toggleForm} />) 
       : currentForm === "adminPage" ? (<Admin_Page onFormSwitch={toggleForm} /> ) 
       : currentForm === "customerAccounts" ? (<Customer_Accounts onFormSwitch={toggleForm} /> ) 
       : currentForm === "shippingCompaniesList" ? (<Shipping_Companies_List onFormSwitch={toggleForm} /> ) 
       : currentForm === "sellingCompaniesList" ? (<Selling_Companies_List onFormSwitch={toggleForm} /> ) 
       : currentForm === "sellingCompaniesPage" ? (<Selling_Companies_Page onFormSwitch={toggleForm} /> ) 
       : currentForm === "shippingCompaniesPage" ? (<Shipping_Companies_Page onFormSwitch={toggleForm} /> ) 
       : currentForm === "createNewProduct" ? (<Create_New_Product onFormSwitch={toggleForm} /> )
       : currentForm === "productsList" ? (<Products_List onFormSwitch={toggleForm} /> ) 
       : currentForm === "listAvailableProducts" ? (<List_Available_Products onFormSwitch={toggleForm} /> )
       : currentForm === "listSoldProducts" ? (<List_Sold_Products onFormSwitch={toggleForm} /> )
       : currentForm === "listOrders" ? (<List_Orders onFormSwitch={toggleForm} /> )
       : currentForm === "makeOrder" ? (<Make_Order onFormSwitch={toggleForm} /> )
       : currentForm === "shoppingCart" ? (<Shopping_Cart onFormSwitch={toggleForm} /> )
       : currentForm === "viewOrders" ? (<View_Orders onFormSwitch={toggleForm} /> )
       : currentForm === "viewNotifications" ? (<View_Notifications onFormSwitch={toggleForm} /> )
       :(<New_Shipping_Companies onFormSwitch={toggleForm} /> ) 

        }
    </div>
  );
}

export default App;