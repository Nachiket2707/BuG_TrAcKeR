package com.demo.JiraClone.issue;


import com.demo.JiraClone.common.BaseEntity;
import com.demo.JiraClone.project.Project;
import com.demo.JiraClone.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "issues")
@Getter
@Setter
public class Issue extends BaseEntity {

        @Column(nullable = false)
        private String title;

        @Column(columnDefinition = "TEXT")
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private IssueStatus status;

        @ManyToOne
        @JoinColumn(name = "project_id")
        private Project project;


        @ManyToOne
        @JoinColumn(name = "assignee_id")
        private User assignee;


        @ManyToOne
        @JoinColumn(name = "reporter_id")
        private User reporter;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private IssuePriority priority;
    }


