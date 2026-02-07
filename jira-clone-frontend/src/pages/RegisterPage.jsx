import { useState } from "react";
import { register } from "../api/authApi";
import { setToken } from "../utils/token";

function RegisterPage({ onLogin, onShowLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DEVELOPER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await register({ name, email, password, role });
      if (res?.error) {
        setError(res.error);
        return;
      }
      if (!res?.token) {
        setError("Invalid register response.");
        return;
      }
      setToken(res.token);
      onLogin(res.token);
    } catch (err) {
      setError("Registration failed. Check inputs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Create Account</h1>
        {error && (
          <div className="text-sm text-red-600 mb-3">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 w-full mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="border p-2 w-full mb-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="DEVELOPER">DEVELOPER</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded py-2"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <button
          type="button"
          className="mt-3 text-sm text-blue-600"
          onClick={onShowLogin}
        >
          Back to login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
