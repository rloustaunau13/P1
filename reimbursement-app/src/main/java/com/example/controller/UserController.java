// src/main/java/com/yourpackage/controller/UserController.java
package com.example.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.service.UserInfoDetails;
import com.example.model.AuthRequest;
import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.service.JwtService;
import com.example.service.UserService;


@RestController
@RequestMapping("/auth") 
public class UserController { 
    private final UserService service; 
    private final JwtService jwtService; 
    private final AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    UserController(UserService service, JwtService jwtService, AuthenticationManager authenticationManager) { 
        this.service = service; 
        this.jwtService = jwtService; 
        this.authenticationManager = authenticationManager; 
    }
  
    @PostMapping("/register") 
    public ResponseEntity<String> addNewUser(@RequestBody User userInfo) { 

          //Check if user exists if so throw 409 code

        Optional<User> userOptional = userRepository.findByUsername(userInfo.getUsername());

    if (userOptional.isPresent()) {
    
        System.out.print("Conflict: Username already exists");
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists"); 
       
        
    }
        //validation user 

        String response = service.addUser(userInfo); 
        return ResponseEntity.status(HttpStatus.CREATED).body(response); 
    } 
  
    @PostMapping("/login") 
    public ResponseEntity<String> authenticateAndGetToken(@RequestBody AuthRequest authRequest) { 
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())); 
        if (authentication.isAuthenticated()) { 
            String token = jwtService.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(token); 
        } else { 
            throw new UsernameNotFoundException("Invalid user request!"); 
        } 
    } 
    @GetMapping("/hello")
    public String hello() {
        return "Hello World!";
    }
  
}
