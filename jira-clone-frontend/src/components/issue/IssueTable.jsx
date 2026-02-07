import IssueRow from "./IssueRow";

function IssueTable({ issues }) {
  return (
    <table className="w-full bg-white border rounded">
      <thead className="bg-gray-100 text-left text-sm">
        <tr>
          <th className="px-4 py-2">Key</th>
          <th className="px-4 py-2">Summary</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Assignee</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </tbody>
    </table>
  );
}

export default IssueTable;