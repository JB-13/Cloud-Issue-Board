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

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getTitel() {
        return titel;
    }

    public String getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public Integer getAssignedTo() {
        return assignedTo;
    }

}
