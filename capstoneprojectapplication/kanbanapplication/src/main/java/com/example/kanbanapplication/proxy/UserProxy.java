package com.example.kanbanapplication.proxy;

import com.example.kanbanapplication.domain.User;
import com.example.kanbanapplication.domain.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "Authentication-Service" , url = "localhost:9300")
public interface UserProxy {

    @PostMapping("/authentication-app/auth/register")
    public ResponseEntity<?> sendUserObjectToAuthApp(@RequestBody User user);

}
