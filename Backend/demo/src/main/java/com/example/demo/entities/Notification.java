package com.example.demo.entities;

import jakarta.ejb.LocalBean;
import jakarta.persistence.*;

@LocalBean
@Entity
@Table(name = "Notification")

public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id", nullable = false)
    private Long notification_id;

    private String message;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer_notification;

    public Long getNotification_id() {
        return notification_id;
    }

    public void setNotification_id(Long notification_id) {
        this.notification_id = notification_id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public CustomerEntity getCustomer_notification() {
        return customer_notification;
    }

    public void setCustomer_notification(CustomerEntity customer_notification) {
        this.customer_notification = customer_notification;
    }
}