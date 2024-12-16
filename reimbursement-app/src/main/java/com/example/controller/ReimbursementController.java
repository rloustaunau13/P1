package com.example.controller;

import com.example.model.User;
import com.example.model.reimbursement;  // Capitalize class name
import com.example.repository.UserRepository;
import com.example.service.reimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reimbursements")
public class ReimbursementController {

    @Autowired
    private reimbursementService reimbursementService;

    @Autowired
    private UserRepository userRepository;

    
        @GetMapping
    public ResponseEntity<List<reimbursement>> getReimbursements(Principal principal) {
        String username = principal.getName(); // Get logged-in user's username
        List<reimbursement> reimbursements = reimbursementService.getReimbursementsByUsername(username);
        return ResponseEntity.ok(reimbursements);
    }

    // Endpoint to create a new reimbursement
    @PostMapping
    public ResponseEntity<reimbursement> createReimbursement(@RequestBody reimbursement reim) {
        // Check if the userId field is null or not provided
        if (reim.getUser() == null || reim.getUser().getUserId() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // Respond with 400 if userId is missing
        }

        // Retrieve the user from the database based on userId
        Optional<User> optionalUser = userRepository.findById(reim.getUser().getUserId());

        if (optionalUser.isPresent()) {
            // Set the retrieved user to the reimbursement object
            reim.setUser(optionalUser.get());

            // Proceed with creating the reimbursement
            reimbursement createdReimbursement = reimbursementService.addReimbursement(reim);
            return new ResponseEntity<>(createdReimbursement, HttpStatus.CREATED);  // Return the created reimbursement with a 201 Created status
        } else {
            // If user is not found, return a 404 Not Found status
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
