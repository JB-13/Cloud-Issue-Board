package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer>, IssueRepositoryJPA{
    @Query("select i from Issue i")
    public List<Issue> getAll();

    @Query("select i from Issue i where i.titel = ?1")
    public Issue getIssueByTitel(String titel);

    @Query("select i from Issue i where i.status = ?1")
    public List<Issue> getIssuesByStatus(String status);

    @Query("select i from Issue i where i.titel = ?1")
    public Issue getIssueById(int userid);
}
