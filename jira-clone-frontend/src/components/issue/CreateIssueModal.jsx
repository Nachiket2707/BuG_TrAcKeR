import { useState } from "react";
import { useProject } from "../../context/ProjectContext";

function CreateIssueModal() {
  const {
    isCreateOpen,
    setIsCreateOpen,
    currentProject,
    addIssue,
  } = useProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [error, setError] = useState("");

  if (!isCreateOpen) return null;

  async function handleCreate() {
    setError("");
    const newIssue = {
      projectId: currentProject.id,
      title,
      description,
      priority,
    };

    const err = await addIssue(newIssue);
    if (err) {
      setError(err);
      return;
    }
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Create Issue</h2>
        {error && (
          <div className="text-sm text-red-600 mb-3">{error}</div>
        )}

        <input
          className="border p-2 w-full mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setIsCreateOpen(false)}
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

export default CreateIssueModal;
