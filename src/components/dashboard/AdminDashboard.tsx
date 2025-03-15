
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Book, CalendarCheck, FileText, MessageSquare, GraduationCap, 
  ClipboardList
} from 'lucide-react';

const AdminDashboard = () => {
  return (
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
  );
};

export default AdminDashboard;
