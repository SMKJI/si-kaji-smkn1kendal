
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
          <Route path="/class" element={<ClassManagementPage />} />
          <Route path="/class/:id" element={<ClassDetailPage />} />
          <Route path="/teacher" element={<TeacherManagementPage />} />
          <Route path="/teacher/:id" element={<TeacherProfilePage />} />
          <Route path="/complaint" element={<ComplaintPage />} />
          <Route path="/complaint/ticket" element={<TicketStatusPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/academic-report" element={<AcademicReportPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
