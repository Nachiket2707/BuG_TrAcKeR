package com.demo.JiraClone.comment;

import com.demo.JiraClone.comment.dto.CommentRequest;
import com.demo.JiraClone.comment.dto.CommentResponse;
import com.demo.JiraClone.user.User;
import com.demo.JiraClone.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final UserRepository userRepository;

    public CommentController(CommentService commentService,
                             UserRepository userRepository) {
        this.commentService = commentService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public CommentResponse addComment(
            @Valid @RequestBody CommentRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User author = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow();

        Comment comment = commentService.addComment(
                request.issueId(),
                request.content(),
                author
        );

        return commentService.toResponse(comment);
    }

    @GetMapping("/issue/{issueId}")
    public List<CommentResponse> getComments(
            @PathVariable Long issueId
    ) {
        return commentService.getCommentsByIssue(issueId)
                .stream()
                .map(commentService::toResponse)
                .toList();
    }
}
