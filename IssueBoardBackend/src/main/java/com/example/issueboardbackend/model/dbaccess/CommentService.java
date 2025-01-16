package com.example.issueboardbackend.model.dbaccess;

import com.example.issueboardbackend.model.Comment;
import com.example.issueboardbackend.model.Issue;
import com.example.issueboardbackend.model.User;
import com.example.issueboardbackend.model.dbaccess.repos.CommentRepository;
import com.example.issueboardbackend.model.dbaccess.repos.IssueRepository;
import com.example.issueboardbackend.model.dbaccess.repos.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class CommentService {

    private CommentRepository commentRepository;
    private IssueRepository issueRepository;
    private UserRepository userRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, IssueRepository issueRepository, UserRepository userRepository){
        this.commentRepository = commentRepository;
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
    }

    public Comment addComment(int isssueId, int userId, String commentText){
        if (commentText == null || commentText.trim().isEmpty()) {
            throw new IllegalArgumentException("Comment text cannot be empty");
        }
        Issue issue = issueRepository.findById(isssueId).orElseThrow(()-> new IllegalArgumentException("Issue not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment comment = new Comment(issue, user, commentText, Instant.now());
        return commentRepository.save(comment);
    }
    public List<Comment> getCommentsByIssueId(int issueId) {
        return commentRepository.findByIssueId(issueId);
    }
    public void deleteComment(int commentId){
        commentRepository.deleteById(commentId);
    }
}
