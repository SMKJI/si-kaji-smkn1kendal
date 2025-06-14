
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Index from "./pages/Index";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/dashboard";
import StudentProfilePage from "./pages/student/profile";
import StudentSchedulePage from "./pages/student/schedule";
import TeacherSchedulePage from "./pages/teacher/schedule";
import TeacherClassManagementPage from "./pages/teacher/class-management";
import ParentPortalDashboardPage from "./pages/parent-portal/dashboard";
import ParentPortalAcademicPage from "./pages/parent-portal/academic";
import ParentPortalAttendancePage from "./pages/parent-portal/attendance";
import ParentPortalDisciplinePage from "./pages/parent-portal/discipline";
import ParentPortalNotificationsPage from "./pages/parent-portal/notifications";
import ParentChildProfilePage from "./pages/parent-portal/child-profile";
import ComplaintPage from "./pages/complaint";
import CounselingPage from "./pages/counseling";
import PermissionPage from "./pages/permission";
import ExtracurricularPage from "./pages/extracurricular";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Student Routes */}
          <Route path="/student/profile" element={<StudentProfilePage />} />
          <Route path="/student/schedule" element={<StudentSchedulePage />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher/schedule" element={<TeacherSchedulePage />} />
          <Route path="/teacher/class-management" element={<TeacherClassManagementPage />} />
          
          {/* Parent Portal Routes */}
          <Route path="/parent-portal/dashboard" element={<ParentPortalDashboardPage />} />
          <Route path="/parent-portal/academic" element={<ParentPortalAcademicPage />} />
          <Route path="/parent-portal/attendance" element={<ParentPortalAttendancePage />} />
          <Route path="/parent-portal/discipline" element={<ParentPortalDisciplinePage />} />
          <Route path="/parent-portal/notifications" element={<ParentPortalNotificationsPage />} />
          <Route path="/parent-portal/child-profile" element={<ParentChildProfilePage />} />
          
          {/* Common Routes */}
          <Route path="/complaint" element={<ComplaintPage />} />
          <Route path="/counseling" element={<CounselingPage />} />
          <Route path="/permission" element={<PermissionPage />} />
          <Route path="/extracurricular" element={<ExtracurricularPage />} />
          
          {/* Additional routes from navItems if needed */}
          {navItems.map((item) => (
            <Route key={item.href} path={item.href} element={<Index />} />
          ))}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
