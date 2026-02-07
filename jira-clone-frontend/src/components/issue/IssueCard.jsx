import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useProject } from "../../context/ProjectContext";

function IssueCard({ issue }) {
  const { setSelectedIssue } = useProject();

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: issue.id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => setSelectedIssue(issue)}
      className="bg-white p-3 rounded shadow cursor-pointer"
    >
      <div className="text-blue-600 font-medium">{issue.key}</div>
      <div className="font-semibold">{issue.summary}</div>
      <div className="text-sm text-gray-500">{issue.assignee}</div>
    </div>
  );
}

export default IssueCard;