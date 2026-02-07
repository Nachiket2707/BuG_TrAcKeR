import { http } from "./http";

const BASE = "/api/users";

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

export const getUsers = async () => {
  const res = await http(BASE);
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};
