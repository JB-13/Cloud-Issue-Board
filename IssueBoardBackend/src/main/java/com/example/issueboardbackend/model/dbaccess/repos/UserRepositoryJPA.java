package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.User;


public interface UserRepositoryJPA {
    public User createUser(String username, String passwort, String role);
    public void deleteUser(int userid);
}
