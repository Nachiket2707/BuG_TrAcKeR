import { useEffect } from "react";
import { useProject } from "../context/ProjectContext";

function ProjectPage() {
  const {
    projects,
    loadProjects,
    currentProject,
    setCurrentProject,
    setIsProjectCreateOpen,
    setIsMemberModalOpen,
  } = useProject();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Projects</h1>
        <div className="flex gap-2">
          <button
            className="border px-3 py-1 rounded"
            onClick={() => setIsMemberModalOpen(true)}
          >
            Members
          </button>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => setIsProjectCreateOpen(true)}
          >
            New Project
          </button>
        </div>
      </div>

      {projects.length === 0 && (
        <div className="text-gray-500">No projects yet.</div>
      )}

      <div className="grid gap-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`border rounded p-3 cursor-pointer ${
              currentProject?.id === p.id ? "border-blue-500" : ""
            }`}
            onClick={() => setCurrentProject(p)}
          >
            <div className="font-semibold">
              {p.name} <span className="text-gray-500">({p.key})</span>
            </div>
            <div className="text-sm text-gray-600">{p.description}</div>
            <div className="text-xs text-gray-500 mt-2">
              Members: {(p.members || []).length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
