import React, { useState, useEffect } from "react";
import axios from 'axios';

export const View_Notifications= (props)=> {
  const [notifications,setNotifications] = useState([]);
  const customer_id = localStorage.getItem('customer_id');
  useEffect(() => {

    axios.get(`http://localhost:8080/demo-1.0-SNAPSHOT/api/customer/getNotifications/${customer_id}`)
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>Notifications</h2>
      <table>
        <thead>
          <tr>
            <th>Notification Id</th>
            <th>Content</th>    
          </tr>
        </thead>
        <tbody>
          {notifications.map(notification => (
            <tr key={notification.notification_id}>
              <td>{notification.notification_id}</td>
              <td>{notification.message}</td>
        
            </tr>
          ))}
          
          
        </tbody>
      </table>
      <button className="link-btnAdmin" onClick={() => props.onFormSwitch('productsList')}>
        Back
      </button>
    </div>
  )
}
