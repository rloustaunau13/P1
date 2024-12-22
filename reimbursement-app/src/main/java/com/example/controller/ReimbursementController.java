package com.example.controller;

import com.example.model.User;
import com.example.model.reimbursement;  // Capitalize class name
import com.example.repository.UserRepository;
import com.example.repository.reimbursementRepository;
import com.example.service.JwtService;
import com.example.service.UserService;
import com.example.service.reimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.example.service.JwtService;

@RestController
@RequestMapping("/auth")
public class ReimbursementController {

    @Autowired
    private reimbursementService reimbursementService;

    @Autowired
    private  JwtService jwtService; 

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private reimbursementRepository reimbursementRepository; 




      // Endpoint for user to  create a new reimbursement
      @PostMapping("/reimbursements")
      public ResponseEntity<reimbursement> createReimbursement(@RequestBody reimbursement reim,@RequestHeader("Authorization") String authorizationHeader) {
          // Check if the userId field is null or not provided
  
        
          String token =authorizationHeader.substring(7);
          String userName = jwtService.extractUsername(token);
  
  
            // Retrieve the user from the database based on userId
            Optional<User> optionalUser = userRepository.findByUsername(userName);
  
  
  
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

    
      //See all reimbursement tickets only their own
      @GetMapping("/reimbursements")
    public ResponseEntity<List<reimbursement>> getReimbursements(@RequestHeader("Authorization") String authorizationHeader) {
        // Get logged-in user's username

        String token =authorizationHeader.substring(7);
        String userName = jwtService.extractUsername(token);

       User user = userRepository.findByUsername(userName).get();

       Long userID=user.getUserId();

        List<reimbursement> reimbursements = reimbursementService.getReimbursementsByUserId(userID);
        return ResponseEntity.ok(reimbursements);
    }


    //See all their pending reimbursements
    @GetMapping("/reimbursements/pending")
    public ResponseEntity<List<reimbursement>> getPendingReimbursements(@RequestHeader("Authorization") String authorizationHeader) {
        // Get logged-in user's username

        String token =authorizationHeader.substring(7);
        String userName = jwtService.extractUsername(token);

       User user = userRepository.findByUsername(userName).get();

       Long userID=user.getUserId();

       List<reimbursement> reimbursements = reimbursementService.getReimbursementsByStatus(userID, "PENDING");

        return ResponseEntity.ok(reimbursements);
    }

        //See all their pending reimbursements
        @GetMapping("/reimbursements/approved")
        public ResponseEntity<List<reimbursement>> getCompletedReimbursements(@RequestHeader("Authorization") String authorizationHeader) {
            // Get logged-in user's username
    
            String token =authorizationHeader.substring(7);
            String userName = jwtService.extractUsername(token);
    
           User user = userRepository.findByUsername(userName).get();
    
           Long userID=user.getUserId();
    
           List<reimbursement> reimbursements = reimbursementService.getReimbursementsByStatus(userID, "APPROVED");
    
            return ResponseEntity.ok(reimbursements);
        }

    //See all their finished

//Endpoint to update a reimbursement from pending to completed 

    @PutMapping("/reimbursements/{id}")
    public ResponseEntity<reimbursement> updateReimbursement(@PathVariable Long id,@RequestHeader("Authorization") String authorizationHeader,  @RequestBody Map<String, String> actionPayload) {
            
        String token =authorizationHeader.substring(7);
        String userName = jwtService.extractUsername(token);

 // Retrieve the user from the database based on userId
 Optional<User> optionalUser = userRepository.findByUsername(userName);

    if(optionalUser.isPresent() && optionalUser.get().getRole().equals("manager")){

    
    reimbursement reim = reimbursementRepository.getReferenceById(id);

    // Extract the action (approve/deny) from the request body
    String action = actionPayload.get("action");

    if (action == null || (!action.equalsIgnoreCase("APPROVED") && !action.equalsIgnoreCase("DENIED"))) {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // Invalid action
    }



    reim.setStatus(action.toUpperCase());

    reimbursement updatedReimbursement = reimbursementService.addReimbursement(reim);

    return new ResponseEntity<>(updatedReimbursement, HttpStatus.OK);  // Return the updated reimbursement with a 200 OK
    }
 else
 {
            // If user is not manager , return a 401 Not authenticated
         
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
}

        
    }


  
}
