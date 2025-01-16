package com.example.issueboardbackend.api;

import com.example.issueboardbackend.api.dto.CommentCreateDtoIn;
import com.example.issueboardbackend.api.dto.CommentDtoOut;
import com.example.issueboardbackend.model.Comment;
import com.example.issueboardbackend.model.dbaccess.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }
    @PostMapping
    public CommentDtoOut addComment(@RequestBody CommentCreateDtoIn dtoIn) {
        Comment comment = commentService.addComment(dtoIn.getIssueId(), dtoIn.getUserId(), dtoIn.getComment());
        return new CommentDtoOut(comment);
    }
    @GetMapping("/issue/{issueId}")
    public List<CommentDtoOut> getCommentsByIssueId(@PathVariable int issueId) {
        return commentService.getCommentsByIssueId(issueId)
                .stream()
                .map(CommentDtoOut::new)
                .collect(Collectors.toList());
    }
    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable int commentId) {
        commentService.deleteComment(commentId);
    }
}
