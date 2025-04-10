
package com.loan.loan_management_system.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class LoanApplicationRequest {
    private BigDecimal amount;
    private int tenure; // in months
    private String purpose;
    private String username; // to identify the applicant
    
    private String fullName;
    private String address;
    private String pan;
    private Double annualIncome;
}
