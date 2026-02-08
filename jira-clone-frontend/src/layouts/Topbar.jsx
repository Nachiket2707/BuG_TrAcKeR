import { NavLink } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { clearToken } from "../utils/token";

function Topbar() {
  const { setIsCreateOpen, addRandomIssues, currentProject } = useProject();

  async function handleGenerate() {
    if (!currentProject) {
      alert("Select a project first.");
      return;
    }
    const raw = window.prompt("How many issues to generate?", "5");
    if (!raw) return;
    const count = Number(raw);
    if (!Number.isFinite(count) || count <= 0) return;
    const err = await addRandomIssues(Math.min(count, 50));
    if (err) alert(err);
  }

  return (
    <div className="flex items-center gap-6 px-4 h-12 border-b bg-white">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-black"
            : "text-gray-500 hover:text-black"
        }
      >
        List
      </NavLink>

      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-black"
            : "text-gray-500 hover:text-black"
        }
      >
        Projects
      </NavLink>

      <NavLink
        to="/board"
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-black"
            : "text-gray-500 hover:text-black"
        }
      >
        Board
      </NavLink>

      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={handleGenerate}
          className="border px-3 py-1 rounded text-gray-700 hover:text-black"
        >
          Generate
        </button>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Create
        </button>
        <button
          onClick={() => {
            clearToken();
            window.dispatchEvent(new Event("auth:logout"));
          }}
          className="text-sm text-gray-500 hover:text-black"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;
