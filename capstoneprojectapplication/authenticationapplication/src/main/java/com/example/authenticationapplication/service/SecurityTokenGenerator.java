package com.example.authenticationapplication.service;

import com.example.authenticationapplication.domain.User;

import java.util.Map;

public interface SecurityTokenGenerator {
    public abstract Map<String , String> generateToken(User user);
}
