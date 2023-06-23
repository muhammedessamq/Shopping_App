package com.example.demo.services;

import com.example.demo.entities.*;
import jakarta.ejb.EJBException;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Stateful
@SessionScoped
@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class CustomerService implements Serializable {

    @PersistenceContext(unitName = "default")
    EntityManager entityManager;


    @POST
    @Path("register")
    public String register(CustomerEntity customer) {
        try {
            entityManager.persist(customer);
            return "Customer added successfully";
        } catch (Exception e) {
            throw new EJBException(e);
        }
    }

    @POST
    @Path("login")
    public Response login(CustomerEntity customer) {

        String loginResult;

        String password = customer.getPassword();
        String username = customer.getUsername();

        CustomerEntity dbCustomer = entityManager.createQuery("SELECT c from CustomerEntity c " +
                "WHERE c.username= :UserName", CustomerEntity.class).setParameter("UserName", username).getSingleResult();

        String dbPassword = dbCustomer.getPassword();
        String dbUsername = dbCustomer.getUsername();

        if (dbPassword.equals(password) & dbUsername.equals(username)) {
            JsonObject jsonResponse = Json.createObjectBuilder()
                    .add("message", "Login Successfully")
                    .add("customer_id", dbCustomer.getCustomer_id())
                    .build();
            return Response.status(Response.Status.OK).entity(jsonResponse.toString()).build();
        } else {
            // Login failed
            return Response.status(Response.Status.UNAUTHORIZED).entity("Login Failed").build();
        }
    }

    @GET
    @Path("getAllProducts")
    public List<Product> getAllProducts() {
        Query query = entityManager.createQuery("SELECT c FROM Product c");
        List<Product> results = query.getResultList();
        return results;
    }

    @POST
    @Path("/purchaseProduct/{customerId}/{productId}")
    public String purchaseProduct(@PathParam("customerId") long customerId, @PathParam("productId") long productId) {
        CustomerEntity customer = entityManager.find(CustomerEntity.class, customerId);
        Product product = entityManager.find(Product.class, productId);
        List<Product> purchasedProducts = customer.getPurchased_products();
        purchasedProducts.add(product);
        customer.setPurchased_products(purchasedProducts);
        entityManager.merge(customer);
        return "Product purchased successfully";
    }

    @GET
    @Path("/getPurchasedProducts/{customerId}")
    public List<Product> getPurchasedProducts(@PathParam("customerId") long customerId) {
        CustomerEntity customer = entityManager.find(CustomerEntity.class, customerId);
        // Initialize purchasedProducts collection before session is closed
        List<Product> purchasedProducts = new ArrayList<>(customer.getPurchased_products());
        return purchasedProducts;
    }

    @GET
    @Path("getShippingCompany")
    public List<ShippingCompanyEntity> getShippingCompany() {
        Query query = entityManager.createQuery("SELECT c FROM ShippingCompanyEntity c");
        List<ShippingCompanyEntity> results = query.getResultList();
        return results;
    }

    @POST
    @Path("/makeOrder/{customerId}/{shippingCompanyId}")
    public String makeOrder(@PathParam("customerId") long customerId, @PathParam("shippingCompanyId") long shippingCompanyId) {
        CustomerEntity customer = entityManager.find(CustomerEntity.class, customerId);
        ShippingCompanyEntity shippingCompany = entityManager.find(ShippingCompanyEntity.class, shippingCompanyId);
        String address = customer.getAddress();
        String area = shippingCompany.getArea();

        if (address.contains(area)) {
            List<Product> purchasedProducts = customer.getPurchased_products();
            if (purchasedProducts.isEmpty()) {
                return "Cannot place order with empty product list";
            }
            Order order = new Order();
            order.setCustomer(customer);
            order.setShippingCompany(shippingCompany);
            for (Product product : purchasedProducts) {
                order.addOrderProducts(product);
            }
            entityManager.persist(order);
            customer.setPurchased_products(new ArrayList<>());
            return "Order placed successfully";
        } else {
            return "This Shipping Company does not cover your geographic location";
        }
    }

    @GET
    @Path("/getOrders/{customerId}")
    public List<Order> getOrders(@PathParam("customerId") long customerId) {
        CustomerEntity customer = entityManager.find(CustomerEntity.class, customerId);
        List<Order> orders = new ArrayList<>(customer.getCustomer_orders());
        return orders;
    }

    @GET
    @Path("/getNotifications/{customerId}")
    public List<Notification> getNotifications(@PathParam("customerId") long customerId) {
        CustomerEntity customer = entityManager.find(CustomerEntity.class, customerId);
        List<Notification> notifications = new ArrayList<>(customer.getNotifications());
        return notifications;
    }


    @GET
    @Path("getNotifications")
    public List<Notification> getNotifications() {
        Query query = entityManager.createQuery("SELECT c FROM Notification c");
        List<Notification> results = query.getResultList();
        return results;
    }
}