package com.example.issueboardbackend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "issues")
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "issuesid", nullable = false)
    private Integer id;

    @Column(name = "titel", nullable = false)
    private String titel;

    @Column(name = "description")
    private String description;

    @ColumnDefault("'Open'")
    @Column(name = "status", length = 20)
    private String status;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    public Issue(String titel, String description, String status, Instant createdAt, Instant updatedAt, User createdBy, User assignedTo) {
        this.titel = titel;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
    }

    public Issue() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    @Override
    public boolean equals(Object o){
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        Issue issue = (Issue) o;
        return id == issue.id;
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(id);
    }

}