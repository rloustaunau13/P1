package com.example.reimbursement.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example")
@EntityScan(basePackages = "com.example.model")  // Adjust package to where your User class is
@EnableJpaRepositories(basePackages = "com.example.repository")

public class ReimbursementAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReimbursementAppApplication.class, args);
    }

}
