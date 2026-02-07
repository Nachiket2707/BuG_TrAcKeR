package com.demo.JiraClone.comment;

import com.demo.JiraClone.issue.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByIssue(Issue issue);
}