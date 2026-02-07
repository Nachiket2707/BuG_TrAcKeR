import { createContext, useContext, useState, useCallback } from "react";
import {
  getIssuesByProject,
  updateIssueStatus,
  updateIssueAssignee,
  updateIssueDetails,
  deleteIssue,
  createIssue,
} from "../api/issueApi";
import { getProjects, createProject, addProjectMember } from "../api/projectApi";
import { getUsers } from "../api/userApi";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [currentProject, setCurrentProject] = useState(null);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isProjectCreateOpen, setIsProjectCreateOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const loadProjects = useCallback(async () => {
    const data = await getProjects();
    setProjects(data);
    if (data.length > 0) {
      setCurrentProject((prev) => prev ?? data[0]);
    }
  }, []);

  async function loadIssues(projectId) {
    const data = await getIssuesByProject(projectId);
    setIssues(data);
  }

  async function updateIssueById(issue) {
    const saved = await updateIssueStatus(issue.id, issue.status);
    if (!saved || saved?.error) return saved?.error || "Update failed";
    setIssues((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
    setSelectedIssue(saved);
  }

  async function assignIssueById(issueId, userId) {
    const saved = await updateIssueAssignee(issueId, userId);
    if (!saved || saved?.error) return saved?.error || "Assign failed";
    setIssues((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
    setSelectedIssue(saved);
  }

  async function updateIssueDetailsById(issue) {
    const saved = await updateIssueDetails(issue.id, issue);
    if (!saved || saved?.error) return saved?.error || "Update failed";
    setIssues((prev) => prev.map((i) => (i.id === saved.id ? saved : i)));
    setSelectedIssue(saved);
    return null;
  }

  async function deleteIssueById(issueId) {
    const res = await deleteIssue(issueId);
    if (res?.error) return res.error;
    setIssues((prev) => prev.filter((i) => i.id !== issueId));
    setSelectedIssue(null);
    return null;
  }

  async function addIssue(issue) {
    const saved = await createIssue(issue);
    if (!saved || saved?.error) return saved?.error || "Create failed";
    setIssues((prev) => [...prev, saved]);
    setIsCreateOpen(false);
    return null;
  }

  async function addProject(project) {
    const saved = await createProject(project);
    if (!saved || saved?.error) return saved?.error || "Create failed";
    setProjects((prev) => [...prev, saved]);
    setCurrentProject(saved);
    setIsProjectCreateOpen(false);
    return null;
  }

  async function addRandomIssues(count = 5) {
    if (!currentProject) return "No project selected";
    const titles = [
      "Login page alignment",
      "Fix drag and drop",
      "Improve board performance",
      "Add dark mode toggle",
      "Broken link in sidebar",
      "API timeout on issue list",
      "Refactor project card",
      "Add empty state",
      "Improve accessibility",
      "Update README",
    ];
    const priorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    for (let i = 0; i < count; i += 1) {
      const title = titles[Math.floor(Math.random() * titles.length)];
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      const issue = {
        projectId: currentProject.id,
        title: `${title} #${Math.floor(Math.random() * 1000)}`,
        description: "Auto-generated issue",
        priority,
      };
      const saved = await createIssue(issue);
      if (!saved || saved?.error) {
        return saved?.error || "Create failed";
      }
      setIssues((prev) => [...prev, saved]);
    }
    return null;
  }

  async function addMemberToCurrentProject(userId) {
    if (!currentProject) return "No project selected";
    const res = await addProjectMember(currentProject.id, userId);
    if (res?.error) return res.error;
    const email = users.find((u) => String(u.id) === String(userId))?.email;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === currentProject.id
          ? { ...p, members: [...(p.members || []), email].filter(Boolean) }
          : p
      )
    );
    setCurrentProject((prev) =>
      prev
        ? { ...prev, members: [...(prev.members || []), email].filter(Boolean) }
        : prev
    );
    return null;
  }

  const loadUsers = useCallback(async () => {
    const data = await getUsers();
    if (data?.error) return data.error;
    setUsers(data);
    return null;
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loadProjects,
        currentProject,
        setCurrentProject,
        issues,
        loadIssues,
        selectedIssue,
        setSelectedIssue,
        updateIssueById,
        assignIssueById,
        updateIssueDetailsById,
        deleteIssueById,
        addIssue,
        isCreateOpen,
        setIsCreateOpen,
        isProjectCreateOpen,
        setIsProjectCreateOpen,
        addProject,
        users,
        loadUsers,
        isMemberModalOpen,
        setIsMemberModalOpen,
        addMemberToCurrentProject,
        addRandomIssues,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error("useProject must be used inside ProjectProvider");
  }
  return ctx;
}
