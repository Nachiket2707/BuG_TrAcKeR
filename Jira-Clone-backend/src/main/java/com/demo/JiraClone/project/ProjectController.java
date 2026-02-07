package com.demo.JiraClone.project;

import com.demo.JiraClone.project.dto.ProjectRequest;
import com.demo.JiraClone.project.dto.ProjectResponse;
import com.demo.JiraClone.user.User;
import com.demo.JiraClone.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;

    public ProjectController(ProjectService projectService,
                             UserRepository userRepository) {
        this.projectService = projectService;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping
    public ProjectResponse createProject(
            @Valid @RequestBody ProjectRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User owner = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

        Project project = projectService.createProject(
                request.name(),
                request.description(),
                owner
        );

        return projectService.toResponse(project);
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping("/{projectId}/members/{userId}")
    public void addMember(
            @PathVariable Long projectId,
            @PathVariable Long userId
    ) {
        projectService.addMember(projectId, userId);
    }

    @GetMapping
    public List<Project> myProjects(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow();

        return projectService.getProjectsForUser(user);
    }
}