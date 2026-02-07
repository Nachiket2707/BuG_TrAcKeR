import { useEffect, useMemo, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useProject } from "../context/ProjectContext";
import BoardColumn from "../components/board/BoardColumn";

function BoardPage() {
  const { currentProject, issues, updateIssueById, loadIssues } = useProject();
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("ALL");

  useEffect(() => {
    if (currentProject) {
      loadIssues(currentProject.id);
    }
  }, [currentProject, loadIssues]);

  if (!currentProject) {
    return (
      <div className="text-gray-500">
        Select a project to view the board
      </div>
    );
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return issues.filter((i) => {
      const matchesQuery =
        !q ||
        i.summary?.toLowerCase().includes(q) ||
        i.title?.toLowerCase().includes(q) ||
        i.key?.toLowerCase().includes(q) ||
        i.assignee?.toLowerCase().includes(q) ||
        i.reporter?.toLowerCase().includes(q);
      const matchesPriority = priority === "ALL" || i.priority === priority;
      return matchesQuery && matchesPriority;
    });
  }, [issues, query, priority]);

  const columns = {
    TODO: filtered.filter((i) => i.status === "TODO"),
    IN_PROGRESS: filtered.filter((i) => i.status === "IN_PROGRESS"),
    DONE: filtered.filter((i) => i.status === "DONE"),
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const issueId = active.id;
    const newStatus = over.id;

    const issue = issues.find((i) => i.id === issueId);
    if (!issue || issue.status === newStatus) return;

    updateIssueById({ ...issue, status: newStatus });
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {currentProject.name} / Board
      </h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className="border p-2 rounded w-64"
          placeholder="Search by key, title, assignee..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="ALL">All Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          <BoardColumn id="TODO" title="TODO" issues={columns.TODO} />
          <BoardColumn id="IN_PROGRESS" title="IN PROGRESS" issues={columns.IN_PROGRESS} />
          <BoardColumn id="DONE" title="DONE" issues={columns.DONE} />
        </div>
      </DndContext>
    </div>
  );
}

export default BoardPage;
