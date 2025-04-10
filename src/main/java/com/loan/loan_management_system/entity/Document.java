package com.loan.loan_management_system.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fileName;
    private String fileType;
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime uploadedAt;


    @Lob
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private LoanApplication loanApplication;
}
