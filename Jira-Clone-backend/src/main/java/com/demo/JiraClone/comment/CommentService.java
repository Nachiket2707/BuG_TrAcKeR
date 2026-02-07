package com.demo.JiraClone.comment;

import com.demo.JiraClone.comment.dto.CommentResponse;
import com.demo.JiraClone.issue.Issue;
import com.demo.JiraClone.issue.IssueRepository;
import com.demo.JiraClone.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final IssueRepository issueRepository;

    public CommentService(CommentRepository commentRepository,
                          IssueRepository issueRepository) {
        this.commentRepository = commentRepository;
        this.issueRepository = issueRepository;
    }

    public Comment addComment(Long issueId, String content, User author) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setIssue(issue);
        comment.setAuthor(author);

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByIssue(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        return commentRepository.findByIssue(issue);
    }

    public CommentResponse toResponse(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getAuthor().getEmail(),
                comment.getCreatedAt()
        );
    }
}