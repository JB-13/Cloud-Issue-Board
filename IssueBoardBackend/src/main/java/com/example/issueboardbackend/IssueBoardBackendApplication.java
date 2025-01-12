package com.example.issueboardbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages = "com.example.issueboardbackend")
@EnableJpaRepositories(basePackages = "com.example.issueboardbackend.model.dbaccess.repos")
public class IssueBoardBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(IssueBoardBackendApplication.class, args);
    }

}
