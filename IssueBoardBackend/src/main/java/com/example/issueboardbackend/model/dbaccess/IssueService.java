package com.example.issueboardbackend.model.dbaccess;


import com.example.issueboardbackend.model.Issue;
import com.example.issueboardbackend.model.User;
import com.example.issueboardbackend.model.dbaccess.repos.IssueRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class IssueService {

    private IssueRepository issueRepository;

    @Autowired
    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public List<Issue> getAllIssues() {return issueRepository.getAll();}

    public Issue getIssueByTitel(String titel) {return issueRepository.getIssueByTitel(titel);}

    public Issue getIssueById(int id) {return issueRepository.getIssueById(id);}

    public Issue createIssue(String titel, String description, String status, Instant createdAt, Instant updatedAt, User createdBy, User assignedTo) {
        return issueRepository.createIssue(titel, description, status, createdAt, updatedAt, createdBy, assignedTo);
    }

    public void deleteIssue(int id) {issueRepository.deleteIssue(id);}
}
