import { useEffect, useMemo, useState } from "react";
import StatusBadge from "../components/issue/StatusBadge";
import { useProject } from "../context/ProjectContext";

function IssueListPage() {
  const { currentProject, issues, loadIssues } = useProject();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  useEffect(() => {
    if (currentProject) {
      loadIssues(currentProject.id);
    }
  }, [currentProject, loadIssues]);

  if (!currentProject) {
    return (
      <div className="text-gray-500">
        Select a project to view issues
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
      const matchesStatus = status === "ALL" || i.status === status;
      const matchesPriority = priority === "ALL" || i.priority === priority;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [issues, query, status, priority]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">
        {currentProject.name} / Issues
      </h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className="border p-2 rounded w-64"
          placeholder="Search by key, title, assignee..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
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

      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b text-left text-sm text-gray-600">
            <th className="p-3">Key</th>
            <th className="p-3">Summary</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((issue) => (
            <tr key={issue.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-mono text-blue-600">
                {issue.key}
              </td>
              <td className="p-3">{issue.summary}</td>
              <td className="p-3">
                <StatusBadge status={issue.status} />
              </td>
              <td className="p-3">{issue.priority}</td>
              <td className="p-3">{issue.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IssueListPage;
