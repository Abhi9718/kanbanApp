package com.example.kanbanapplication.service;

import com.example.kanbanapplication.domain.Card;
import com.example.kanbanapplication.domain.CommonUser;
import com.example.kanbanapplication.domain.User;
import com.example.kanbanapplication.exceptions.UserAlreadyExistException;
import com.example.kanbanapplication.exceptions.UserNotFoundException;

import java.util.List;
import java.util.Optional;

public interface KanbanService {

    public abstract List<User> getAllUsers();
    public abstract Optional<User> searchTaskByUser(String EmailID , String projectName , Card taskCard) throws UserNotFoundException;
    public abstract Optional<User> getUserDetails(String EmailID) throws UserNotFoundException;
    public abstract User saveUser(User user) throws UserAlreadyExistException;
    public abstract User updateExistingUser(User user) throws UserNotFoundException;

}
