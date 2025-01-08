package com.example.issueboardbackend.api.dto;

import com.example.issueboardbackend.api.security.AccessToken;

public class LoginDtoOut {
    private final int userid;
    private final String username;
    private final AccessToken credential;

    public LoginDtoOut(int userid, String username, AccessToken accessToken) {
        this.userid = userid;
        this.username = username;
        this.credential = accessToken;
    }

    public int getUserId() {
        return userid;
    }

    public String getUsername() {
        return username;
    }

    public AccessToken getCredential() {
        return credential;
    }
}
