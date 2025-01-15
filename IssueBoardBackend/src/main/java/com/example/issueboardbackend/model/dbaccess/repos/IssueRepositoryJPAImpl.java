package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.Issue;
import com.example.issueboardbackend.model.User;
import com.example.issueboardbackend.util.PasswordTools;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class IssueRepositoryJPAImpl implements IssueRepositoryJPA{
    EntityManager entityManager;

    @Autowired
    public IssueRepositoryJPAImpl(EntityManager entityManager) {this.entityManager = entityManager;}

    @Override
    public Issue createIssue(String titel, String description, String status, Instant createdAt, Instant updatedAt, User createdBy, User assignedTo)
    {
        Issue issue = new Issue(titel, description, status, createdAt, updatedAt, createdBy, assignedTo);

        entityManager.persist(issue);
        entityManager.flush();
        entityManager.refresh(issue);

        return issue;
    }


    @Override
    public void deleteIssue(int id){
        Issue issue = entityManager.find(Issue.class, id);
        entityManager.remove(issue);
    }
}
