package com.example.kanbanapplication.controller;

import com.example.kanbanapplication.domain.CommonUser;
import com.example.kanbanapplication.domain.User;
import com.example.kanbanapplication.exceptions.UserAlreadyExistException;
import com.example.kanbanapplication.exceptions.UserNotFoundException;
import com.example.kanbanapplication.repository.KanbanRepository;
import com.example.kanbanapplication.service.KanbanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Kanban-Service-Application/k1")
public class KanbanController {

    @Autowired
    private KanbanService kanbanService;

    @Autowired
    private KanbanRepository kanbanRepository1;

    // http://localhost:5555/Kanban-Service-Application/k1/register

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistException {
        try {
            if(kanbanRepository1.existsById(user.getUserEmailID())) {
            }
            else {
                return new ResponseEntity<>(kanbanService.saveUser(user) , HttpStatus.OK);
            }
        }
        catch (UserAlreadyExistException uee) {
            throw new UserAlreadyExistException();
        }
        return new ResponseEntity<>("Account Already Registered with this EmailID Try to Login." , HttpStatus.CONFLICT);
    }

    // http://localhost:5555/Kanban-Service-Application/k1/get-all-users

    @GetMapping("/get-all-users")
    public ResponseEntity<?> listAllUsers() {
        return new ResponseEntity<>(kanbanService.getAllUsers() , HttpStatus.OK);
    }

    // http://localhost:5555/Kanban-Service-Application/k1/find-user/{EmailID}

    @GetMapping("/find-user/{EmailID}")
    public ResponseEntity<?> findUserByID(@PathVariable String EmailID) throws UserNotFoundException {
        return new ResponseEntity<>(kanbanService.getUserDetails(EmailID) , HttpStatus.OK);
    }

    // http://localhost:5555/Kanban-Service-Application/k1/update-user

    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody User user) throws UserNotFoundException {
        return new ResponseEntity<>(kanbanService.updateExistingUser(user) , HttpStatus.OK);
    }
}
