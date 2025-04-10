package com.loan.loan_management_system.service;

import com.loan.loan_management_system.entity.Document;
import com.loan.loan_management_system.entity.LoanApplication;
import com.loan.loan_management_system.repository.DocumentRepository;
import com.loan.loan_management_system.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepo;

    @Autowired
    private LoanApplicationRepository loanRepo;

    public String uploadDocument(Integer loanId, MultipartFile file) {
        Optional<LoanApplication> loanOpt = loanRepo.findById(loanId);
        if (loanOpt.isEmpty()) {
            return "Loan application not found!";
        }

        try {
            Document doc = new Document();
            doc.setLoanApplication(loanOpt.get());
            doc.setFileName(file.getOriginalFilename());
            doc.setFileType(file.getContentType());

            doc.setData(file.getBytes());
            doc.setUploadedAt(LocalDateTime.now());

            documentRepo.save(doc);
            return "Document uploaded successfully!";
        } catch (IOException e) {
            return "Error uploading document: " + e.getMessage();
        }
    }
}
