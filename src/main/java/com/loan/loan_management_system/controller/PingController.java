
package com.loan.loan_management_system.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class PingController {

    @GetMapping("/")
    public String home() {
        return "Loan Management System Backend is running!";
    }

    @GetMapping("/ping")
    public String ping() {
        return "Server is up!";
    }
    
   
}
