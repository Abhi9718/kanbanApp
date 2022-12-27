package com.example.kanbanapplication.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Card {

    private String cardName;
    private String cardAssignee;
    private String description;
    private String category;
    private TaskPriority taskPriority;
}
