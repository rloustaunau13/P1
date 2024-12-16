package com.example.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // Configure HTTP security and Basic Authentication
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests()
                .requestMatchers("/reimbursements").permitAll()  // Allow access to /reimbursements without authentication
                .anyRequest().authenticated()  // Require authentication for other endpoints
            .and()
            .httpBasic();  // Enable Basic Authentication

        return http.build();  // Return the configured HTTP security
    }

    // Configure user details service with an in-memory user
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> User.builder()
                .username("testuser")
                .password(passwordEncoder().encode("password123"))
                .roles("USER")
                .build();
    }

    // Password encoder for encoding passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Use BCrypt password encoder
    }
}
