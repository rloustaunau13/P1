
package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class UserService  implements UserDetailsService{

    @Autowired
    private UserRepository repository;

    private final PasswordEncoder encoder;

    public UserService(UserRepository repository, PasswordEncoder encoder) {
        this.repository=repository;
        this.encoder=encoder;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { 
     Optional<User> userDetail = repository.findByUsername(username); 
     // Converting userDetail to UserDetails 
     return userDetail.map(UserInfoDetails::new) 
       .orElseThrow(() -> new UsernameNotFoundException("User not found " + username)); 
    } 


    public String addUser(User user) { 

      

        user.setPassword(encoder.encode(user.getPassword())); 
        repository.save(user); 
        return "User Added Successfully"; 
       } 
    



    public List<User> getAllUsers() {
        // TODO Auto-generated method stub
       return repository.findAll();
    }

}
