import { useEffect, useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { addComment, getCommentsByIssue } from "../../api/commentApi";

function IssueDrawer() {
  const {
    selectedIssue,
    updateIssueById,
    assignIssueById,
    updateIssueDetailsById,
    deleteIssueById,
    setSelectedIssue,
    currentProject,
    users,
    loadUsers,
  } = useProject();
  const [assigneeId, setAssigneeId] = useState("");
  const [error, setError] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("MEDIUM");
  const [editError, setEditError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    if (!selectedIssue) return;
    setEditTitle(selectedIssue.summary || selectedIssue.title || "");
    setEditDescription(selectedIssue.description || "");
    setEditPriority(selectedIssue.priority || "MEDIUM");
  }, [selectedIssue]);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!selectedIssue?.id) return;
      setLoadingComments(true);
      const res = await getCommentsByIssue(selectedIssue.id);
      if (!active) return;
      if (res?.error) {
        setCommentError(res.error);
        setComments([]);
      } else {
        setCommentError("");
        setComments(res);
      }
      setLoadingComments(false);
    }
    load();
    return () => {
      active = false;
    };
  }, [selectedIssue?.id]);

  if (!selectedIssue) return null;

  function handleStatusChange(e) {
    updateIssueById({
      ...selectedIssue,
      status: e.target.value,
    });
  }

  async function handleAssign() {
    setError("");
    if (!assigneeId.trim()) return;
    const err = await assignIssueById(selectedIssue.id, assigneeId.trim());
    if (err) {
      setError(err);
      return;
    }
    setAssigneeId("");
  }

  async function handleAddComment() {
    setCommentError("");
    if (!commentText.trim()) return;
    const res = await addComment({
      issueId: selectedIssue.id,
      content: commentText.trim(),
    });
    if (res?.error) {
      setCommentError(res.error);
      return;
    }
    setComments((prev) => [res, ...prev]);
    setCommentText("");
  }

  async function handleSaveDetails() {
    setEditError("");
    const err = await updateIssueDetailsById({
      id: selectedIssue.id,
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });
    if (err) {
      setEditError(err);
    }
  }

  async function handleDelete() {
    const ok = window.confirm("Delete this issue?");
    if (!ok) return;
    const err = await deleteIssueById(selectedIssue.id);
    if (err) {
      setEditError(err);
    }
  }

  return (
    <div className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl p-6 z-50 transition-transform duration-300 translate-x-0 overflow-y-auto">
      <button
        onClick={() => setSelectedIssue(null)}
        className="text-gray-500 hover:text-black"
      >
        × Close
      </button>

      <h2 className="text-xl font-bold mt-4">{selectedIssue.key}</h2>
      <p className="mt-2">{selectedIssue.summary}</p>
      <p className="mt-1 text-sm text-gray-500">
        Assignee: {selectedIssue.assignee || "Unassigned"}
      </p>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="border p-2 rounded w-full"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="border p-2 rounded w-full"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          className="border p-2 rounded w-full"
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="px-3 py-2 bg-blue-600 text-white rounded"
          onClick={handleSaveDetails}
        >
          Save
        </button>
        <button
          className="px-3 py-2 border rounded text-red-600 border-red-300"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      {editError && (
        <div className="text-sm text-red-600 mt-2">{editError}</div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={selectedIssue.status}
          onChange={handleStatusChange}
          className="border p-2 rounded w-full"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2">Comments</h3>
        <textarea
          className="border p-2 rounded w-full mb-2"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="px-3 py-2 bg-blue-600 text-white rounded"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
        {commentError && (
          <div className="text-sm text-red-600 mt-2">{commentError}</div>
        )}
        {loadingComments && (
          <div className="text-sm text-gray-500 mt-2">Loading...</div>
        )}
        {!loadingComments && comments.length === 0 && (
          <div className="text-sm text-gray-500 mt-2">No comments yet.</div>
        )}
        <div className="mt-3 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="border rounded p-2">
              <div className="text-xs text-gray-500">
                {c.author} • {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
              </div>
              <div className="text-sm mt-1">{c.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">
          Assign
        </label>
        <div className="flex gap-2">
          <select
            className="border p-2 rounded w-full"
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
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
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
        {currentProject?.members?.length > 0 && (
          <div className="text-xs text-gray-500 mt-2">
            Members: {currentProject.members.join(", ")}
          </div>
        )}
        {error && (
          <div className="text-sm text-red-600 mt-2">{error}</div>
        )}
      </div>
    </div>
  );
}

export default IssueDrawer;
