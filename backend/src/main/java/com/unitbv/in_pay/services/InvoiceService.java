package com.unitbv.in_pay.services;

import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.unitbv.in_pay.entities.*;
import com.unitbv.in_pay.mappers.InvoiceInfo;
import com.unitbv.in_pay.parsers.InvoiceCsvParser;
import com.unitbv.in_pay.repositories.*;
import com.unitbv.in_pay.request.PDFRequest;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.lowagie.text.Rectangle;

import javax.swing.*;
import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.*;
import java.util.List;

@AllArgsConstructor
@Service
public class InvoiceService {
    @Autowired
    private final InvoiceRepository invoiceRepository;

    @Autowired
    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    private final InvoiceInfoRepository invoiceInfoRepository;

    @Autowired
    private final InvoiceCsvParser invoiceCsvParser;

    @Autowired
    private final EmailService emailService;

    public Invoice getInvoice(Integer invoiceId) {
        return invoiceRepository.findById(invoiceId).orElseThrow(() -> new IllegalArgumentException(String.format("Invoice with ID %s doesn't exist", invoiceId)));
    }

    public List<Invoice> getAllInvoicesByConsumerId(Integer consumerId) {
        return invoiceRepository.getAllInvoicesByConsumerId(consumerId);
    }

    public List<Invoice> getAllInvoicesByConsumerIdUnpaid(Integer consumerId) {
        return invoiceRepository.getAllInvoicesByConsumerIdUnpaid(consumerId);
    }

    public List<Invoice> getAllInvoicesBySubscriptionId(Integer subscriptionId) {
        return invoiceRepository.getAllInvoicesBySubscriptionId(subscriptionId);
    }

    public Invoice updateInvoiceStatus(Integer invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(() -> new IllegalArgumentException(String.format("Invoice with ID %s doesn't exist", invoiceId)));

        invoice.setStatus(Invoice.Status.valueOf("PAID"));

        return invoiceRepository.save(invoice);
    }

    @Scheduled(fixedDelay = 5000000)
    @Transactional /// it was needed because a Subscription entity added to an Invoice was detached from the JPA persistence context, because of the Scheduled annotation which is not iinherently transactional
    public void checkForNewInvoices() throws IOException, MessagingException {
        Map<String, Long> mapInvoice = new HashMap<>(invoiceInfoRepository.readMapInvoice());
        List<Invoice> listI = new ArrayList<>();

        File folder = new File("src/main/resources/invoices");
        File[] files = folder.listFiles();

        if (files == null) {
            return;
        }

        HashMap<String, Long> currentFileNamesWithCreation = new HashMap<>();
        for (File file : files) {

            String fileName = file.getName();
            Long fileCreated = Files.readAttributes(file.toPath(), BasicFileAttributes.class).creationTime().toMillis();
            currentFileNamesWithCreation.put(fileName, fileCreated);
            if (!mapInvoice.containsKey(fileName) || !Objects.equals(currentFileNamesWithCreation.get(fileName), mapInvoice.get(fileName))) {
                System.out.println("Processing file: " + fileName);

                listI = invoiceCsvParser.parse(file.toPath());

                for (Invoice invoice : listI) {
                    Optional<Invoice> existingInvoiceOpt = invoiceRepository.getInvoiceByIdFromProviderAndClientId(
                            invoice.getIdFromProvider(), invoice.getClientId()
                    );

                    if (existingInvoiceOpt.isPresent()) {
                        Invoice existingInvoice = existingInvoiceOpt.get();
                        existingInvoice.setClientName(invoice.getClientName());
                        existingInvoice.setClientAddress(invoice.getClientAddress());
                        existingInvoice.setAmount(invoice.getAmount());
                        existingInvoice.setIssueDate(invoice.getIssueDate());
                        existingInvoice.setDueDate(invoice.getDueDate());
                        existingInvoice.setPeriod(invoice.getPeriod());
                        existingInvoice.setStatus(invoice.getStatus());
                        invoiceRepository.save(existingInvoice);
                    } else {
                        invoiceRepository.save(invoice);
                        emailService.sendInvoiceEmail(invoice.getSubscription().getConsumer().getUser().getEmail(), "Invoice", "This is an Invoice", generatePDF(invoice.getInvoiceId()));
                    }
                }
            }
        }

        mapInvoice.clear();
        mapInvoice.putAll(currentFileNamesWithCreation);
        invoiceInfoRepository.uploadMapInvoice(mapInvoice);
    }

