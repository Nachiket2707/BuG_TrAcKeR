import { http } from "./http";

const BASE = "/api/projects";

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

function makeKey(name) {
  if (!name) return "";
  const letters = name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return letters.slice(0, 4);
}

function normalizeProject(raw) {
  return {
    ...raw,
    key: raw?.key || makeKey(raw?.name),
  };
}

export const getProjects = async () => {
  const res = await http(BASE);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeProject) : [];
};

export const createProject = async (payload) => {
  const body = {
    name: payload.name,
    description: payload.description ?? "",
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
  return normalizeProject(data);
};

export const addProjectMember = async (projectId, userId) => {
  const res = await http(`${BASE}/${projectId}/members/${userId}`, {
    method: "POST",
  });
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  return { ok: true };
};
