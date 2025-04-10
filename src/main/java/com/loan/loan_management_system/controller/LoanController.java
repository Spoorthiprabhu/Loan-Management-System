
package com.loan.loan_management_system.controller;

import com.loan.loan_management_system.dto.InterestCalculationRequest;
import com.loan.loan_management_system.dto.InterestCalculationResponse;
import com.loan.loan_management_system.dto.LoanApplicationRequest;
import com.loan.loan_management_system.dto.LoanApplicationResponse;
import com.loan.loan_management_system.dto.PaymentRequest;
import com.loan.loan_management_system.service.LoanService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import com.loan.loan_management_system.entity.Loan;
import com.loan.loan_management_system.entity.LoanApplication;
import com.loan.loan_management_system.entity.RepaymentSchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/loans")
@CrossOrigin
public class LoanController {

    @Autowired
    private LoanService loanService;

    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/apply")
    public ResponseEntity<LoanApplicationResponse> applyLoan(@RequestBody LoanApplicationRequest request) {
        LoanApplicationResponse response = loanService.applyLoan(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<LoanApplication>> getAllLoans() {
        return ResponseEntity.ok(loanService.getAllApplications());
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<String> updateStatus(
            @PathVariable Integer id,
            @RequestParam String status) {
        String result = loanService.updatedLoanStatus(id, status);
        return ResponseEntity.ok(result);
    }
    
   
    @GetMapping("/repayment/{loanId}")
    public ResponseEntity<List<RepaymentSchedule>> getRepaymentSchedule(@PathVariable Integer loanId) {
        List<RepaymentSchedule> schedule = loanService.getRepaymentScheduleByLoanId(loanId);
        return ResponseEntity.ok(schedule);
    }
    
    @PutMapping("/repayment/mark-paid/{scheduleId}")
    public ResponseEntity<String> markRepaymentAsPaid(@PathVariable Long scheduleId) {
        String result = loanService.markRepaymentAsPaid(scheduleId);
        return ResponseEntity.ok(result);
    }
    
    

    @PostMapping("/calculate-interest")
    public InterestCalculationResponse calculateInterest(@RequestBody InterestCalculationRequest request) {
        // Validate inputs
        if (request.getLoanAmount() <= 0 || request.getTenure() <= 0 || request.getInterestRate() <= 0) {
            throw new IllegalArgumentException("Loan amount, tenure, and interest rate must be greater than zero.");
        }

        double interestAmount = loanService.calculateInterest(request.getLoanAmount(), request.getTenure(), request.getInterestRate());
        double totalPayable = loanService.calculateTotalPayable(request.getLoanAmount(), interestAmount);

        return new InterestCalculationResponse(interestAmount, totalPayable);
    }
    
    @PreAuthorize("hasRole('ADMIN2')")
    @GetMapping("/pending-approval")
    public ResponseEntity<List<LoanApplication>> getPendingLoans() {
        List<LoanApplication> pendingLoans = loanService.getPendingLoans(); // Adjusted to use LoanApplication
        return ResponseEntity.ok(pendingLoans); // Return LoanApplication, not Loan
    }


    @PreAuthorize("hasRole('ADMIN2')")
    @PutMapping("/{id}/approve")
    public String approveLoan(@PathVariable Integer id) {  // Changed Long to Integer
        boolean isApproved = loanService.approveLoan(id);   // Pass Integer ID to service
        if (isApproved) {
            return "Loan approved successfully!";
        }
        return "Error in approving loan!";
    }
    
    @PreAuthorize("hasRole('ADMIN2')")
    @PutMapping("/{id}/reject")
    public String rejectLoan(@PathVariable Integer id) {   // Changed Long to Integer
        boolean isRejected = loanService.rejectLoan(id);    // Pass Integer ID to service
        if (isRejected) {
            return "Loan rejected successfully!";
        }
        return "Error in rejecting loan!";
    }
    
    @PostMapping("/upload-document/{userId}")
    public ResponseEntity<String> uploadDocument(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        System.out.println("Received file: " + file.getOriginalFilename() + " for user ID: " + userId);
        
        // TODO: Save file logic here (if needed)

        return ResponseEntity.ok("File uploaded successfully for user ID: " + userId);
    }
    
    @GetMapping("/pending")
    public List<LoanApplication> getPendingApplications() {
        return loanService.getPendingLoans();
    }


   
    @PostMapping("/api/loans/payment/process")
    public ResponseEntity<String> processPaypalPayment(@RequestBody PaymentRequest request) {
        System.out.println("Loan ID: " + request.getLoanId());
        System.out.println("Amount: " + request.getAmount());
        System.out.println("PayPal Order ID: " + request.getOrderId());
        System.out.println("Payer Email: " + request.getPayerEmail());

        // TODO: Verify order via PayPal API using orderId and client credentials
        // TODO: Save transaction to database

        return ResponseEntity.ok("Payment verified and recorded successfully.");
    }

    








}
