
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Award, ClipboardList, Calendar, FileEdit, Users, FileText
} from 'lucide-react';

const TrainerDashboard = () => {
  return (
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
      
      <Link to="/extracurricular/journal" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <FileEdit className="mr-2 h-5 w-5 text-primary" />
              Jurnal Ekstrakurikuler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Catat dokumentasi dan jurnal kegiatan</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/extracurricular/attendance" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Presensi Peserta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kelola kehadiran peserta ekstrakurikuler</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/extracurricular/training" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Program Latihan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Rencanakan program latihan ekstrakurikuler</p>
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
  );
};

export default TrainerDashboard;
