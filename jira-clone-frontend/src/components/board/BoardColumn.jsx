import { useDroppable } from "@dnd-kit/core";
import IssueCard from "../issue/IssueCard";

function BoardColumn({ id, title, issues }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-blue-100 rounded-lg p-3 min-h-[300px]"
    >
      <h3 className="font-semibold mb-3">{title}</h3>

      <div className="space-y-3">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

export default BoardColumn;