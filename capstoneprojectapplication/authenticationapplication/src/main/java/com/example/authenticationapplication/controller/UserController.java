package com.example.authenticationapplication.controller;

import com.example.authenticationapplication.domain.User;
import com.example.authenticationapplication.exceptions.UserAlreadyExistException;
import com.example.authenticationapplication.exceptions.UserNotFoundException;
import com.example.authenticationapplication.repository.UserRepository;
import com.example.authenticationapplication.service.SecurityTokenGenerator;
import com.example.authenticationapplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/authentication-app/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityTokenGenerator securityTokenGenerator;

    @Autowired
    private UserRepository userRepository;

    // http://localhost:5555/authentication-app/auth/register

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistException {
        try {
            if(userRepository.existsById(user.getUserEmailID())) {
            }
            else {
                return new ResponseEntity<>(userService.addUser(user) , HttpStatus.OK);
            }
        }
        catch (UserAlreadyExistException uee) {
            throw new UserAlreadyExistException();
        }
        return new ResponseEntity<>("Account Already Registered with this EmailID Try to Login." , HttpStatus.CONFLICT);
    }

    // http://localhost:5555/authentication-app/auth/authenticate-user

    @PostMapping("/authenticate-user")
    public ResponseEntity<?> loginCheck(@RequestBody User user) throws UserNotFoundException {
        try {
            if (userRepository.existsById(user.getUserEmailID())){
                User result = userService.checkUser(user.getUserEmailID() , user.getUserPassword());
                if(result!=null) {
                    Map<String , String> key = securityTokenGenerator.generateToken(result);
                    return new ResponseEntity<>(key , HttpStatus.OK);
                }
                else {
                    return new ResponseEntity<>("Authentication Failed Please Check Your Password & try Again." , HttpStatus.NOT_FOUND);
                }
            }
            else {
                return new ResponseEntity<>("Please Register with this EmailID and Try to Login." , HttpStatus.OK);
            }
        }
        catch (UserNotFoundException une) {
            throw new UserNotFoundException();
        }
    }
}
