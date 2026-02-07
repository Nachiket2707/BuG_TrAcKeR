import { useState } from "react";
import { useProject } from "../../context/ProjectContext";

function CreateProjectModal() {
  const {
    isProjectCreateOpen,
    setIsProjectCreateOpen,
    addProject,
  } = useProject();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!isProjectCreateOpen) return null;

  async function handleCreate() {
    setError("");
    if (!name.trim()) return;
    const err = await addProject({ name: name.trim(), description });
    if (err) {
      setError(err);
      return;
    }
    setName("");
    setDescription("");
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Create Project</h2>
        {error && (
          <div className="text-sm text-red-600 mb-3">{error}</div>
        )}

        <input
          className="border p-2 w-full mb-3"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setIsProjectCreateOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;
