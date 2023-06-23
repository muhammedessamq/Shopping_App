package com.example.demo.services;

import com.example.demo.entities.AdminEntity;
import com.example.demo.entities.CustomerEntity;
import com.example.demo.entities.SellingCompanyEntity;
import com.example.demo.entities.ShippingCompanyEntity;
import jakarta.ejb.EJBException;
import jakarta.ejb.Singleton;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;
import java.util.UUID;

@Singleton
@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class AdminService {

    @PersistenceContext(unitName = "default")
    EntityManager entityManager;

    @POST
    @Path("login")
    public String login(AdminEntity admin) {

        String loginResult;

        String password = admin.getPassword();
        String username = admin.getUsername();

        String dbUsername = "mo";
        String dbPassword = "123";

        if (dbPassword.equals(password) & dbUsername.equals(username)) {
            loginResult = "Login Successfully";
        } else {
            loginResult = "Login Failed";
        }
        return loginResult;
    }

    @POST
    @Path("createSellingCompanyAccount")
    public String createSellingCompanyAccount(SellingCompanyEntity sellingCompany) {
        try {
            String password = UUID.randomUUID().toString().substring(0, 10);
            sellingCompany.setPassword(password);
            entityManager.persist(sellingCompany);
            return "Selling Company Account Created";
        } catch (Exception e) {
            throw new EJBException(e);
        }
    }

    @POST
    @Path("createShippingCompanyAccount")
    public String createShippingCompanyAccount(ShippingCompanyEntity shippingCompany) {
        try {
            String password = UUID.randomUUID().toString().substring(0, 10);
            shippingCompany.setPassword(password);
            entityManager.persist(shippingCompany);
            return "Shipping Company Account Created";
        } catch (Exception e) {
            throw new EJBException(e);
        }
    }

    @GET
    @Path("getCustomer")
    public List<CustomerEntity> getCustomer() {
        Query query = entityManager.createQuery("SELECT c FROM CustomerEntity c");
        List<CustomerEntity> results = query.getResultList();
        return results;
    }

    @GET
    @Path("getShippingCompany")
    public List<ShippingCompanyEntity> getShippingCompany() {
        Query query = entityManager.createQuery("SELECT c FROM ShippingCompanyEntity c");
        List<ShippingCompanyEntity> results = query.getResultList();
        return results;
    }

    @GET
    @Path("getSellingCompany")
    public List<SellingCompanyEntity> getSellingCompany() {
        Query query = entityManager.createQuery("SELECT c FROM SellingCompanyEntity c");
        List<SellingCompanyEntity> results = query.getResultList();
        return results;
    }


}