import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Users, Book, CalendarCheck, FileText, MessageSquare, GraduationCap, 
  Award, UserCheck, ClipboardList, PieChart, Clock, Calendar
} from 'lucide-react';

const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard - Si-Kaji';
  }, []);

  // In a real app, this would come from auth context/state
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student' | 'parent'>('admin');

  // For demo purposes only - toggle between roles
  const toggleRole = () => {
    const roles: ('admin' | 'teacher' | 'student' | 'parent')[] = ['admin', 'teacher', 'student', 'parent'];
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
        <TabsList className="mb-4 w-full md:w-auto">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="teacher">Guru</TabsTrigger>
          <TabsTrigger value="student">Siswa</TabsTrigger>
          <TabsTrigger value="parent">Orang Tua</TabsTrigger>
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
                    Kal

