package com.example.service;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.model.User;
import com.example.model.reimbursement;
import com.example.repository.*;;



@Service
public class reimbursementService {

    @Autowired
    private reimbursementRepository reimbursementRepository;

    @Autowired
    private UserRepository userRepository;





    public  reimbursement addReimbursement (reimbursement reim) {

        return reimbursementRepository.save(reim);
    }


    public List<reimbursement> getReimbursementsByUsername(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found")); // Or create a custom exception
    
        Long userId = user.getUserId();
        List<reimbursement> reimbursements = reimbursementRepository.findByUser_UserId(userId);
    
        return reimbursements;  
    }





    public List<reimbursement> getAllReimbursements() {
        // TODO Auto-generated method stub
      List<reimbursement> reimbursements =reimbursementRepository.findAll();

      return reimbursements;
    }



}
