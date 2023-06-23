package com.example.demo.entities;

import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Stateless
@LocalBean
@Entity
@Table(name = "orders")


public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private Long order_id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;

    @ManyToOne
    @JoinColumn(name = "shipping_company_id")
    private ShippingCompanyEntity shippingCompany;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "order_products", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> orderProducts = new ArrayList<>();

    private String status="Waiting";

    public Long getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Long order_id) {
        this.order_id = order_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void addOrderProducts(Product product) {
        orderProducts.add(product);
    }

    public Long getId() {
        return order_id;
    }

    public void setId(Long id) {
        this.order_id = id;
    }

    public CustomerEntity getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }

    public ShippingCompanyEntity getShippingCompany() {
        return shippingCompany;
    }

    public void setShippingCompany(ShippingCompanyEntity shippingCompany) {
        this.shippingCompany = shippingCompany;
    }

    public List<Product> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<Product> orderProducts) {
        this.orderProducts = orderProducts;
    }
}
