package com.demo.JiraClone.issue.dto;

import com.demo.JiraClone.issue.IssuePriority;
import com.demo.JiraClone.issue.IssueStatus;

public record IssueResponse(
        Long id,
        String title,
        String description,
        IssueStatus status,
        IssuePriority priority,
        String assignee,
        String reporter
) {}