package com.example.issueboardbackend.api.dto;


import com.example.issueboardbackend.model.User;

public class UserDtoOut {
    int userid;
    String username;
    String role;

    public UserDtoOut(User user) {
        this.userid = user.getUserId();
        this.username = user.getUsername();
        this.role = user.getRole();
    }

    public int getUserId() {
        return userid;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}