    public byte[] generatePDF(Integer invoiceId) throws IOException {
        Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow(() -> new IllegalArgumentException(String.format("Invoice with ID %s doesn't exist", invoiceId)));

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, baos);
        document.open();

        Font title = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
        Font bold = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
        Font small = FontFactory.getFont(FontFactory.HELVETICA, 8);
        Font medium = FontFactory.getFont(FontFactory.HELVETICA, 12);
        Font normal = FontFactory.getFont(FontFactory.HELVETICA, 10);

        Font tableFont = FontFactory.getFont("Helvetica", 8, Font.BOLD, Color.BLACK);
        float padding = 0f;
        Rectangle border = new Rectangle(0f, 0f);
        Font font = FontFactory.getFont("Helvetica", 10);
        Paragraph p;

        border = new Rectangle(0f, 0f);
        border.setBorderWidthLeft(0f);
        border.setBorderWidthBottom(0f);
        border.setBorderWidthRight(0f);
        border.setBorderWidthTop(0f);
        border.setBorderColor(Color.BLACK);

        document.newPage();

        // page 2
        Image img = Image.getInstance("src/main/resources/{}.png".replace("{}", invoice.getSubscription().getContractId().toString()));
        img.setAlignment(Image.ALIGN_RIGHT);
        document.add(Chunk.NEWLINE);
        document.add(img);
        p = new Paragraph(invoice.getSubscription().getProvider().getCompanyName(), title);
        p.setAlignment(Element.ALIGN_LEFT);
        document.add(p);
        document.add(Chunk.NEWLINE);
        p = new Paragraph("INVOICE " + invoice.getSubscription().getProvider().getType().toString().toLowerCase() + " services");
        document.add(p);
        p = new Paragraph("Issue date: " + invoice.getIssueDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")), medium);
        document.add(p);
        p = new Paragraph("Invoice #" + invoice.getIdFromProvider(), medium);
        document.add(p);
        document.add(Chunk.NEWLINE);

        p = new Paragraph("Contact: ", bold);
        document.add(p);

        PdfPTable table = null;
        PdfPCell cell = null;
        table = new PdfPTable(3);
        table.setWidthPercentage(100f);
        cell = new PdfPCell(new Paragraph(invoice.getProviderInfo(), small));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("", normal));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("", medium));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("", normal));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        cell.setFixedHeight(18f);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("", normal));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("", normal));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("Client Id: " + invoice.getClientId().toString(), medium));
        border.setBorderColor(new RGBColor(232, 232, 232));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        cell.setBackgroundColor(new RGBColor(232, 232, 232));
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("", normal));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("Client name: " + invoice.getClientName(), medium));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("\nContract Id: " + invoice.getSubscription().getContractId(), medium));
        border.setBorderColor(new RGBColor(232, 232, 232));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        cell.setBackgroundColor(new RGBColor(232, 232, 232));
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("", normal));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        cell = new PdfPCell(new Paragraph("\nClient address: \n" + invoice.getClientAddress(), medium));
        cell.cloneNonPositionParameters(border);
        cell.setUseBorderPadding(true);
        table.addCell(cell);

        document.add(table);

        document.add(Chunk.NEWLINE);

        table = new PdfPTable(3);
        table.setWidthPercentage(100f);
        cell = new PdfPCell(new Paragraph(""));
        cell.setBorder(Rectangle.BOTTOM);
        cell.setBorderWidth(4f);
        cell.setColspan(3);
        cell.setPhrase(new Phrase(""));
        table.addCell(cell);
        document.add(table);

        document.add(Chunk.NEWLINE);

        table = new PdfPTable(5);
        table.setWidthPercentage(100f);

        if (invoice.getSubscription().getProvider().getType().equals(Provider.Type.GAS) || invoice.getSubscription().getProvider().getType().equals(Provider.Type.ELECTRICITY)) {
            cell = new PdfPCell(new Paragraph("Total consumption: \n\n" + invoice.getKwHConsumed() + " kwH", medium));
            border.setBorderColor(new RGBColor(232, 232, 232));
            cell.cloneNonPositionParameters(border);
            cell.setUseBorderPadding(true);
            cell.setBackgroundColor(new RGBColor(232, 232, 232));
            table.addCell(cell);

            cell = new PdfPCell(new Paragraph("", normal));
            cell.cloneNonPositionParameters(border);
            cell.setUseBorderPadding(true);
            table.addCell(cell);

            cell = new PdfPCell(new Paragraph("Total amount including taxes: \n\n" + invoice.getAmount() + " RON", medium));
            border.setBorderColor(new RGBColor(232, 232, 232));
            cell.cloneNonPositionParameters(border);
            cell.setUseBorderPadding(true);
            cell.setBackgroundColor(new RGBColor(232, 232, 232));
            table.addCell(cell);

            cell = new PdfPCell(new Paragraph("", normal));
            cell.cloneNonPositionParameters(border);
            cell.setUseBorderPadding(true);
            table.addCell(cell);

            cell = new PdfPCell(new Paragraph("Due date: \n\n" + invoice.getDueDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")), medium));
            border.setBorderColor(new RGBColor(232, 232, 232));
            cell.cloneNonPositionParameters(border);
            cell.setUseBorderPadding(true);
            cell.setBackgroundColor(new RGBColor(232, 232, 232));
            table.addCell(cell);
        } else {
            cell = new PdfPCell(new Paragraph("", normal));
            cell.cloneNonPositionParameters(border);
            table.addCell(cell);

            cell = new PdfPCell(new Paragraph("Total amount including taxes: \n\n" + invoice.getAmount() + " RON", medium));
            border.setBorderColor(new RGBColor(232, 232, 232));
            cell.cloneNonPositionParameters(border);
            cell.setUseBorderPadding(true);
            cell.setBackgroundColor(new RGBColor(232, 232, 232));
            table.addCell(cell);

            cell = new PdfPCell(new Paragraph("", normal));
            cell.cloneNonPositionParameters(border);
            table.addCell(cell);

            cell = new PdfPCell(new Paragraph("Due date: \n\n" + invoice.getDueDate().format(DateTimeFormatter.ofPattern("dd.MM.yyyy")), medium));
            border.setBorderColor(new RGBColor(232, 232, 232));
            cell.cloneNonPositionParameters(border);
            cell.setUseBorderPadding(true);
            cell.setBackgroundColor(new RGBColor(232, 232, 232));
            table.addCell(cell);

            cell = new PdfPCell(new Paragraph("", normal));
            cell.cloneNonPositionParameters(border);
            table.addCell(cell);
        }
        document.add(table);

        document.add(Chunk.NEWLINE);

        table = new PdfPTable(3);
        table.setWidthPercentage(100f);
        cell = new PdfPCell(new Paragraph(""));
        cell.setBorder(Rectangle.BOTTOM);
        cell.setBorderWidth(4f);
        cell.setColspan(3);
        cell.setPhrase(new Phrase(""));
        table.addCell(cell);
        document.add(table);

        document.add(Chunk.NEWLINE);
        document.add(Chunk.NEWLINE);

        p = new Paragraph("Barcode for current invoice: " + invoice.getAmount() + " RON", small);
        document.add(p);
        img = Image.getInstance("src/main/resources/barcode.png");
        img.setAlignment(Image.ALIGN_LEFT);
        document.add(img);

        document.close();

        return baos.toByteArray();
    }
}
