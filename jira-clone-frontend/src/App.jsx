import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLayout from "./layouts/AppLayout";
import AppRouter from "./router/AppRouter";
import { ProjectProvider } from "./context/ProjectContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { clearToken, getToken, isTokenExpired } from "./utils/token";

function App() {
  const [token, setToken] = useState(getToken());
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      clearToken();
      setToken(null);
      return;
    }
    function handleLogout() {
      setToken(null);
    }
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [token]);

  if (!token) {
    return (
      <BrowserRouter>
        {authMode === "login" ? (
          <LoginPage
            onLogin={setToken}
            onShowRegister={() => setAuthMode("register")}
          />
        ) : (
          <RegisterPage
            onLogin={setToken}
            onShowLogin={() => setAuthMode("login")}
          />
        )}
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <ProjectProvider>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
