package com.unitbv.in_pay.repositories;

import com.unitbv.in_pay.entities.Consumer;
import com.unitbv.in_pay.entities.Provider;
import com.unitbv.in_pay.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Integer> {
    boolean existsByCompanyNameAndServiceAreaAndFacilityNameAndType(String c, String s, String f, Provider.Type p);

    boolean existsByContractId(Integer contractId);

    Provider getProviderByContractId(Integer contractId);

    /*
    @Query("select p from Provider p where p.user.userId = ?1")
    Provider findProviderByUserId(Integer userId);

     */
}
