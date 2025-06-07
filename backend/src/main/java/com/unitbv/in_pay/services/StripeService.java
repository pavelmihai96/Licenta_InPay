package com.unitbv.in_pay.services;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.unitbv.in_pay.request.InvoiceRequest;
import com.unitbv.in_pay.request.StripeResponse;
import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class StripeService {

    @Value("${secret.key}")
    private String secretKey;

    public StripeResponse payInvoice(Integer userId, InvoiceRequest invoiceRequest) {
        // Set your secret key. Remember to switch to your live secret key in production!
        Stripe.apiKey = this.secretKey;

        // Create a PaymentIntent with the order amount and currency
        SessionCreateParams.LineItem.PriceData.ProductData productData =
                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName(invoiceRequest.getName())
                        .build();

        // Create new line item with the above product data and associated price
        SessionCreateParams.LineItem.PriceData priceData =
                SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency(invoiceRequest.getCurrency() != null ? invoiceRequest.getCurrency() : "USD")
                        //.setUnitAmountDecimal(BigDecimal.valueOf(invoiceRequest.getAmount()))
                        .setUnitAmount(invoiceRequest.getAmount())
                        .setProductData(productData)
                        .build();

        // Create new line item with the above price data
        SessionCreateParams.LineItem lineItem =
                SessionCreateParams
                        .LineItem.builder()
                        .setQuantity(invoiceRequest.getQuantity())
                        .setPriceData(priceData)
                        .build();

        // Create new session with the line items
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:5174/consumer-invoices/" + userId + "?invoiceId=" + invoiceRequest.getInvoiceId() + "&success=true")
                        .setCancelUrl("http://localhost:5174/consumer-invoices/" + userId + "?invoiceId=" + invoiceRequest.getInvoiceId() + "&canceled=true")
                        .addLineItem(lineItem)
                        .build();

        // Create new session
        Session session = null;
        try {
            session = Session.create(params);
        } catch (StripeException e) {
            System.out.println(e.getMessage());
        }

        return StripeResponse
                .builder()
                .status("SUCCESS")
                .message("Payment session created ")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }
}
