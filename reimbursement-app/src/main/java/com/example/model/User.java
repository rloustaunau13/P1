package com.example.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity  // Marks this class as an entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class User {

    @Id  // Specifies the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-generates ID
    private Long userId;
    private String firstName;
    private String lastName;
    private String username;
    private String password;  
    private String role = "employee"; // Java default value



}
