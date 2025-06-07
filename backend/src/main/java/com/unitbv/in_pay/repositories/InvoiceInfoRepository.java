package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Invoice;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.mappers.InvoiceInfo;
import com.unitbv.in_pay.parsers.InvoiceCsvParser;
import com.unitbv.in_pay.request.InvoiceProperties;
import com.unitbv.in_pay.request.PDFRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

@AllArgsConstructor
@Repository
public class InvoiceInfoRepository {
    @Autowired
    private final InvoiceCsvParser parser;

    @Autowired
    private final InvoiceCsvParser invoiceCsvParser;

    public List<Invoice> loadInvoicesBySubscription(Subscription subscription) {
        List<Invoice> invoices = new ArrayList<>();

        try(Stream<Path> paths = Files.walk(Path.of("src/main/resources/invoices"))){
            /// Files::isRegularFile filters only the files in the folder, excluding the directory name
            paths.filter(Files::isRegularFile)
                    .filter(p -> p.getFileName().toString().contains(subscription.getContractId().toString()))
                    .forEach(p -> {
                        if (invoiceCsvParser.parseInvoice(p, subscription) != null) {
                            invoices.add(invoiceCsvParser.parseInvoice(p, subscription));
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
        }

        return invoices;
    }

    public Map<String, Long> readMapInvoice() {
        Map<String, Long> data = new HashMap<>();
        try (Stream<Path> paths = Files.walk(Path.of("src/main/resources"))) {
            paths.filter(Files::isRegularFile)
                    .filter(p -> p.toString().contains("mapInvoice"))
                    .filter(p -> p.toString().endsWith(".csv"))
                    .forEach(p -> data.putAll(parser.readMapInvoice(p)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }

    public void uploadMapInvoice(Map<String, Long> request) {
        try (Stream<Path> paths = Files.walk(Path.of("src/main/resources"))) {
            paths.filter(Files::isRegularFile)
                    .filter(p -> p.toString().contains("mapInvoice"))
                    .filter(p -> p.toString().endsWith(".csv"))
                    .forEach(p -> parser.uploadMapInvoice(p, request));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
