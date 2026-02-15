package com.eximroyals.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Async
    public void sendEnquiryNotification(String userEmail, String userName, String messageContent) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo("hello@dndglobalexports.com");
            message.setSubject("New Enquiry from " + userName);
            message.setText("You have received a new enquiry:\n\n" +
                    "Name: " + userName + "\n" +
                    "Email: " + userEmail + "\n\n" +
                    "Message:\n" + messageContent);

            javaMailSender.send(message);
            System.out.println("Enquiry notification email sent successfully.");
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
