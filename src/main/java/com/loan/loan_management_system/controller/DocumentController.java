package com.loan.loan_management_system.controller;

import com.loan.loan_management_system.entity.Document;
import com.loan.loan_management_system.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/documents")


public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload/{userId}")
    public ResponseEntity<String> uploadDocument(
            @PathVariable Integer userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String message = documentService.uploadDocument(userId,file);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Document upload failed!");
        }
    }
}
