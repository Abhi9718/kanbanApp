package com.example.kanbanapplication.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class User {

    @Id
    private String userEmailID;

    private String userName;
    private String mobileNo;
    private String address;
    private String userPassword;
    List<Column> columnList;

}
