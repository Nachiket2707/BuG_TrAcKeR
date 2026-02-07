package com.demo.JiraClone.issue;

import com.demo.JiraClone.issue.dto.IssueRequest;
import com.demo.JiraClone.issue.dto.IssueResponse;
import com.demo.JiraClone.issue.dto.UpdateIssueRequest;
import com.demo.JiraClone.user.User;
import com.demo.JiraClone.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;
    private final UserRepository userRepository;

    public IssueController(IssueService issueService,
                           UserRepository userRepository) {
        this.issueService = issueService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public IssueResponse createIssue(
            @Valid @RequestBody IssueRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User reporter = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow();

        Issue issue = issueService.createIssue(
                request.projectId(),
                request.title(),
                request.description(),
                request.priority(),
                reporter
        );

        return issueService.toResponse(issue);
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PutMapping("/{issueId}/assign/{userId}")
    public Issue assignIssue(
            @PathVariable Long issueId,
            @PathVariable Long userId
    ) {
        return issueService.assignIssue(issueId, userId);
    }

    @PutMapping("/{issueId}/status")
    public Issue changeStatus(
            @PathVariable Long issueId,
            @RequestParam IssueStatus status
    ) {
        return issueService.changeStatus(issueId, status);
    }

    @GetMapping("/project/{projectId}")
    public List<IssueResponse> getIssuesByProject(
            @PathVariable Long projectId,
            @RequestParam(required = false) IssuePriority priority
    ) {
        List<Issue> issues =
                issueService.getIssuesByProjectAndPriority(projectId, priority);

        return issues.stream()
                .map(issueService::toResponse)
                .toList();
    }

    @PutMapping("/{issueId}/priority")
    public IssueResponse updatePriority(
            @PathVariable Long issueId,
            @RequestParam IssuePriority priority
    ) {
        Issue issue = issueService.updatePriority(issueId, priority);
        return issueService.toResponse(issue);
    }

    @PutMapping("/{issueId}")
    public IssueResponse updateIssue(
            @PathVariable Long issueId,
            @Valid @RequestBody UpdateIssueRequest request
    ) {
        Issue issue = issueService.updateIssue(
                issueId,
                request.title(),
                request.description(),
                request.priority()
        );
        return issueService.toResponse(issue);
    }

    @DeleteMapping("/{issueId}")
    public void deleteIssue(@PathVariable Long issueId) {
        issueService.deleteIssue(issueId);
    }
}
