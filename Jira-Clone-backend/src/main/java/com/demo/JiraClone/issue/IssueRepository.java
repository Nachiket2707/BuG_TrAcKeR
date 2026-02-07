package com.demo.JiraClone.issue;

import com.demo.JiraClone.project.Project;
import com.demo.JiraClone.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {


    List<Issue> findByProjectAndStatus(Project project, IssueStatus status);


    List<Issue> findByProject(Project project);


    List<Issue> findByAssignee(User assignee);

    List<Issue> findByProjectAndPriority(Project project, IssuePriority priority);

}