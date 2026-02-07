function StatusBadge({ status }) {
  const styles = {
    TODO: "bg-gray-200 text-gray-800",
    IN_PROGRESS: "bg-blue-200 text-blue-800",
    DONE: "bg-green-200 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

export default StatusBadge;