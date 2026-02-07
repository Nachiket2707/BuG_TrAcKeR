import { useEffect, useState } from "react";
import { useProject } from "../../context/ProjectContext";

function ProjectMembersModal() {
  const {
    currentProject,
    users,
    loadUsers,
    isMemberModalOpen,
    setIsMemberModalOpen,
    addMemberToCurrentProject,
  } = useProject();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isMemberModalOpen) {
      loadUsers();
    }
  }, [isMemberModalOpen, loadUsers]);

  if (!isMemberModalOpen) return null;

  async function handleAdd() {
    setError("");
    if (!selectedUserId) return;
    const err = await addMemberToCurrentProject(selectedUserId);
    if (err) {
      setError(err);
      return;
    }
    setSelectedUserId("");
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[440px] rounded shadow-lg p-6">
        <h2 className="text-lg font-bold mb-3">Manage Members</h2>

        <div className="text-sm text-gray-500 mb-3">
          {currentProject?.name}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">
            Add member
          </label>
          <div className="flex gap-2">
            <select
              className="border p-2 rounded w-full"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={String(u.id)}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
            <button
              className="px-3 py-2 bg-blue-600 text-white rounded"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          {error && (
            <div className="text-sm text-red-600 mt-2">{error}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Members</label>
          <div className="border rounded p-2 text-sm max-h-40 overflow-auto">
            {(currentProject?.members || []).length === 0 && (
              <div className="text-gray-500">No members yet.</div>
            )}
            {(currentProject?.members || []).map((m) => (
              <div key={m}>{m}</div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => setIsMemberModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectMembersModal;
