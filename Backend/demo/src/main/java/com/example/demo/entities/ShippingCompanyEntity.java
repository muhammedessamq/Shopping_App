package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.*;

import java.util.List;

@LocalBean
@Entity
@Table(name = "ShippingCompany")

public class ShippingCompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_company_id", nullable = false)
    private Long shipping_company_id;
    private String companyName;
    private String password;
    private String area;

    @OneToMany(mappedBy = "shippingCompany", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Order> shipping_orders;

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public Long getShipping_company_id() {
        return shipping_company_id;
    }

    public void setShipping_company_id(Long shipping_company_id) {
        this.shipping_company_id = shipping_company_id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Order> getShipping_orders() {
        return shipping_orders;
    }

    public void setShipping_orders(List<Order> shipping_orders) {
        this.shipping_orders = shipping_orders;
    }
}