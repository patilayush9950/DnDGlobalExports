package com.eximroyals.controller;

import com.eximroyals.model.Enquiry;
import com.eximroyals.dto.EnquiryRequest;
import com.eximroyals.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {
    @Autowired
    EnquiryService enquiryService;

    @PostMapping
    public ResponseEntity<Enquiry> submitEnquiry(@RequestBody EnquiryRequest request) {

        Enquiry enquiry = new Enquiry(
                request.getFirstName(),
                request.getLastName(),
                request.getCountry(),
                request.getEmail(),
                request.getMessage(),
                null);
        return ResponseEntity.ok(enquiryService.createEnquiry(enquiry, request.getProductId()));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<Enquiry> getAllEnquiries() {
        return enquiryService.getAllEnquiries();
    }
}
