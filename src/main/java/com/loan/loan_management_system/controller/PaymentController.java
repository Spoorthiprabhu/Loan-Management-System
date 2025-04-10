package com.loan.loan_management_system.controller;

import com.loan.loan_management_system.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private LoanService loanService;
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/update")
    
    public ResponseEntity<String> updatePaymentStatus(
            @RequestParam Long loanId,
            @RequestParam double amount,
            @RequestParam String orderId
    ) {
    	System.out.println("loanId = " + loanId);
    	System.out.println("amount = " + amount);
    	System.out.println("orderId = " + orderId);

        boolean success = loanService.updatePaymentStatus(loanId, amount, orderId);

        if (success) {
            return ResponseEntity.ok("Payment recorded and loan status updated.");
        } else {
            return ResponseEntity.badRequest().body("Loan not found or error in payment processing.");
        }
    }
}
