package com.example.issueboardbackend.model.dbaccess.repos;

import com.example.issueboardbackend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("select c from Comment c where c.issue.id = ?1")
    List<Comment> findByIssueId(int issueId);
}
