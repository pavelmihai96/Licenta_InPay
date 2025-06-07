package com.unitbv.in_pay.repositories;

import java.util.List;

public interface CsvRepository<T> {
    List<T> loadClientInfoByProviderId(Integer id);
}
