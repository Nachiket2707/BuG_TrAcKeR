package com.demo.JiraClone.project;

import com.demo.JiraClone.common.BaseEntity;
import com.demo.JiraClone.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
@Getter
@Setter
public class Project extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String name;

    private String description;


    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;


    @ManyToMany
    @JoinTable(
            name = "project_members",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> members = new HashSet<>();
}