import { useEffect } from "react";
import { useProject } from "../../context/ProjectContext";

function ProjectList() {
  const {
    currentProject,
    setCurrentProject,
    projects,
    loadProjects,
  } = useProject();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div>
      {projects.length === 0 && (
        <div className="text-xs text-gray-400 px-3 py-2">
          No projects
        </div>
      )}

      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => setCurrentProject(project)}
          className={`cursor-pointer px-3 py-2 rounded text-sm mb-1
            ${
              currentProject?.id === project.id
                ? "bg-slate-700 text-white"
                : "text-gray-300 hover:bg-slate-700"
            }`}
        >
          <span className="font-semibold mr-2">
            {project.key}
          </span>
          {project.name}
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
