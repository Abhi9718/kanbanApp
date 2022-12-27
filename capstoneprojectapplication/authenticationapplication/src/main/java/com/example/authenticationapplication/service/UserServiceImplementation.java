package com.example.authenticationapplication.service;

import com.example.authenticationapplication.domain.User;
import com.example.authenticationapplication.exceptions.UserAlreadyExistException;
import com.example.authenticationapplication.exceptions.UserNotFoundException;
import com.example.authenticationapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User checkUser(String userEmailID, String userPassword) throws UserNotFoundException {
        if (userRepository.findById(userEmailID).isPresent()) {
            User result = userRepository.findById(userEmailID).get();
            if(result.getUserPassword().equals(userPassword)){
                result.setUserPassword("");
                return result;
            }
            else {
                return null;
            }
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public User addUser(User user) throws UserAlreadyExistException {
        if (userRepository.findById(user.getUserEmailID()).isPresent()) {
            throw new UserAlreadyExistException();
        }
        else {
            userRepository.save(user);
        }
        return user;
    }

}
