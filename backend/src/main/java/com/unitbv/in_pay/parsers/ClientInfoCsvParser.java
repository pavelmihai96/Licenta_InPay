package com.unitbv.in_pay.parsers;

import com.unitbv.in_pay.entities.Invoice;
import com.unitbv.in_pay.entities.Subscription;
import com.unitbv.in_pay.mappers.ClientInfo;
import org.springframework.stereotype.Component;
import com.opencsv.CSVReader;

import java.io.FileReader;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class ClientInfoCsvParser implements CsvParser<ClientInfo> {
    @Override
    public List<ClientInfo> parse(Path file) {
        List<ClientInfo> clients = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new FileReader(file.toFile()))) {
            String[] line;
            reader.readNext();
            while ((line = reader.readNext()) != null) {
                try {
                    ClientInfo p = new ClientInfo();
                    p.setClientId(Integer.parseInt(line[0]));
                    p.setId(getIdFromFilename(file.getFileName().toString()));
                    p.setEmail(line[1]);
                    p.setName(line[2]);
                    p.setType(line[3]);
                    clients.add(p);
                } catch (NumberFormatException ex) {
                    System.out.println(ex);
                    System.err.println("From clientinfo: " + String.join(",", line));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return clients;
    }

    private Integer getIdFromFilename(String file) {
        String id = file.replaceAll("^([^-]+)-.*", "$1");
        return Integer.parseInt(id);
    }
}
