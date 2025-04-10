package com.loan.loan_management_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class LoanManagementSystemApplication {

    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(LoanManagementSystemApplication.class, args);
    }

   


}
