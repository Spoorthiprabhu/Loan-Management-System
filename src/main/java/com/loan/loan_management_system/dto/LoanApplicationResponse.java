package com.loan.loan_management_system.dto;

public class LoanApplicationResponse {

    private String message;
    private boolean success;

    // ✅ Constructor you need
    public LoanApplicationResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    // ✅ Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
