package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.User;


public interface UserRepositoryJPA {
    public User createUser(String username, String password, String role);
    public void deleteUser(int userid);
}
