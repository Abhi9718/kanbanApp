package com.example.kanbanapplication.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommonUser {

    private String userEmailID;
    private String userName;
    private String userPassword;
    private String address;
    private String mobileNo;
}
