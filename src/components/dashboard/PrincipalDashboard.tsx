
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, GraduationCap, FileCheck, BarChart3, Book, Calendar
} from 'lucide-react';

const PrincipalDashboard = () => {
  return (
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
  );
};

export default PrincipalDashboard;
