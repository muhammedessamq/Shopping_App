package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.*;
import java.util.List;


@LocalBean
@Entity
@Table(name = "Customer")

public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id", nullable = false)
    private Long customer_id;
    private String username;
    private String password;
    private String address;
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Product> purchased_products;

    @OneToMany(mappedBy = "customer",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Order> customer_orders;



    @OneToMany(mappedBy = "customer_notification",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Notification> notifications;


    public void setPurchased_products(List<Product> purchased_products) {
        this.purchased_products = purchased_products;
    }


    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public List<Product> getPurchased_products() {
        return purchased_products;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(Long customer_id) {
        this.customer_id = customer_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Order> getCustomer_orders() {
        return customer_orders;
    }

    public void setCustomer_orders(List<Order> customer_orders) {
        this.customer_orders = customer_orders;
    }
}
