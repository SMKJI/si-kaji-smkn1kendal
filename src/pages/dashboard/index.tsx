
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Users, Book, CalendarCheck, FileText, MessageSquare, GraduationCap, 
  Award, UserCheck, ClipboardList, PieChart, Clock, Calendar,
  BarChart3, Shield, HelpCircle, Bell, Settings, Briefcase,
  School, FileCheck, FileEdit
} from 'lucide-react';
import { USER_ROLES } from '@/lib/constants';

const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard - Si-Kaji';
  }, []);

  // In a real app, this would come from auth context/state
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student' | 'parent' | 'principal' | 'counselor' | 'trainer' | 'waka' | 'tppk' | 'class_teacher'>('admin');

  // For demo purposes only - toggle between roles
  const toggleRole = () => {
    const roles: ('admin' | 'teacher' | 'student' | 'parent' | 'principal' | 'counselor' | 'trainer' | 'waka' | 'tppk' | 'class_teacher')[] = [
      'admin', 'teacher', 'student', 'parent', 'principal', 'counselor', 'trainer', 'waka', 'tppk', 'class_teacher'
    ];
    const currentIndex = roles.indexOf(userRole);
    const nextIndex = (currentIndex + 1) % roles.length;
    setUserRole(roles[nextIndex]);
  };

  return (
    <DashboardLayout
      title="Dashboard"
      description="Selamat datang di Si-Kaji SMKN 1 Kendal"
      userRole={userRole}
      userName={`User ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}
    >
      {/* Demo only - would be removed in production */}
      <Button onClick={toggleRole} className="mb-6">
        Ganti Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </Button>
      
      <Tabs defaultValue={userRole} className="w-full" onValueChange={(value) => setUserRole(value as any)}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/student" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Manajemen Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola data siswa, lihat profil, dan informasi terkait</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/teacher" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                    Manajemen Guru
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola data guru dan tenaga pengajar</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/class" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Book className="mr-2 h-5 w-5 text-primary" />
                    Manajemen Kelas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kelas, wali kelas, dan komposisi siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/attendance" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                    Kehadiran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pantau dan kelola kehadiran siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student-activities" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                    Kegiatan Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kegiatan dan ajuan kegiatan siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/complaint" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Pengaduan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola pengaduan dari siswa dan orang tua</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>
        
        {/* Teacher Dashboard */}
        <TabsContent value="teacher" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/attendance" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                    Kehadiran Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kehadiran siswa di kelas Anda</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/class" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Book className="mr-2 h-5 w-5 text-primary" />
                    Kelas Saya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat dan kelola kelas yang Anda ajar</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Data Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat profil dan data siswa yang Anda ajar</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/counseling" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Konseling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola jadwal konseling dengan siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student-activities" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                    Kegiatan Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola dan validasi kegiatan siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/calendar" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Kalender
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat jadwal dan agenda sekolah</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>
        
        {/* Student Dashboard */}
        <TabsContent value="student" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/attendance/me" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                    Kehadiran Saya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat riwayat kehadiran dan keterlambatan</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/class/me" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Book className="mr-2 h-5 w-5 text-primary" />
                    Kelas Saya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Informasi kelas dan mata pelajaran</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/counseling/request" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Konseling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Ajukan jadwal konseling dengan guru</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student-activities/me" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                    Kegiatan Saya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kegiatan dan ajukan kegiatan baru</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/complaint/new" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Pengaduan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Sampaikan pengaduan atau keluhan</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/calendar" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Kalender
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat jadwal pelajaran dan kegiatan</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>
        
        {/* Parent Dashboard */}
        <TabsContent value="parent" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/student/child" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Data Anak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat profil dan informasi anak</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/attendance/child" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                    Kehadiran Anak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pantau kehadiran dan keterlambatan anak</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/parent-complaint/new" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Pengaduan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Sampaikan pengaduan atau keluhan</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student-activities/child" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                    Kegiatan Anak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat kegiatan dan aktivitas anak</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/calendar" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Kalender
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat jadwal sekolah dan kegiatan</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Principal Dashboard */}
        <TabsContent value="principal" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/student" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Data Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pantau data siswa dan perkembangannya</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/teacher" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                    Data Guru
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola data guru dan tenaga pengajar</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/proposal" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <FileCheck className="mr-2 h-5 w-5 text-primary" />
                    Persetujuan Proposal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Tinjau dan setujui proposal kegiatan</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/reports" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                    Laporan & Statistik
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat laporan dan statistik sekolah</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/class-journal" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Book className="mr-2 h-5 w-5 text-primary" />
                    Jurnal Perwalian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pantau jurnal perwalian kelas</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/calendar" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Kalender Akademik
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kalender dan agenda sekolah</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Counselor (Guru BK) Dashboard */}
        <TabsContent value="counselor" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/counseling/manage" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                    Manajemen Konseling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola sesi konseling siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/counseling/session" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Sesi Konseling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Buat sesi konseling baru</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Data Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Lihat data siswa untuk keperluan konseling</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/permission" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Perizinan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola perizinan siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/calendar" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Kalender
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Jadwalkan sesi konseling</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Trainer (Pelatih) Dashboard */}
        <TabsContent value="trainer" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/extracurricular/manage" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Ekstrakurikuler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kegiatan ekstrakurikuler</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student-activities" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                    Kegiatan Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pantau kegiatan siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/calendar" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Kalender
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Jadwal latihan dan kegiatan</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Waka Kesiswaan Dashboard */}
        <TabsContent value="waka" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/student" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Manajemen Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola data siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/discipline" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="mr-2 h-5 w-5 text-primary" />
                    Pelanggaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola pelanggaran siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/extracurricular" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Ekstrakurikuler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kegiatan ekstrakurikuler</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student-activities" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                    Kegiatan Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Pantau kegiatan siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/complaint" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Pengaduan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola pengaduan siswa dan orang tua</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/reports" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                    Laporan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Laporan dan statistik kesiswaan</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* TPPK Dashboard */}
        <TabsContent value="tppk" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/complaint" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    Pengaduan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola pengaduan siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/discipline" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="mr-2 h-5 w-5 text-primary" />
                    Pencatatan Pelanggaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Catat pelanggaran siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/discipline/manage" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <FileEdit className="mr-2 h-5 w-5 text-primary" />
                    Manajemen Pelanggaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola catatan pelanggaran</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Class Teacher (Wali Kelas) Dashboard */}
        <TabsContent value="class_teacher" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/class" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Book className="mr-2 h-5 w-5 text-primary" />
                    Kelas Saya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kelas perwalian</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/student" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Data Siswa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola data siswa di kelas</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/attendance" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                    Kehadiran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola kehadiran siswa</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/class-journal" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Book className="mr-2 h-5 w-5 text-primary" />
                    Jurnal Perwalian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Kelola jurnal perwalian</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/class-journal/create" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <FileEdit className="mr-2 h-5 w-5 text-primary" />
                    Buat Jurnal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Buat jurnal perwalian baru</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/counseling" className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                    Konseling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Rujuk siswa untuk konseling</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DashboardPage;
