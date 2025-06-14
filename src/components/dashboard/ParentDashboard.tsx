
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, TrendingUp, CalendarCheck, Shield, MessageSquare, Bell
} from 'lucide-react';

const ParentDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link to="/parent-portal/child-progress" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Perkembangan Anak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Pantau perkembangan akademik dan perilaku anak</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/parent-portal/attendance" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
              Kehadiran Anak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lihat riwayat kehadiran dan keterlambatan anak</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/parent-portal/discipline" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Pelanggaran & Prestasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Monitor pelanggaran dan prestasi anak</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/parent-complaint" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Pengaduan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Sampaikan keluhan atau saran ke sekolah</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/parent-portal/notifications" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Terima informasi penting dari sekolah</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/parent-portal/child-profile" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <User className="mr-2 h-5 w-5 text-primary" />
              Profil Anak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lihat data lengkap profil anak</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default ParentDashboard;
