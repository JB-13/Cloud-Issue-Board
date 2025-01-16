package com.example.issueboardbackend.api.dto;

public class CommentCreateDtoIn {

    int issueId;
    int userId;
    String comment;

    public int getIssueId() { return issueId; }

    public void setIssueId(int issueId) { this.issueId = issueId; }

    public int getUserId() { return userId; }

    public void setUserId(int userId) { this.userId = userId; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }
}
