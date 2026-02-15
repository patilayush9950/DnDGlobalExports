package com.eximroyals.dto;

import lombok.Data;

@Data
public class EnquiryRequest {
    private String firstName;
    private String lastName;
    private String country;
    private String email;
    private String message;
    private Long productId;
}
