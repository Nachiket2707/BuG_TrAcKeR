import ProjectList from "../components/project/ProjectList";
import { useProject } from "../context/ProjectContext";

function Sidebar() {
  const { setIsProjectCreateOpen, setIsMemberModalOpen } = useProject();

  return (
    <aside className="w-64 bg-slate-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">
        Jira Clone
      </h2>

      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase text-gray-400">Projects</span>
        <div className="flex items-center gap-2">
          <button
            className="text-xs text-blue-300 hover:text-blue-200"
            onClick={() => setIsMemberModalOpen(true)}
          >
            Members
          </button>
          <button
            className="text-xs text-blue-300 hover:text-blue-200"
            onClick={() => setIsProjectCreateOpen(true)}
          >
            New
          </button>
        </div>
      </div>

      <ProjectList />
    </aside>
  );
}

export default Sidebar;
