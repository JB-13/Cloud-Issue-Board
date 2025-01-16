package com.example.issueboardbackend.model.dbaccess;


import com.example.issueboardbackend.model.Issue;
import com.example.issueboardbackend.model.User;
import com.example.issueboardbackend.model.dbaccess.repos.IssueRepository;
import com.example.issueboardbackend.model.dbaccess.repos.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class IssueService {

    private UserRepository userRepository;
    private IssueRepository issueRepository;

    @Autowired
    public IssueService(IssueRepository issueRepository, UserRepository userRepository) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
    }

    public List<Issue> getAllIssues() {return issueRepository.getAll();}

    public Issue getIssueByTitel(String titel) {return issueRepository.getIssueByTitel(titel);}

    public List<Issue> getIssuesByStatus(String status) {return issueRepository.getIssuesByStatus(status);}

    public Issue getIssueById(int id) {return issueRepository.getIssueById(id);}

    public Issue createIssue(String titel, String description, String status, Instant createdAt, Instant updatedAt, Integer createdById, Integer assignedToId) {

        if (status == null || status.isEmpty()) {
            status = "Open"; // Standardstatus
        }
        Instant now = Instant.now();
        if (createdAt == null) {
            createdAt = now; // Aktueller Zeitpunkt als Standard für createdAt
        }
        if (updatedAt == null) {
            updatedAt = now; // Aktueller Zeitpunkt als Standard für updatedAt
        }

        User createdBy = createdById != null ? userRepository.findById(createdById).orElse(null) : null;
        User assignedTo = assignedToId != null ? userRepository.findById(assignedToId).orElse(null) : null;

        return issueRepository.createIssue(titel, description, status, createdAt, updatedAt, createdBy, assignedTo);
    }

    public Issue updateIssue(Integer issueId, String titel, String description, String status, Integer assignedToId, Integer userId) {
        return issueRepository.updateIssue(issueId,titel,description,status,assignedToId,userId);
    }

    public void deleteIssue(int id, int userId) {issueRepository.deleteIssue(id, userId);}
}
