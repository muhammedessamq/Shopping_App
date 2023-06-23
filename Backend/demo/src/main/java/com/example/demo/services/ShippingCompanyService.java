package com.example.demo.services;

import com.example.demo.entities.CustomerEntity;
import com.example.demo.entities.Notification;
import com.example.demo.entities.Order;
import com.example.demo.entities.ShippingCompanyEntity;
import jakarta.annotation.Resource;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;
import jakarta.jms.*;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import javax.naming.Context;
import javax.naming.InitialContext;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Stateful
@SessionScoped
@Path("/shippingcompany")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class ShippingCompanyService implements Serializable {

    @PersistenceContext(unitName = "default")
    EntityManager entityManager;

    @Resource(mappedName = "java:/jms/queue/NotificationQueue")
    private Queue queue;

    @POST
    @Path("login")
    public Response login(ShippingCompanyEntity shippingCompany) {

        String loginResult;

        String password = shippingCompany.getPassword();
        String companyName = shippingCompany.getCompanyName();

        ShippingCompanyEntity dbShippingCompany = entityManager.createQuery("SELECT c from ShippingCompanyEntity c " + "WHERE c.companyName = :CompanyName", ShippingCompanyEntity.class).setParameter("CompanyName", companyName).getSingleResult();

        String dbPassword = dbShippingCompany.getPassword();
        String dbCompanyName = dbShippingCompany.getCompanyName();

        if (dbPassword.equals(password) & dbCompanyName.equals(companyName)) {
            JsonObject jsonResponse = Json.createObjectBuilder().add("message", "Login Successfully").add("shipping_company_id", dbShippingCompany.getShipping_company_id()).build();
            return Response.status(Response.Status.OK).entity(jsonResponse.toString()).build();
        } else {
            // Login failed
            return Response.status(Response.Status.UNAUTHORIZED).entity("Login Failed").build();
        }
    }

    @GET
    @Path("/getOrders/{shippingId}")
    public List<Order> getOrders(@PathParam("shippingId") long shippingId) {
        ShippingCompanyEntity shippingCompany = entityManager.find(ShippingCompanyEntity.class, shippingId);
        List<Order> orders = new ArrayList<>(shippingCompany.getShipping_orders());
        return orders;
    }

    @PUT
    @Path("/updateOrderStatus/{orderId}")
    public String updateOrderStatus(@PathParam("orderId") long orderId, String newStatus) {
        // Update order status
        Order order = entityManager.find(Order.class, orderId);
        order.setStatus(newStatus);
        entityManager.persist(order);
        Long customerId = order.getCustomer().getCustomer_id();
        String notificationMessage = customerId + ",Your Order Number " + orderId + " Status is " + newStatus + " From " + order.getShippingCompany().getCompanyName() + " Company";
        sendMessage(notificationMessage);

        return "Order Status Changed Successfully";
    }


    public void sendMessage(String response) {
        try {
            Context context = new InitialContext();
            ConnectionFactory connectionFactory = (ConnectionFactory) context.lookup("java:/ConnectionFactory");
            Connection connection = connectionFactory.createConnection();
            Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            MessageProducer producer = session.createProducer(this.queue);
            ObjectMessage message = session.createObjectMessage();
            message.setObject(response);
            producer.send(message);
            session.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}