package com.example.demo.entities;

import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.*;

@Stateless
@LocalBean
@Entity
@Table(name = "SoldProduct")

public class SoldProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "soldProduct_id", nullable = false)
    private Long soldProduct_id;
    private String productName;
    private String customerName;
    private String shippingCompanyName;



    public SoldProduct(String productName, String customerName, String shippingCompanyName) {
        this.productName = productName;
        this.customerName = customerName;
        this.shippingCompanyName = shippingCompanyName;
    }

    public SoldProduct() {

    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getShippingCompanyName() {
        return shippingCompanyName;
    }

    public void setShippingCompanyName(String shippingCompanyName) {
        this.shippingCompanyName = shippingCompanyName;
    }
}