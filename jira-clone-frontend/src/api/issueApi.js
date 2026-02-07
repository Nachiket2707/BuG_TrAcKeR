import { http } from "./http";

const BASE = "/api/issues";

async function parseError(res) {
  try {
    const data = await res.json();
    const fields = data?.fields;
    let message = data?.message || data?.error || res.statusText || "Request failed";
    if (fields) {
      message = `${message}: ${Object.values(fields).join(", ")}`;
    }
    return { message, fields };
  } catch {
    return { message: res.statusText || "Request failed" };
  }
}

function normalizeIssue(raw) {
  const assignee =
    raw?.assignee?.name ||
    raw?.assignee?.email ||
    raw?.assignee ||
    "Unassigned";

  const reporter =
    raw?.reporter?.name ||
    raw?.reporter?.email ||
    raw?.reporter ||
    "";

  const title = raw?.title ?? raw?.summary ?? "";

  return {
    id: raw?.id,
    key: raw?.key || (raw?.id ? `ISSUE-${raw.id}` : ""),
    title,
    summary: title,
    description: raw?.description ?? "",
    status: raw?.status ?? "TODO",
    priority: raw?.priority ?? "MEDIUM",
    assignee,
    reporter,
  };
}

export const getIssuesByProject = async (projectId) => {
  const res = await http(`${BASE}/project/${projectId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeIssue) : [];
};

export const createIssue = async (payload) => {
  const body = {
    projectId: payload.projectId,
    title: payload.title ?? payload.summary ?? "",
    description: payload.description ?? "",
    priority: payload.priority ?? "MEDIUM",
  };
  const res = await http(BASE, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  const data = await res.json();
  return normalizeIssue(data);
};

export const updateIssueStatus = async (id, status) => {
  const res = await http(
    `${BASE}/${id}/status?status=${encodeURIComponent(status)}`,
    { method: "PUT" }
  );
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  const data = await res.json();
  return normalizeIssue(data);
};

export const updateIssueAssignee = async (id, userId) => {
  const res = await http(`${BASE}/${id}/assign/${userId}`, {
    method: "PUT",
  });
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  const data = await res.json();
  return normalizeIssue(data);
};

export const updateIssueDetails = async (id, payload) => {
  const body = {
    title: payload.title ?? payload.summary ?? "",
    description: payload.description ?? "",
    priority: payload.priority ?? "MEDIUM",
  };
  const res = await http(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  const data = await res.json();
  return normalizeIssue(data);
};

export const deleteIssue = async (id) => {
  const res = await http(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  return { ok: true };
};
