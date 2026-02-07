import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import IssueDrawer from "../components/issue/IssueDrawer";
import CreateIssueModal from "../components/issue/CreateIssueModal";
import CreateProjectModal from "../components/project/CreateProjectModal";
import ProjectMembersModal from "../components/project/ProjectMembersModal";

function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <div style={{ flex: 1, padding: 20 }}>
          {children}
        </div>
      </div>

      {/* Issue Drawer (GLOBAL) */}
    
      <IssueDrawer />
      <CreateIssueModal />
      <CreateProjectModal />
      <ProjectMembersModal />
    </div>
    
  );
}

export default AppLayout;
