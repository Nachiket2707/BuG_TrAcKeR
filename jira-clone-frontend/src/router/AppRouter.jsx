import { Routes, Route } from "react-router-dom";
import IssueListPage from "../pages/IssueListPage";
import BoardPage from "../pages/BoardPage";
import ProjectPage from "../pages/ProjectPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/" element={<IssueListPage />} />
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  );
}

export default AppRouter;
