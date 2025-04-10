package com.loan.loan_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.loan.loan_management_system.entity.Payment;

@Repository
@EnableJpaRepositories
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}

