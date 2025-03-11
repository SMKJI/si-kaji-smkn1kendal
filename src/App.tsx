
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports
import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import NotFoundPage from "@/pages/not-found";
import StudentManagementPage from "@/pages/student";
import StudentProfilePage from "@/pages/student/[id]";
import ClassManagementPage from "@/pages/class";
import ClassDetailPage from "@/pages/class/[id]";
import TeacherManagementPage from "@/pages/teacher";
import TeacherProfilePage from "@/pages/teacher/[id]";
import ComplaintPage from "@/pages/complaint";
import TicketStatusPage from "@/pages/complaint/ticket";
import DashboardPage from "@/pages/dashboard";
import AttendancePage from "@/pages/attendance";
import AcademicReportPage from "@/pages/academic-report";
import CalendarPage from "@/pages/calendar";
import ParentComplaintPage from "@/pages/parent-complaint";
import ParentPortalPage from "@/pages/parent-portal";
import CounselingPage from "@/pages/counseling";
import PermissionPage from "@/pages/permission";
import StudentDataPage from "@/pages/student-data";
import PermissionRequestPage from "@/pages/permission-request";
import StudentActivitiesPage from "@/pages/student-activities";
import SchedulePage from "@/pages/schedule";
import FacilityManagementPage from "@/pages/facility";
import AnnouncementPage from "@/pages/announcement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/student" element={<StudentManagementPage />} />
          <Route path="/student/:id" element={<StudentProfilePage />} />
          <Route path="/student-data" element={<StudentDataPage />} />
          <Route path="/class" element={<ClassManagementPage />} />
          <Route path="/class/:id" element={<ClassDetailPage />} />
          <Route path="/teacher" element={<TeacherManagementPage />} />
          <Route path="/teacher/:id" element={<TeacherProfilePage />} />
          <Route path="/complaint" element={<ComplaintPage />} />
          <Route path="/complaint/ticket" element={<TicketStatusPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/academic-report" element={<AcademicReportPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/parent-complaint" element={<ParentComplaintPage />} />
          <Route path="/parent-portal" element={<ParentPortalPage />} />
          <Route path="/counseling" element={<CounselingPage />} />
          <Route path="/permission" element={<PermissionPage />} />
          <Route path="/permission-request" element={<PermissionRequestPage />} />
          <Route path="/student-activities" element={<StudentActivitiesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/facility" element={<FacilityManagementPage />} />
          <Route path="/announcement" element={<AnnouncementPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
