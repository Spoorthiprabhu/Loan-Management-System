package com.loan.loan_management_system.service;



import com.loan.loan_management_system.entity.User;
import com.loan.loan_management_system.repository.UserRepository;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import com.loan.loan_management_system.security.UserDetailsImpl;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getUsername(),
//                user.getPassword(),
//               
//                Collections.singleton(user.getRole())
        return new UserDetailsImpl(user);


        
    }
    
   

}

