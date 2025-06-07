package com.unitbv.in_pay;

import com.unitbv.in_pay.repositories.ClientInfoRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class InPayApplication {

	public static void main(String[] args) {
		SpringApplication.run(InPayApplication.class, args);
	}
	/// Stocare in baza de date a csv-urilor care se salveaza in folder, dar a denumirii, si a creationtime


}
