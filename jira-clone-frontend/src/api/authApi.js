const BASE = "/api/auth";

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

export async function login(data) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  return res.json();
}

export async function register(data) {
  const res = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await parseError(res);
    return { error: err.message, fields: err.fields };
  }
  return res.json();
}
