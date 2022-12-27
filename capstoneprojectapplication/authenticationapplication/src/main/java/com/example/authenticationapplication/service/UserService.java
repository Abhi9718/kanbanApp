package com.example.authenticationapplication.service;

import com.example.authenticationapplication.domain.User;
import com.example.authenticationapplication.exceptions.UserAlreadyExistException;
import com.example.authenticationapplication.exceptions.UserNotFoundException;

public interface UserService {

    public abstract User addUser(User user) throws UserAlreadyExistException;
    public abstract User checkUser(String userEmailID , String userPassword) throws UserNotFoundException;

}
