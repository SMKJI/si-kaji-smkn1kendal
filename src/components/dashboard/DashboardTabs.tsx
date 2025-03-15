
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminDashboard from './AdminDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import ParentDashboard from './ParentDashboard';
import PrincipalDashboard from './PrincipalDashboard';
import CounselorDashboard from './CounselorDashboard';
import TrainerDashboard from './TrainerDashboard';
import WakaDashboard from './WakaDashboard';
import TPPKDashboard from './TPPKDashboard';
import ClassTeacherDashboard from './ClassTeacherDashboard';

interface DashboardTabsProps {
  userRole: 'admin' | 'teacher' | 'student' | 'parent' | 'principal' | 'counselor' | 'trainer' | 'waka' | 'tppk' | 'class_teacher';
  onRoleChange: (role: 'admin' | 'teacher' | 'student' | 'parent' | 'principal' | 'counselor' | 'trainer' | 'waka' | 'tppk' | 'class_teacher') => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ userRole, onRoleChange }) => {
  return (
    <Tabs defaultValue={userRole} className="w-full" onValueChange={(value) => onRoleChange(value as any)}>
      <TabsList className="mb-4 w-full md:w-auto flex flex-wrap">
        <TabsTrigger value="admin">Admin</TabsTrigger>
        <TabsTrigger value="teacher">Guru</TabsTrigger>
        <TabsTrigger value="student">Siswa</TabsTrigger>
        <TabsTrigger value="parent">Orang Tua</TabsTrigger>
        <TabsTrigger value="principal">Kepala Sekolah</TabsTrigger>
        <TabsTrigger value="counselor">Guru BK</TabsTrigger>
        <TabsTrigger value="trainer">Pelatih</TabsTrigger>
        <TabsTrigger value="waka">Waka Kesiswaan</TabsTrigger>
        <TabsTrigger value="tppk">TPPK</TabsTrigger>
        <TabsTrigger value="class_teacher">Wali Kelas</TabsTrigger>
      </TabsList>
      
      {/* Admin Dashboard */}
      <TabsContent value="admin" className="space-y-4">
        <AdminDashboard />
      </TabsContent>
      
      {/* Teacher Dashboard */}
      <TabsContent value="teacher" className="space-y-4">
        <TeacherDashboard />
      </TabsContent>
      
      {/* Student Dashboard */}
      <TabsContent value="student" className="space-y-4">
        <StudentDashboard />
      </TabsContent>
      
      {/* Parent Dashboard */}
      <TabsContent value="parent" className="space-y-4">
        <ParentDashboard />
      </TabsContent>

      {/* Principal Dashboard */}
      <TabsContent value="principal" className="space-y-4">
        <PrincipalDashboard />
      </TabsContent>

      {/* Counselor (Guru BK) Dashboard */}
      <TabsContent value="counselor" className="space-y-4">
        <CounselorDashboard />
      </TabsContent>

      {/* Trainer (Pelatih) Dashboard */}
      <TabsContent value="trainer" className="space-y-4">
        <TrainerDashboard />
      </TabsContent>

      {/* Waka Kesiswaan Dashboard */}
      <TabsContent value="waka" className="space-y-4">
        <WakaDashboard />
      </TabsContent>

      {/* TPPK Dashboard */}
      <TabsContent value="tppk" className="space-y-4">
        <TPPKDashboard />
      </TabsContent>

      {/* Class Teacher (Wali Kelas) Dashboard */}
      <TabsContent value="class_teacher" className="space-y-4">
        <ClassTeacherDashboard />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
