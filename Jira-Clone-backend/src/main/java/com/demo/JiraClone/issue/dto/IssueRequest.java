package com.demo.JiraClone.issue.dto;


import com.demo.JiraClone.issue.IssuePriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record IssueRequest(

        @NotNull(message = "Project ID is required")
        Long projectId,

        @NotBlank(message = "Issue title is required")
        @Size(min = 3, max = 100)
        String title,

        @Size(max = 1000)
        String description,

        @NotNull(message = "Priority is required")
        IssuePriority priority
) {}