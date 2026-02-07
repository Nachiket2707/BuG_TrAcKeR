package com.demo.JiraClone.project.dto;

import java.util.Set;

public record ProjectResponse(
        Long id,
        String name,
        String description,
        String ownerEmail,
        Set<String> members
) {}