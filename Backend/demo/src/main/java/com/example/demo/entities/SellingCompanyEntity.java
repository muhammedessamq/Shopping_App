package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.ejb.LocalBean;
import jakarta.ejb.Stateless;
import jakarta.persistence.*;

import java.util.List;


@LocalBean
@Entity
@Table(name = "SellingCompany")

public class SellingCompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "selling_company_id", nullable = false)
    private Long selling_company_id;
    private String companyName;
    private String password;

    @OneToMany(mappedBy = "sellingCompany", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Product> selling_products;

    public List<Product> getSelling_products() {
        return selling_products;
    }

    public void setSelling_products(List<Product> selling_products) {
        this.selling_products = selling_products;
    }

    public Long getSelling_company_id() {
        return selling_company_id;
    }

    public void setSelling_company_id(Long selling_company_id) {
        this.selling_company_id = selling_company_id;
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
}