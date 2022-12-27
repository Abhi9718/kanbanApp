package com.example.kanbanapplication.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.BAD_REQUEST, reason="User Already Exist")
public class UserAlreadyExistException extends Exception {

}
