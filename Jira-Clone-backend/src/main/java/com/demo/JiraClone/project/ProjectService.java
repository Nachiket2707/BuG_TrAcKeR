package com.demo.JiraClone.project;

import com.demo.JiraClone.exception.AccessDeniedException;
import com.demo.JiraClone.exception.BadRequestException;
import com.demo.JiraClone.exception.ResourceNotFoundException;
import com.demo.JiraClone.project.dto.ProjectResponse;
import com.demo.JiraClone.user.Role;
import com.demo.JiraClone.user.User;
import com.demo.JiraClone.user.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository,
                          UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(String name, String description, User owner) {
        if (owner.getRole() == Role.DEVELOPER) {
            new AccessDeniedException("Developers cannot create projects");
        }
        if (projectRepository.existsByName(name)) {
            throw new BadRequestException("Project already exists");
        }

        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setOwner(owner);
        project.getMembers().add(owner); // owner is always a member

        return projectRepository.save(project);
    }

    public void addMember(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        project.getMembers().add(user);
        projectRepository.save(project);
    }

    public List<Project> getProjectsForUser(User user) {
        return projectRepository.findByMembersContaining(user);
    }
    public ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getOwner().getEmail(),
                project.getMembers()
                        .stream()
                        .map(User::getEmail)
                        .collect(Collectors.toSet())
        );
    }
}
