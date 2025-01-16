package com.example.issueboardbackend.api.dto;

import com.example.issueboardbackend.model.Comment;

import java.time.Instant;

public class CommentDtoOut {
    int id;
    int issueId;
    int userId;
    String comment;
    Instant createdAt;

    public CommentDtoOut(Comment comment){
        this.id = comment.getCommentsId();
        this.issueId = comment.getIssue().getId();
        this.userId = comment.getUser().getUserId();
        this.comment = comment.getComment();
        this.createdAt = comment.getCreatedAt();
    }

    public int getId() { return id; }

    public int getIssueId() { return issueId; }

    public int getUserId() { return userId; }

    public String getComment() { return comment; }

    public Instant getCreatedAt() { return createdAt; }
}
