
package com.loan.loan_management_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "loan_applications")
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Double amount;
    private Integer term; // in months
    @Column
    private Double interestRate;  // e.g., 10.5%

    @Column
    private Double totalInterest;  // Optional: store calculated interest amount
//    private Double interestRate;

    
    @Column(nullable = false)
    private String status = "PENDING";


    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "full_name")
    private String fullName;

    private String address;
    private String pan;

    @Column(name = "annual_income")
    private Double annualIncome;
    
    private Double emiAmount;
    private LocalDate repaymentStartDate;
    private LocalDate repaymentEndDate;
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }


    
   

}
