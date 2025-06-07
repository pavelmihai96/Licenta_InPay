package com.unitbv.in_pay.parsers;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;
import com.unitbv.in_pay.entities.Invoice;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.mappers.ClientInfo;
import com.unitbv.in_pay.repositories.SubscriptionRepository;
import com.unitbv.in_pay.request.InvoiceProperties;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class InvoiceCsvParser{

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private EntityManager entityManager;

    public List<Invoice> parse(Path file) {
        List<Invoice> invoices = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new FileReader(file.toFile()))) {
            String[] line;
            reader.readNext();
            while ((line = reader.readNext()) != null) {
                try {
                    Subscription s = subscriptionRepository.getSubscriptionByClientId(Integer.parseInt(line[1]));
                    if (s != null) {
                        s = subscriptionRepository.findById(s.getSubscriptionId())
                                .orElseThrow(() -> new RuntimeException("Subscription entity is detached or doesn't exist!"));

                        //entityManager.merge(s);

                        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("M/d/yyyy");
                        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

                        Invoice i = new Invoice();
                        i.setSubscription(s);
                        i.setIdFromProvider(Integer.parseInt(line[0]));
                        i.setClientId(s.getClientId());
                        i.setClientName(line[2]);
                        i.setClientAddress(line[3]);
                        i.setAmount(Double.parseDouble(line[4]));
                        i.setIssueDate(LocalDate.parse(LocalDate.parse(line[5], inputFormatter).format(outputFormatter)));
                        i.setDueDate(LocalDate.parse(LocalDate.parse(line[6], inputFormatter).format(outputFormatter)));
                        i.setPeriod(line[7]);
                        i.setStatus(Invoice.Status.valueOf(line[8]));
                        i.setInvoiceName(file.getFileName().toString());
                        i.setProviderInfo(line[10]);
                        if (line.length > 11) {
                            i.setKwHConsumed(line[11]);
                        }

                        invoices.add(i);
                    }
                } catch (NumberFormatException ex) {
                    System.err.println("InvoiceCsvParser-From read: " + String.join(",", line));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return invoices;
    }

    public Invoice parseInvoice(Path file, Subscription subscription) {
        try (CSVReader reader = new CSVReader(new FileReader(file.toFile()))) {
            String[] line;
            reader.readNext();
            while ((line = reader.readNext()) != null) {
                try {
                    if (line[1].equalsIgnoreCase(subscription.getClientId().toString())) {
                        return createInvoiceFromLine(file, line, subscription);
                    }
                } catch (NumberFormatException ex) {
                    System.out.println(ex);
                    System.err.println("From invoice: " + String.join(",", line));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Map<String, Long> readMapInvoice(Path file) {
        Map<String, Long> data = new HashMap<>();
        try (CSVReader reader = new CSVReader(new FileReader(file.toFile()))) {
            String[] line;
            reader.readNext();
            while ((line = reader.readNext()) != null) {
                try {
                    data.put(line[0], Long.parseLong(line[1]));
                } catch (NumberFormatException ex) {
                    System.err.println("From readMapInvoice: " + String.join(",", line));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return data;
    }

    public void uploadMapInvoice(Path file, Map<String, Long> request) {

        try (CSVWriter writer = new CSVWriter(
                new FileWriter(file.toFile()),
                CSVWriter.DEFAULT_SEPARATOR,
                CSVWriter.NO_QUOTE_CHARACTER,
                CSVWriter.DEFAULT_ESCAPE_CHARACTER,
                CSVWriter.DEFAULT_LINE_END))
        {
            String[] header = { "fileName", "creationTime" };

            writer.writeNext(header);
            request.forEach((k, v) -> {
                String[] row = {k, String.valueOf(v)};
                writer.writeNext(row);
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

//    public byte[] generateInvoiceFromCsv(String csvPath, int rowIndex) throws Exception {
//        List<String> lines = Files.readAllLines(Paths.get(csvPath));
//        if (rowIndex < 1 || rowIndex >= lines.size()) {
//            throw new IllegalArgumentException("Invalid row index");
//        }
//
//        String[] headers = lines.get(0).split(",");
//        String[] values = lines.get(rowIndex).split(",");
//
//        // Build invoice
//        InvoiceData invoice = new InvoiceData();
//        invoice.setInvoiceNumber(values[0]);
//        invoice.setCustomerName(values[1]);
//        invoice.setDate(LocalDate.parse(values[2]));
//
//        List<InvoiceItem> items = new ArrayList<>();
//        for (int i = 3; i < values.length; i += 3) {
//            InvoiceItem item = new InvoiceItem();
//            item.setDescription(values[i]);
//            item.setQuantity(Integer.parseInt(values[i + 1]));
//            item.setUnitPrice(Double.parseDouble(values[i + 2]));
//            items.add(item);
//        }
//        invoice.setItems(items);
//
//        return generatePdf(invoice);
//    }

    public Invoice createInvoiceFromLine(Path file, String[] line, Subscription subscription) {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("M/d/yyyy");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        Invoice i = new Invoice();
        i.setSubscription(subscription);
        i.setIdFromProvider(Integer.parseInt(line[0]));
        i.setClientId(subscription.getClientId());
        i.setClientName(line[2]);
        i.setClientAddress(line[3]);
        i.setAmount(Double.parseDouble(line[4]));
        i.setIssueDate(LocalDate.parse(LocalDate.parse(line[5], inputFormatter).format(outputFormatter)));
        i.setDueDate(LocalDate.parse(LocalDate.parse(line[6], inputFormatter).format(outputFormatter)));
        i.setPeriod(line[7]);
        i.setStatus(Invoice.Status.valueOf(line[8]));
        i.setInvoiceName(file.getFileName().toString());
        i.setProviderInfo(line[10]);
        if (line.length > 11) {
            i.setKwHConsumed(line[11]);
        }
        return i;
    }
}
