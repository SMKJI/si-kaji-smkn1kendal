
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
import CalendarPage from "@/pages/calendar";
import EventCreatePage from "@/pages/calendar/create";
import ParentComplaintPage from "@/pages/parent-complaint";
import ParentPortalPage from "@/pages/parent-portal";
import ParentPortalDashboardPage from "@/pages/parent-portal/dashboard";
import CounselingPage from "@/pages/counseling";
import CounselingManagePage from "@/pages/counseling/manage";
import CounselingSessionPage from "@/pages/counseling/session";
import PermissionPage from "@/pages/permission";
import PermissionCreatePage from "@/pages/permission/create";
import StudentDataPage from "@/pages/student-data";
import StudentProfileViewPage from "@/pages/student-data/profile";
import StudentActivitiesPage from "@/pages/student-activities";
import AnnouncementPage from "@/pages/announcement";
import ClassJournalPage from "@/pages/class-journal";
import ClassJournalCreatePage from "@/pages/class-journal/create";
import DisciplinePage from "@/pages/discipline";
import DisciplineRecordPage from "@/pages/discipline/record";
import DisciplineManagePage from "@/pages/discipline/manage";
import AchievementsPage from "@/pages/achievements";
import CertificatesPage from "@/pages/certificates";
import ExtracurricularPage from "@/pages/extracurricular";
import ExtracurricularManagePage from "@/pages/extracurricular/manage";
import SettingsPage from "@/pages/settings";
import ProposalPage from "@/pages/proposal";

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
          
          {/* Student Management */}
          <Route path="/student" element={<StudentManagementPage />} />
          <Route path="/student/:id" element={<StudentProfilePage />} />
          <Route path="/student-data" element={<StudentDataPage />} />
          <Route path="/student-data/profile" element={<StudentProfileViewPage />} />
          
          {/* Class Management */}
          <Route path="/class" element={<ClassManagementPage />} />
          <Route path="/class/:id" element={<ClassDetailPage />} />
          
          {/* Teacher Management */}
          <Route path="/teacher" element={<TeacherManagementPage />} />
          <Route path="/teacher/:id" element={<TeacherProfilePage />} />
          
          {/* Complaints */}
          <Route path="/complaint" element={<ComplaintPage />} />
          <Route path="/complaint/ticket" element={<TicketStatusPage />} />
          <Route path="/parent-complaint" element={<ParentComplaintPage />} />
          
          {/* Attendance & Calendar */}
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/calendar/create" element={<EventCreatePage />} />
          
          {/* Permissions */}
          <Route path="/permission" element={<PermissionPage />} />
          <Route path="/permission/create" element={<PermissionCreatePage />} />
          
          {/* Counseling */}
          <Route path="/counseling" element={<CounselingPage />} />
          <Route path="/counseling/manage" element={<CounselingManagePage />} />
          <Route path="/counseling/session" element={<CounselingSessionPage />} />
          <Route path="/counseling/session/:id" element={<CounselingSessionPage />} />
          
          {/* Extracurricular */}
          <Route path="/extracurricular" element={<ExtracurricularPage />} />
          <Route path="/extracurricular/manage" element={<ExtracurricularManagePage />} />
          
          {/* Proposal Approval */}
          <Route path="/proposal" element={<ProposalPage />} />
          
          {/* Parent Portal */}
          <Route path="/parent-portal" element={<ParentPortalPage />} />
          <Route path="/parent-portal/dashboard" element={<ParentPortalDashboardPage />} />
          
          {/* Student Activities */}
          <Route path="/student-activities" element={<StudentActivitiesPage />} />
          <Route path="/announcement" element={<AnnouncementPage />} />
          
          {/* Class Journal */}
          <Route path="/class-journal" element={<ClassJournalPage />} />
          <Route path="/class-journal/create" element={<ClassJournalCreatePage />} />
          
          {/* Discipline */}
          <Route path="/discipline" element={<DisciplinePage />} />
          <Route path="/discipline/record" element={<DisciplineRecordPage />} />
          <Route path="/discipline/manage" element={<DisciplineManagePage />} />
          
          {/* Achievement & Certificates */}
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          
          {/* Settings */}
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
