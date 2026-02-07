package com.demo.JiraClone.comment;

import com.demo.JiraClone.common.BaseEntity;
import com.demo.JiraClone.issue.Issue;
import com.demo.JiraClone.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment extends BaseEntity {

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;
}