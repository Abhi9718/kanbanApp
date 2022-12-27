package com.example.kanbanapplication.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Column {

    private String columnName;
    List<String> category; // TO-DO,IN-PROGRESS,COMPLETED
    List<Card> cardList;
    Date date;
    TaskPriority taskPriority;
    List<String> listOfUsers;
}
