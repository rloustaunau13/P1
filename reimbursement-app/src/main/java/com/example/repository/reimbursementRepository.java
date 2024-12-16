package com.example.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.reimbursement;

public interface reimbursementRepository extends JpaRepository<reimbursement, Integer> {

    List<reimbursement> findByUser_UserId(Integer userId);  // Correct method name
}

