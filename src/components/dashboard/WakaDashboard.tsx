
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Shield, Award, ClipboardList, MessageSquare, BarChart3
} from 'lucide-react';

const WakaDashboard = () => {
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
  );
};

export default WakaDashboard;
