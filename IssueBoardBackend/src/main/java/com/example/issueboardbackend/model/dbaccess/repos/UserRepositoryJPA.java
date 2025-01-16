package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.User;


public interface UserRepositoryJPA {
    public User createUser(String username, String password);
    public User updateUser(int userId, String role, int id);
    public void deleteUser(int userid);
}
