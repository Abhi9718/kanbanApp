package com.example.kanbanapplication.service;

import com.example.kanbanapplication.domain.*;
import com.example.kanbanapplication.exceptions.UserAlreadyExistException;
import com.example.kanbanapplication.exceptions.UserNotFoundException;
import com.example.kanbanapplication.proxy.UserProxy;
import com.example.kanbanapplication.repository.KanbanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class KanbanServiceImpl implements KanbanService {

    @Autowired
    private KanbanRepository kanbanRepository;

    @Autowired
    private UserProxy userProxy;

    @Override
    public List<User> getAllUsers() {
        return kanbanRepository.findAll();
    }

    @Override
    public User saveUser(User user) throws UserAlreadyExistException {
        if (kanbanRepository.existsById(user.getUserEmailID())) {
            throw new UserAlreadyExistException();
        }
        else {
            userProxy.sendUserObjectToAuthApp(user);
            user.setColumnList(new ArrayList<>());
            return kanbanRepository.insert(user);

        }
    }

    @Override
    public Optional<User> getUserDetails(String EmailID) throws UserNotFoundException {
        if (kanbanRepository.findById(EmailID).isPresent()) {
            return kanbanRepository.findById(EmailID);
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public User updateExistingUser(User user) throws UserNotFoundException {
        if (kanbanRepository.findById(user.getUserEmailID()).isPresent()) {
//            user.setColumnList(new ArrayList<>());
            User user1=kanbanRepository.findById(user.getUserEmailID()).get();
            List <Column> column=user.getColumnList();
            user1.setColumnList(column);
           return  kanbanRepository.save(user1);


        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Optional<User> searchTaskByUser(String EmailID , String projectName , Card taskCard) throws UserNotFoundException {
        if(kanbanRepository.findById(EmailID).isPresent()) {
            User user = kanbanRepository.findById(EmailID).get();
            if (user.getColumnList().isEmpty()) {
                System.out.println("First Add A Project.....!");
            }
            else {
                if (user.getColumnList().stream().filter(userProjects ->
                        userProjects.getColumnName() == projectName).toList().isEmpty()){

                }
                else {
                    user.getColumnList().stream().filter(userProjects ->
                            userProjects.getColumnName() == projectName).filter(userTasks -> userTasks.getCardList().add(taskCard));
                }
            }
        }
        else {
            throw new UserNotFoundException();
        }
        return kanbanRepository.findById(EmailID);
    }
}
