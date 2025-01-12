package com.example.issueboardbackend.model;


import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid", nullable = false)
    private int userid;
    private String username;
    @Column(name = "password_hash", nullable = false, columnDefinition = "BINARY")
    private byte[] passwordHash;
    @Column(name = "password_salt", nullable = false, columnDefinition = "BINARY")
    private byte[] passwordSalt;
    private String role;


    public User(String username, byte[] passwordSalt, byte[] passwordHash, String role) {
        this.username = username;
        this.passwordSalt = passwordSalt;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    public User() {}

    public int getUserId() {return userid;}

    public void setUserId(int userid) {
        this.userid = userid;
    }

    public String getUsername() {return username;}

    public void setUsername(String username) {
        this.username = username;
    }

    public byte[] getPasswordSalt() {
        return passwordSalt;
    }

    public void setPasswordSalt(byte[] passwordSalt) {
        this.passwordSalt = passwordSalt;
    }

    public byte[] getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(byte[] passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o){
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        User user = (User) o;
        return userid == user.userid;
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(userid);
    }

}
