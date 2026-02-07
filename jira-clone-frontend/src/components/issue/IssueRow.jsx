function IssueRow({ issue }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2 font-mono text-sm text-blue-600">
        {issue.key}
      </td>
      <td className="px-4 py-2">
        {issue.summary}
      </td>
      <td className="px-4 py-2 text-sm">
        {issue.status}
      </td>
      <td className="px-4 py-2 text-sm">
        {issue.assignee}
      </td>
    </tr>
  );
}

export default IssueRow;