package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.Issue;
import com.example.issueboardbackend.model.User;

import java.time.Instant;

public interface IssueRepositoryJPA {
    public Issue createIssue(String titel, String description, String status, Instant createdAt, Instant updatedAt, User createdBy, User assignedTo);
    public Issue updateIssue(Integer issueId, String titel, String description, String status, Integer assignedToId, Integer userId);
    public void deleteIssue(int id, int userId);
}
