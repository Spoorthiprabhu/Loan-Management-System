package com.loan.loan_management_system.service;

import com.loan.loan_management_system.dto.LoanApplicationRequest;
import org.springframework.stereotype.Service;
import com.loan.loan_management_system.dto.LoanApplicationResponse;
import com.loan.loan_management_system.entity.LoanApplication;
import com.loan.loan_management_system.entity.Payment;
import com.loan.loan_management_system.entity.RepaymentSchedule;
import com.loan.loan_management_system.entity.User;
import com.loan.loan_management_system.repository.LoanApplicationRepository;
import com.loan.loan_management_system.repository.PaymentRepository;
import com.loan.loan_management_system.repository.RepaymentScheduleRepository;
import com.loan.loan_management_system.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanApplicationRepository loanRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RepaymentScheduleRepository repaymentScheduleRepository;

    public LoanApplicationResponse applyLoan(LoanApplicationRequest request) {
        Optional<User> userOpt = userRepo.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            return new LoanApplicationResponse("User not found!", false);
        }

        User user = userOpt.get();

        LoanApplication loan = new LoanApplication();
        loan.setAmount(request.getAmount().doubleValue());
        loan.setTerm(request.getTenure());
        loan.setStatus("PENDING");
        loan.setCreatedAt(LocalDateTime.now());
        loan.setUser(user);
        loan.setFullName(request.getFullName());
        loan.setAddress(request.getAddress());
        loan.setPan(request.getPan());
        loan.setAnnualIncome(request.getAnnualIncome());

        // ✅ Interest Calculation
        double rate = 10.5;
        double principal = request.getAmount().doubleValue();
        int time = request.getTenure();
        double timeInYears = time / 12.0;

        double interest = (principal * rate * timeInYears) / 100;
        loan.setInterestRate(rate);
        loan.setTotalInterest(interest);

        loanRepo.save(loan);
        return new LoanApplicationResponse("Loan application submitted successfully!", true);
    }

    public List<LoanApplication> getAllApplications() {
        return loanRepo.findAll();
    }

    public void generateRepaymentSchedule(LoanApplication loan) {
        int termMonths = loan.getTerm();
        double monthlyInstallment = loan.getEmiAmount();
        LocalDate startDate = LocalDate.now();
        List<RepaymentSchedule> scheduleList = new ArrayList<>();

        for (int i = 0; i < termMonths; i++) {
            RepaymentSchedule schedule = new RepaymentSchedule();
            schedule.setDueDate(startDate.plusMonths(i));
            schedule.setAmount(monthlyInstallment);
            schedule.setPaid(false);
            schedule.setLoan(loan);
            scheduleList.add(schedule);
        }

        repaymentScheduleRepository.saveAll(scheduleList);
    }

    public void calculateEMI(LoanApplication loan) {
        double principal = loan.getAmount();
        int term = loan.getTerm();
        double annualInterestRate = loan.getInterestRate() != null ? loan.getInterestRate() : 10.5;

        double monthlyRate = annualInterestRate / 12 / 100;
        double emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
                     (Math.pow(1 + monthlyRate, term) - 1);

        loan.setInterestRate(annualInterestRate); // ensure it's set
        loan.setEmiAmount(emi);
        loan.setRepaymentStartDate(LocalDate.now());
        loan.setRepaymentEndDate(LocalDate.now().plusMonths(term));
    }

    public String updatedLoanStatus(Integer loanId, String status) {
        Optional<LoanApplication> optionalLoan = loanRepo.findById(loanId);

        if (optionalLoan.isPresent()) {
            LoanApplication loan = optionalLoan.get();
            loan.setStatus(status.toUpperCase());

            if ("APPROVED".equalsIgnoreCase(status)) {
                if (loan.getInterestRate() == null) {
                    loan.setInterestRate(10.5); // default fallback
                }
                calculateEMI(loan);
                generateRepaymentSchedule(loan);
            }

            loanRepo.save(loan);
            return "Loan status updated to " + status.toUpperCase();
        } else {
            throw new RuntimeException("Loan not found with ID: " + loanId);
        }
    }

    public List<RepaymentSchedule> getRepaymentScheduleByLoanId(Integer loanId) {
        Optional<LoanApplication> loanOpt = loanRepo.findById(loanId);
        if (loanOpt.isEmpty()) {
            throw new RuntimeException("Loan not found with ID: " + loanId);
        }
        return repaymentScheduleRepository.findByLoan(loanOpt.get());
    }
    
    @Transactional
    public String markRepaymentAsPaid(Long scheduleId) {
        Optional<RepaymentSchedule> scheduleOpt = repaymentScheduleRepository.findById(scheduleId);
        if (scheduleOpt.isEmpty()) {
            return "Repayment schedule not found!";
        }

        RepaymentSchedule schedule = scheduleOpt.get();
        if (schedule.isPaid()) {
            return "Already marked as paid!";
        }

        schedule.setPaid(true);
        repaymentScheduleRepository.save(schedule);
        return "Repayment marked as paid successfully.";
    }
    
    public double calculateInterest(double loanAmount, int tenure, double interestRate) {
        // Calculate interest based on the formula
        double interestAmount = (loanAmount * interestRate * tenure) / 100;
        return interestAmount;
    }

    public double calculateTotalPayable(double loanAmount, double interestAmount) {
        return loanAmount + interestAmount;
    }
    
    public List<LoanApplication> getPendingLoans() {
        return loanRepo.findByStatus("PENDING");  // Correctly using LoanApplication instead of Loan
    }

    // Approve loan
    @Transactional
    public boolean approveLoan(Integer loanId) {
        LoanApplication loan = loanRepo.findById(loanId).orElse(null);  // Changed Loan to LoanApplication
        if (loan != null && "PENDING".equals(loan.getStatus())) {
            loan.setStatus("APPROVED");
            loanRepo.save(loan);
            return true;
        }
        return false;
    }

    // Reject loan
    @Transactional
    public boolean rejectLoan(Integer loanId) {
        LoanApplication loan = loanRepo.findById(loanId).orElse(null);  // Changed Loan to LoanApplication
        if (loan != null && "PENDING".equals(loan.getStatus())) {
            loan.setStatus("REJECTED");
            loanRepo.save(loan);
            return true;
        }
        return false;
    }
    
    
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public boolean updatePaymentStatus(Long loanId, double amount, String orderId) {
        try {
            System.out.println("Received payment for Loan ID: " + loanId + ", Amount: " + amount + ", Order ID: " + orderId);
            Integer id = loanId.intValue();
            Optional<LoanApplication> loanOptional = loanApplicationRepository.findById(id);

            if (loanOptional.isPresent()) {
                LoanApplication loan = loanOptional.get();

                Payment payment = new Payment();
                payment.setLoanApplication(loan);
                payment.setAmount(amount);
                payment.setOrderId(orderId);
                payment.setPaymentDate(LocalDateTime.now());
                payment.setStatus("PAID");

                paymentRepository.save(payment);
                return true;
            } else {
                System.out.println("Loan not found for ID: " + loanId);
            }
        } catch (Exception e) {
            System.out.println("Exception while updating payment: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }




    
}

