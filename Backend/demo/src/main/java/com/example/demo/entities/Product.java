package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.*;



@Stateless
@LocalBean
@Entity
@Table(name = "Product")

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Long product_id;
    private String name;
    private String price;

    @ManyToOne
    @JoinColumn(name = "selling_company_id")
    private SellingCompanyEntity sellingCompany;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public SellingCompanyEntity getSellingCompany() {
        return sellingCompany;
    }

    public void setSellingCompany(SellingCompanyEntity sellingCompany) {
        this.sellingCompany = sellingCompany;
    }

}