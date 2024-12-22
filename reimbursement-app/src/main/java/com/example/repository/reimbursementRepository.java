package com.example.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.reimbursement;

public interface reimbursementRepository extends JpaRepository<reimbursement, Long> {

    List<reimbursement> findByUser_UserId(Long userId);  // Correct method name

    Optional<reimbursement> findByReimbId(Long reimbId);

    List<reimbursement> findByUser_UserIdAndStatus(Long userId, String status);

}

