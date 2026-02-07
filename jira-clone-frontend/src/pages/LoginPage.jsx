import { useState } from "react";
import { login } from "../api/authApi";
import { setToken } from "../utils/token";

function LoginPage({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login({ email, password });
      if (res?.error) {
        setError(res.error);
        return;
      }
      if (!res?.token) {
        setError("Invalid login response.");
        return;
      }
      setToken(res.token);
      onLogin(res.token);
    } catch (err) {
      setError("Login failed. Check email/password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        {error && (
          <div className="text-sm text-red-600 mb-3">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 w-full mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded py-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <button
          type="button"
          className="mt-3 text-sm text-blue-600"
          onClick={onShowRegister}
        >
          Create account
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
 
