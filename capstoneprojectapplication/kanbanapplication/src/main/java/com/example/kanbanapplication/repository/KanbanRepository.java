package com.example.kanbanapplication.repository;

import com.example.kanbanapplication.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface KanbanRepository extends MongoRepository<User , String> {

}
