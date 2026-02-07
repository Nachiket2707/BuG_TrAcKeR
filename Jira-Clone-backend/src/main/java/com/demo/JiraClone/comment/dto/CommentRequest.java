package com.demo.JiraClone.comment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CommentRequest(

        @NotNull(message = "Issue ID is required")
        Long issueId,

        @NotBlank(message = "Comment cannot be empty")
        @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
        String content
) {}