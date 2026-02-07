import { http } from "./http";

const BASE = "/api/comments";

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

export const getCommentsByIssue = async (issueId) => {
  const res = await http(`${BASE}/issue/${issueId}`);
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const addComment = async ({ issueId, content }) => {
  const res = await http(BASE, {
    method: "POST",
    body: JSON.stringify({ issueId, content }),
  });
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  return res.json();
};
