package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Invoice;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.mappers.ClientInfo;
import com.unitbv.in_pay.parsers.ClientInfoCsvParser;
import com.unitbv.in_pay.parsers.CsvParser;
import com.unitbv.in_pay.parsers.InvoiceCsvParser;
import com.unitbv.in_pay.request.ClientInfoRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository
public class ClientInfoRepository implements CsvRepository<ClientInfo> {
    private final CsvParser<ClientInfo> parser;
    private final InvoiceCsvParser invoiceCsvParser;
    private final Path folder;

    public ClientInfoRepository(CsvParser<ClientInfo> parser, @Value("${csv.folder.path}") String folderPath, InvoiceCsvParser invoiceCsvParser) {
        this.parser = parser;
        this.folder = Path.of(folderPath);
        this.invoiceCsvParser = invoiceCsvParser;
    }

    @Override
    public List<ClientInfo> loadClientInfoByProviderId(Integer contractId) {
        List<ClientInfo> clients = new ArrayList<>();

        try (Stream<Path> paths = Files.walk(folder)) {
            paths.filter(Files::isRegularFile)
                    .filter(p -> p.toString().contains(contractId.toString()))
                    .filter(p -> p.toString().endsWith(".csv"))
                    .forEach(p -> clients.addAll(parser.parse(p)));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return clients;
    }

    public String checkClientInfo(Integer contractId, ClientInfoRequest request) {
        List<ClientInfo> clients = new ArrayList<>();

        try (Stream<Path> paths = Files.walk(folder)) {
            paths.filter(Files::isRegularFile)
                    .filter(p -> p.toString().contains(contractId.toString()))
                    .filter(p -> p.toString().contains("clients"))
                    .forEach(p -> clients.addAll(parser.parse(p)));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return clients.stream()
                .filter(c -> c.getClientId().equals(request.getClientId()) && c.getEmail().equals(request.getEmail()))
                .collect(Collectors.toList()).isEmpty() ? "NOT OK" : "OK";

    }
}
