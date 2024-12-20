package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reimbursement")
public class reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reimbId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private double amount;

    @Column(columnDefinition = "varchar(255) default 'pending'")
    private String status="pending";

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    public reimbursement(int reimbId2, Double amount2, String description2, String status2) {
        //TODO Auto-generated constructor stub
    }

    // Getters and setters
    public int getReimbId() {
        return reimbId;
    }

    public void setReimbId(int reimbId) {
        this.reimbId = reimbId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
