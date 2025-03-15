
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageSquare, Shield, FileEdit, Trophy, Bell, BarChart3, Users
} from 'lucide-react';

const TPPKDashboard = () => {
  return (
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
      
      <Link to="/gamification" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Trophy className="mr-2 h-5 w-5 text-primary" />
              Sistem Gamifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kelola sistem poin dan reward siswa</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/notifications" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kirim notifikasi otomatis pelanggaran</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/reports" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Laporan Evaluasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lihat statistik dan laporan evaluasi kasus</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/student-data" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Data Siswa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Akses data lengkap siswa</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default TPPKDashboard;
