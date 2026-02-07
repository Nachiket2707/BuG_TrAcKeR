package com.demo.JiraClone.issue;
public enum IssuePriority {
    CRITICAL(4),
    HIGH(3),
    MEDIUM(2),
    LOW(1);

    private final int level;

    IssuePriority(int level) {
        this.level = level;
    }

    public int getLevel() {
        return level;
    }
}
