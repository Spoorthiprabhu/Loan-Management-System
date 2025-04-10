package com.loan.loan_management_system.dto;

public class InterestCalculationResponse {
    private double interestAmount;
    private double totalPayable;

    // Constructor
    public InterestCalculationResponse(double interestAmount, double totalPayable) {
        this.interestAmount = interestAmount;
        this.totalPayable = totalPayable;
    }

    // Getters and Setters
    public double getInterestAmount() {
        return interestAmount;
    }

    public void setInterestAmount(double interestAmount) {
        this.interestAmount = interestAmount;
    }

    public double getTotalPayable() {
        return totalPayable;
    }

    public void setTotalPayable(double totalPayable) {
        this.totalPayable = totalPayable;
    }
}
