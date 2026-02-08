package com.demo.JiraClone.user.dto;

public record UserResponse(
        Long id,
        String name,
        String email
) {}
