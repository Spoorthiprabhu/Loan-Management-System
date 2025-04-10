package com.loan.loan_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.loan.loan_management_system.entity.LoanApplication;
import com.loan.loan_management_system.entity.RepaymentSchedule;




@Repository
@EnableJpaRepositories
public interface RepaymentScheduleRepository extends JpaRepository<RepaymentSchedule, Long> {
    List<RepaymentSchedule> findByLoanId(Long loanId);
    
    List<RepaymentSchedule> findByLoan(LoanApplication loan);

}
