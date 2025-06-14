
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import ParentPortalAttendancePage from "@/pages/parent-portal/attendance";
import ParentPortalDisciplinePage from "@/pages/parent-portal/discipline";
import ParentPortalNotificationsPage from "@/pages/parent-portal/notifications";
import CounselingPage from "@/pages/counseling";
import CounselingManagePage from "@/pages/counseling/manage";
import CounselingSessionPage from "@/pages/counseling/session";
import CounselingRequestPage from "@/pages/counseling/request"; 
import PermissionPage from "@/pages/permission";
import PermissionCreatePage from "@/pages/permission/create";
import StudentDataPage from "@/pages/student-data";
import StudentProfileViewPage from "@/pages/student-data/profile";
import StudentActivitiesPage from "@/pages/student-activities";
import AnnouncementPage from "@/pages/announcement";
import AnnouncementManagePage from "@/pages/announcement/manage";
import AnnouncementViewPage from "@/pages/announcement/view";
import ClassJournalPage from "@/pages/class-journal";
import ClassJournalCreatePage from "@/pages/class-journal/create";
import DisciplinePage from "@/pages/discipline";
import DisciplineRecordPage from "@/pages/discipline/record";
import DisciplineManagePage from "@/pages/discipline/manage";
import AchievementsPage from "@/pages/achievements";
import CertificatesPage from "@/pages/certificates";
import ExtracurricularPage from "@/pages/extracurricular";
import ExtracurricularManagePage from "@/pages/extracurricular/manage";
import ExtracurricularJournalPage from "@/pages/extracurricular/journal";
import ExtracurricularAttendancePage from "@/pages/extracurricular/attendance";
import ExtracurricularTrainingPage from "@/pages/extracurricular/training";
import SettingsPage from "@/pages/settings";
import ProposalPage from "@/pages/proposal";
import ReportsPage from "@/pages/reports";
import GamificationPage from "@/pages/gamification";
import NotificationsPage from "@/pages/notifications";
import ChildAttendancePage from "@/pages/attendance/child";
import StudentAttendancePage from "@/pages/attendance/me";

