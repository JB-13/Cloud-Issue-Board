package com.example.issueboardbackend.api.dto;

import com.example.issueboardbackend.model.Issue;
import com.example.issueboardbackend.model.User;

import java.time.Instant;

public class IssueDtoOut {
    int id;
    String titel;
    String description;
    String status;
    Instant createdAt;
    Instant updatedAt;
    Integer createdBy;
    Integer assignedTo;

    public IssueDtoOut(Issue issue) {
        this.id = issue.getId();
        this.titel = issue.getTitel();
        this.description = issue.getDescription();
        this.status = issue.getStatus();
        this.createdAt = issue.getCreatedAt();
        this.updatedAt = issue.getUpdatedAt();
        this.createdBy = issue.getCreatedBy() != null ? issue.getCreatedBy().getUserId() : null;
        this.assignedTo = issue.getAssignedTo() != null ? issue.getAssignedTo().getUserId() : null;
    }
}
