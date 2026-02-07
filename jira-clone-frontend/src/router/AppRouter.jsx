import { Routes, Route } from "react-router-dom";
import IssueListPage from "../pages/IssueListPage";
import BoardPage from "../pages/BoardPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<IssueListPage />} />
      <Route path="/board" element={<BoardPage />} />
    </Routes>
  );
}

export default AppRouter;