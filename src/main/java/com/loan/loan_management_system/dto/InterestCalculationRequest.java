package com.loan.loan_management_system.dto;

public class InterestCalculationRequest {
    private double loanAmount;
    private int tenure; // In months
    private double interestRate; // Annual Interest Rate

    // Constructor
    public InterestCalculationRequest(double loanAmount, int tenure, double interestRate) {
        this.loanAmount = loanAmount;
        this.tenure = tenure;
        this.interestRate = interestRate;
    }

    // Getters and Setters
    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public int getTenure() {
        return tenure;
    }

    public void setTenure(int tenure) {
        this.tenure = tenure;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }
}
