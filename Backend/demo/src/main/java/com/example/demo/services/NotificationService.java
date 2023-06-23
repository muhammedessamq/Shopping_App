package com.example.demo.services;

import com.example.demo.entities.CustomerEntity;
import com.example.demo.entities.Notification;
import jakarta.ejb.MessageDriven;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.MessageListener;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@MessageDriven(
        activationConfig = {
                @jakarta.ejb.ActivationConfigProperty(propertyName = "destinationType", propertyValue = "jakarta.jms.Queue"),
                @jakarta.ejb.ActivationConfigProperty(propertyName = "destination", propertyValue = "java:/jms/queue/NotificationQueue")
        },
        mappedName = "java:/jms/queue/NotificationQueue", name = "NotificationService")


public class NotificationService implements MessageListener {
    @PersistenceContext(unitName = "default")
    EntityManager entityManager;

    @Override
    public void onMessage(Message message) {
        try {
            String[] orderRequest = message.getBody(String.class).split(",");
            Long customerID = Long.valueOf(orderRequest[0]);
            CustomerEntity customer=entityManager.find(CustomerEntity.class,customerID);
            String notificationMessage =orderRequest[1];

            Notification newNotification = new Notification();
            newNotification.setCustomer_notification(customer);
            newNotification.setMessage(notificationMessage);
            customer.getNotifications().add(newNotification);

            entityManager.persist(newNotification);
            entityManager.merge(customer);

        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}