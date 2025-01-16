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
        if (!createdBy.getRole().equals("Mitarbeiter") && !createdBy.getRole().equals("Admin")) {
            throw new SecurityException("Benutzer hat keine Berechtigung, das Issue zu erstellen");
        }

        Issue issue = new Issue(titel, description, status, createdAt, updatedAt, createdBy, assignedTo);

        entityManager.persist(issue);
        entityManager.flush();
        entityManager.refresh(issue);

        return issue;
    }

    @Override
    public Issue updateIssue(Integer issueId, String titel, String description, String status, Integer assignedToId, Integer userId) {
        // Benutzer laden und Rollenprüfung durchführen
        User currentUser = entityManager.find(User.class, userId);
        if (currentUser == null) {
            throw new IllegalArgumentException("Benutzer nicht gefunden");
        }
        if (!currentUser.getRole().equals("Mitarbeiter") && !currentUser.getRole().equals("Admin")) {
            throw new SecurityException("Benutzer hat keine Berechtigung, das Issue zu bearbeiten");
        }

        // Issue laden
        Issue issue = entityManager.find(Issue.class, issueId);

        // Felder aktualisieren, falls übergeben
        if (titel != null && !titel.isEmpty()) {
            issue.setTitel(titel);
        }
        if (description != null && !description.isEmpty()) {
            issue.setDescription(description);
        }
        if (status != null && !status.isEmpty()) {
            issue.setStatus(status);
        }
        if (assignedToId != null) {
            User assignedTo = entityManager.find(User.class, assignedToId);
            issue.setAssignedTo(assignedTo);
        }

        // updatedAt aktualisieren
        issue.setUpdatedAt(Instant.now());

        // Änderungen speichern
        entityManager.merge(issue);
        entityManager.flush();
        entityManager.refresh(issue);

        return issue;
    }


    @Override
    public void deleteIssue(int id, int userId){
        // Benutzer laden und Rollenprüfung durchführen
        User currentUser = entityManager.find(User.class, userId);
        if (currentUser == null) {
            throw new IllegalArgumentException("Benutzer nicht gefunden");
        }
        if (!currentUser.getRole().equals("Mitarbeiter") && !currentUser.getRole().equals("Admin")) {
            throw new SecurityException("Benutzer hat keine Berechtigung, das Issue zu löschen");
        }
        Issue issue = entityManager.find(Issue.class, id);
        entityManager.remove(issue);
    }
}
