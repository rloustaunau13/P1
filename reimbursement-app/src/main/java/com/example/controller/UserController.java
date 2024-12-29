// src/main/java/com/yourpackage/controller/UserController.java
package com.example.controller;

import java.util.List;
import java.util.Map;
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
import com.example.model.reimbursement;
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

        String role="";
        Optional<User> userOptional= userRepository.findByUsername(authRequest.getUsername());
        if(userOptional.isPresent()){
        role=userOptional.get().getRole();
        }
        if (authentication.isAuthenticated()) { 
            String token = jwtService.generateToken(authRequest.getUsername(),role);
            return ResponseEntity.ok(token); 
        } else { 
            throw new UsernameNotFoundException("Invalid user request!"); 
        } 
    }
    
    
    @GetMapping("/users") 
    public ResponseEntity<List<User>> updateReimbursement(@RequestHeader("Authorization") String authorizationHeader) {
            
        String token =authorizationHeader.substring(7);
        String userName = jwtService.extractUsername(token);

 // Retrieve the user from the database based on userId
 Optional<User> optionalUser = userRepository.findByUsername(userName);

    if(optionalUser.isPresent() && optionalUser.get().getRole().equals("manager")){

    
        List<User> users=service.getAllUsers();
    

    return new ResponseEntity<>(users, HttpStatus.OK);  // Return the updated reimbursement with a 200 OK
    }
    else
    {
    // If user is not manager , return a 401 Not authenticated
         
    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

        
    }


    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id,@RequestHeader("Authorization") String authorizationHeader) {
            
        String token =authorizationHeader.substring(7);
        String userName = jwtService.extractUsername(token);

 // Retrieve the user from the database based on userId
 Optional<User> optionalUser = userRepository.findByUsername(userName);

    if(optionalUser.isPresent() && optionalUser.get().getRole().equals("manager")){

    
    String response=service.deleteUserAndReimbursements(id);

    return ResponseEntity.status(HttpStatus.OK).body(response); 
    }
 else
 {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
}

        
    }
  
}
