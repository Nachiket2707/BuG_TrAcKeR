package com.demo.JiraClone.issue.dto;

import com.demo.JiraClone.issue.IssuePriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateIssueRequest(

        @NotBlank(message = "Title is required")
        @Size(min = 3, max = 100)
        String title,

        @Size(max = 1000)
        String description,

        IssuePriority priority
) {}
