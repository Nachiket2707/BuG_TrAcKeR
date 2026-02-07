package com.demo.JiraClone.issue;

import com.demo.JiraClone.exception.ResourceNotFoundException;
import com.demo.JiraClone.issue.dto.IssueResponse;
import com.demo.JiraClone.project.Project;
import com.demo.JiraClone.project.ProjectRepository;
import com.demo.JiraClone.user.User;
import com.demo.JiraClone.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public IssueService(IssueRepository issueRepository,
                        ProjectRepository projectRepository,
                        UserRepository userRepository) {
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Issue createIssue(Long projectId, String title, String description, IssuePriority priority, User reporter) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getMembers().contains(reporter)) {
            throw new RuntimeException("User is not a project member");
        }

        Issue issue = new Issue();
        issue.setTitle(title);
        issue.setDescription(description);
        issue.setStatus(IssueStatus.TODO);
        issue.setPriority(priority != null ? priority : IssuePriority.MEDIUM);
        issue.setProject(project);
        issue.setReporter(reporter);

        return issueRepository.save(issue);
    }

    public Issue assignIssue(Long issueId, Long userId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        User assignee = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        issue.setAssignee(assignee);
        return issueRepository.save(issue);
    }

    public Issue changeStatus(Long issueId, IssueStatus status) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issue.setStatus(status);
        return issueRepository.save(issue);
    }

    public List<Issue> getIssuesByProjectAndPriority(
            Long projectId,
            IssuePriority priority
    ) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        return issueRepository.findByProjectAndPriority(project, priority);
    }

    public Issue updatePriority(Long issueId, IssuePriority priority) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        issue.setPriority(priority);
        return issueRepository.save(issue);
    }

    public Issue updateIssue(Long issueId, String title, String description, IssuePriority priority) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        issue.setTitle(title);
        issue.setDescription(description);
        if (priority != null) {
            issue.setPriority(priority);
        }
        return issueRepository.save(issue);
    }

    public void deleteIssue(Long issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));
        issueRepository.delete(issue);
    }

    public IssueResponse toResponse(Issue issue) {
        return new IssueResponse(
                issue.getId(),
                issue.getTitle(),
                issue.getDescription(),
                issue.getStatus(),
                issue.getPriority(),
                issue.getAssignee() != null ? issue.getAssignee().getEmail() : null,
                issue.getReporter().getEmail()
        );
    }
}
