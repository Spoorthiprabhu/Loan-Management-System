
package com.loan.loan_management_system.repository;

import com.loan.loan_management_system.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface DocumentRepository extends JpaRepository<Document, Integer> {
}
