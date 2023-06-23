package com.example.demo.services;

import com.example.demo.entities.*;
import jakarta.ejb.EJBException;
import jakarta.ejb.Stateful;
import jakarta.ejb.Stateless;
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
@Path("/sellingcompany")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class SellingCompanyService implements Serializable {

    @PersistenceContext(unitName = "default")
    EntityManager entityManager;

    @POST
    @Path("login")
    public Response login(SellingCompanyEntity sellingCompany) {

        String password = sellingCompany.getPassword();
        String companyName = sellingCompany.getCompanyName();

        SellingCompanyEntity dbSellingCompany = entityManager.createQuery("SELECT c from SellingCompanyEntity c " +
                "WHERE c.companyName = :CompanyName", SellingCompanyEntity.class).setParameter("CompanyName", companyName).getSingleResult();

        String dbPassword = dbSellingCompany.getPassword();
        String dbCompanyName = dbSellingCompany.getCompanyName();

        if (dbPassword.equals(password) && dbCompanyName.equals(companyName)) {
            JsonObject jsonResponse = Json.createObjectBuilder()
                    .add("message", "Login Successfully")
                    .add("selling_company_id", dbSellingCompany.getSelling_company_id())
                    .build();
            return Response.status(Response.Status.OK).entity(jsonResponse.toString()).build();
        } else {
            // Login failed
            return Response.status(Response.Status.UNAUTHORIZED).entity("Login Failed").build();
        }
    }


    @POST
    @Path("createProduct/{sellingCompanyId}")
    public String createProduct(Product product , @PathParam("sellingCompanyId") long sellingCompanyId){
        try {
            SellingCompanyEntity sellingCompany = entityManager.find(SellingCompanyEntity.class, sellingCompanyId);
            product.setSellingCompany(sellingCompany);
            entityManager.persist(product);
            return "Product added successfully";
        } catch (Exception e) {
            throw new EJBException(e);
        }
    }

    @GET
    @Path("getProduct/{sellingCompanyId}")
    public List<Product> getProduct(@PathParam("sellingCompanyId") long sellingCompanyId) {
        SellingCompanyEntity sellingCompany = entityManager.find(SellingCompanyEntity.class, sellingCompanyId);
        List<Product> products = new ArrayList<>(sellingCompany.getSelling_products());
        return products;
    }

    @GET
    @Path("getSoldProducts/{sellingCompanyId}")
    public List<SoldProduct> getSoldProducts(@PathParam("sellingCompanyId") long sellingCompanyId){
        SellingCompanyEntity sellingCompany = entityManager.find(SellingCompanyEntity.class, sellingCompanyId);
        Query query = entityManager.createQuery("SELECT c FROM Order c");
        List<Order> orders = query.getResultList();
        List<SoldProduct> soldProducts = new ArrayList<>();
        for (Order order : orders) {
            for (Product product : order.getOrderProducts()) {
                if(product.getSellingCompany().equals(sellingCompany)) {
                    SoldProduct soldProduct = new SoldProduct(product.getName(), order.getCustomer().getUsername(), order.getShippingCompany().getCompanyName());
                    soldProducts.add(soldProduct);
                }
            }
        }
        return soldProducts;
    }
}
