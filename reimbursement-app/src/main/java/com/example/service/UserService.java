
package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User addUser(User user){
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        // TODO Auto-generated method stub
       return userRepository.findAll();
    }
}