// New pages
import StudentMyProfilePage from "@/pages/student/profile";
import StudentSchedulePage from "@/pages/student/schedule";
import TeacherSchedulePage from "@/pages/teacher/schedule";
import TeacherClassManagementPage from "@/pages/teacher/class-management";
import ParentChildProgressPage from "@/pages/parent/child-progress";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendered");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Student Management */}
            <Route path="/student" element={<StudentManagementPage />} />
            <Route path="/student/:id" element={<StudentProfilePage />} />
            <Route path="/student/profile" element={<StudentMyProfilePage />} />
            <Route path="/student/schedule" element={<StudentSchedulePage />} />
            <Route path="/student-data" element={<StudentDataPage />} />
            <Route path="/student-data/profile" element={<StudentProfileViewPage />} />
            
            {/* Class Management */}
            <Route path="/class" element={<ClassManagementPage />} />
            <Route path="/class/:id" element={<ClassDetailPage />} />
            <Route path="/class/documents" element={<ClassManagementPage />} />
            <Route path="/class/transfer" element={<ClassManagementPage />} />
            <Route path="/class/evaluation" element={<ClassManagementPage />} />
            <Route path="/class/behavior" element={<ClassManagementPage />} />
            
            {/* Teacher Management */}
            <Route path="/teacher" element={<TeacherManagementPage />} />
            <Route path="/teacher/:id" element={<TeacherProfilePage />} />
            <Route path="/teacher/schedule" element={<TeacherSchedulePage />} />
            <Route path="/teacher/class-management" element={<TeacherClassManagementPage />} />
            
            {/* Academic Data */}
            <Route path="/academic" element={<StudentManagementPage />} />
            <Route path="/learning-activities" element={<StudentManagementPage />} />
            <Route path="/schedule" element={<CalendarPage />} />
            
            {/* System Management */}
            <Route path="/user-management" element={<StudentManagementPage />} />
            <Route path="/user-management/access" element={<StudentManagementPage />} />
            <Route path="/system/security" element={<SettingsPage />} />
            <Route path="/system/maintenance" element={<SettingsPage />} />
            <Route path="/system/monitoring" element={<SettingsPage />} />
            <Route path="/centralized-data" element={<StudentManagementPage />} />
            
            {/* Policies and Strategic Decisions */}
            <Route path="/policies" element={<SettingsPage />} />
            <Route path="/policies/recommendations" element={<SettingsPage />} />
            <Route path="/strategic-decisions" element={<SettingsPage />} />
            
            {/* Complaints */}
            <Route path="/complaint" element={<ComplaintPage />} />
            <Route path="/complaint/ticket" element={<TicketStatusPage />} />
            <Route path="/complaint/anonymous" element={<ComplaintPage />} />
            <Route path="/parent-complaint" element={<ParentComplaintPage />} />
            
            {/* Attendance & Calendar */}
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/attendance/child" element={<ChildAttendancePage />} />
            <Route path="/attendance/me" element={<StudentAttendancePage />} />
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
            <Route path="/counseling/request" element={<CounselingRequestPage />} />
            <Route path="/counseling/students" element={<CounselingPage />} />
            <Route path="/counseling/reports" element={<ReportsPage />} />
            <Route path="/counseling/recommendation" element={<CertificatesPage />} />
            <Route path="/counseling/individual" element={<CounselingPage />} />
            <Route path="/counseling/group" element={<CounselingPage />} />
            <Route path="/counseling/mediation" element={<CounselingPage />} />
            
            {/* Extracurricular */}
            <Route path="/extracurricular" element={<ExtracurricularPage />} />
            <Route path="/extracurricular/manage" element={<ExtracurricularManagePage />} />
            <Route path="/extracurricular/journal" element={<ExtracurricularJournalPage />} />
            <Route path="/extracurricular/attendance" element={<ExtracurricularAttendancePage />} />
            <Route path="/extracurricular/training" element={<ExtracurricularTrainingPage />} />
            <Route path="/extracurricular/my-attendance" element={<ExtracurricularAttendancePage />} />
            <Route path="/extracurricular/schedule" element={<CalendarPage />} />
            
            {/* Proposal Approval */}
            <Route path="/proposal" element={<ProposalPage />} />
            <Route path="/student-activities/proposal" element={<ProposalPage />} />
            
            {/* TPPK Specific Routes */}
            <Route path="/gamification" element={<GamificationPage />} />
            <Route path="/reward" element={<GamificationPage />} />
            <Route path="/verification/teacher" element={<TeacherManagementPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/notifications/violations" element={<NotificationsPage />} />
            <Route path="/student/notifications" element={<NotificationsPage />} />
            
            {/* Parent Portal */}
            <Route path="/parent-portal" element={<ParentPortalPage />} />
            <Route path="/parent-portal/dashboard" element={<ParentPortalDashboardPage />} />
            <Route path="/parent-portal/attendance" element={<ParentPortalAttendancePage />} />
            <Route path="/parent-portal/discipline" element={<ParentPortalDisciplinePage />} />
            <Route path="/parent-portal/notifications" element={<ParentPortalNotificationsPage />} />
            <Route path="/parent-portal/child-progress" element={<ParentChildProgressPage />} />
            <Route path="/parent-portal/reports" element={<ReportsPage />} />
            <Route path="/parent-portal/child-profile" element={<StudentProfileViewPage />} />
            <Route path="/parent-portal/academic" element={<ParentPortalAttendancePage />} />
            <Route path="/parent-portal/late-history" element={<ParentPortalAttendancePage />} />
            <Route path="/parent-portal/messages" element={<ParentPortalNotificationsPage />} />
            
            {/* Student Activities */}
            <Route path="/student-activities" element={<StudentActivitiesPage />} />
            
            {/* Announcements */}
            <Route path="/announcement" element={<AnnouncementPage />} />
            <Route path="/announcement/manage" element={<AnnouncementManagePage />} />
            <Route path="/announcement/view" element={<AnnouncementViewPage />} />
            
            {/* Class Journal */}
            <Route path="/class-journal" element={<ClassJournalPage />} />
            <Route path="/class-journal/create" element={<ClassJournalCreatePage />} />
            
            {/* Discipline */}
            <Route path="/discipline" element={<DisciplinePage />} />
            <Route path="/discipline/record" element={<DisciplineRecordPage />} />
            <Route path="/discipline/manage" element={<DisciplineManagePage />} />
            
            {/* Achievement & Certificates */}
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/achievements/create" element={<AchievementsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/certificates/request" element={<CertificatesPage />} />
            
            {/* Reports & Statistics */}
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/activities" element={<ReportsPage />} />
            
            {/* Settings */}
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
