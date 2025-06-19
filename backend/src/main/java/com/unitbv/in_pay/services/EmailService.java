package com.unitbv.in_pay.services;

import com.unitbv.in_pay.entities.Invoice;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendInvoiceEmail(String to, String subject, String text, byte[] pdfData, Invoice invoice, String url) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String htmlContent = "Hello, <br/><br/> Your invoice from " + invoice.getIssueDate() + " " +
                "with due date in " + invoice.getDueDate() + " " +
                "was issued. <br/><br/>Please make sure you pay in time.<br/><br/>Pay from the application "
                + "<a href='" + url + "'>" + text + "</a><br/><br/><br/>" +
                "<span style='color: mediumblue;'>***<em>InPay payment application</em>***</span>";

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // true = send as HTML

        // Attach the PDF
        helper.addAttachment("invoice.pdf", new ByteArrayResource(pdfData));

        mailSender.send(message);
    }
}
