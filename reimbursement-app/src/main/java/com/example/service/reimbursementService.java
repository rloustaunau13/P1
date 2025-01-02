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






    public  reimbursement addReimbursement (reimbursement reim) {

        return reimbursementRepository.save(reim);
    }







    public List<reimbursement> getReimbursementsByUserId(Long userId) {
        return reimbursementRepository.findByUser_UserId(userId);



}







    public List<reimbursement> getReimbursementsByStatus(Long userID,String status) {
       
        return reimbursementRepository.findByUser_UserIdAndStatus(userID,status);
    }







    public List<reimbursement> getAll() {
      return reimbursementRepository.findAll();
    }









}