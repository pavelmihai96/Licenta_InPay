package com.unitbv.in_pay.parsers;

import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.util.List;

@Component
public interface CsvParser<T> {
    List<T> parse(Path file);
}
