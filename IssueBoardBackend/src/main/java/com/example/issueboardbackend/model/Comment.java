package com.example.issueboardbackend.model;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentsid")
    private int commentsId;

    @ManyToOne
    @JoinColumn(name = "issue_id", nullable = false)
    private Issue issue;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String comment;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public Comment() {};

    public Comment(Issue issue, User user, String comment, Instant createdAt){
        this.issue = issue;
        this.user = user;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    public int getCommentsId() { return commentsId; }

    public void setCommentsId(int commentsId) { this.commentsId = commentsId; }

    public Issue getIssue() { return issue; }

    public void setIssue(Issue issue) { this.issue = issue; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }

    public Instant getCreatedAt() { return createdAt; }

    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
