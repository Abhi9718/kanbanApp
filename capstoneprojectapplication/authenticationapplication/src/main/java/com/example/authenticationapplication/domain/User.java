package com.example.authenticationapplication.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "userauthentication")
public class User {

    @Id
    @Column(name = "email_id" , nullable = false , unique = true)
    private String userEmailID;

    @Column(name = "user_name" , nullable = false)
    private String userName;

    @Column(name = "user_password" , nullable = false)
    private String userPassword;

    @Column(name = "user_address" , nullable = false)
    private String address;

    @Column(name = "user_mobile" , nullable = false)
    private String mobileNo;

}
