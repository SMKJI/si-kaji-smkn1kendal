
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, CalendarCheck, MessageSquare, ClipboardList, Bell, Shield
} from 'lucide-react';

// Stats for parent dashboard
const statsCards = [
  { label: 'Kehadiran Bulan Ini', value: '95%', status: 'positive' },
  { label: 'Prestasi', value: '2', status: 'positive' },
  { label: 'Pelanggaran', value: '0', status: 'neutral' },
];

const ParentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.status === 'positive' ? 'text-green-500' : stat.status === 'warning' ? 'text-amber-500' : stat.status === 'negative' ? 'text-red-500' : 'text-gray-500'}`}>
                {stat.status === 'positive' ? 'Baik' : stat.status === 'warning' ? 'Perlu perhatian' : stat.status === 'negative' ? 'Perlu tindakan' : 'Tidak ada perubahan'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl font-semibold mt-6">Akses Cepat</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/parent-portal/child-profile" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Profil Anak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Lihat informasi lengkap tentang anak Anda</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/parent-portal/attendance" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                Monitoring Kehadiran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Pantau kehadiran dan keterlambatan anak</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/parent-portal/discipline" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Catatan Kedisiplinan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Lihat catatan pelanggaran dan kedisiplinan</p>
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
      </div>
      
      {/* Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Notifikasi Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bell className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Pengumuman Sekolah</h3>
                <p className="text-sm text-muted-foreground">Jadwal Kegiatan Tengah Semester telah ditetapkan</p>
                <p className="text-xs text-gray-500 mt-1">1 jam yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <CalendarCheck className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Keterlambatan</h3>
                <p className="text-sm text-muted-foreground">Anak Anda tercatat terlambat hari ini (10 menit)</p>
                <p className="text-xs text-gray-500 mt-1">3 jam yang lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Perkembangan Anak</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <ClipboardList className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Aktivitas Ekstrakurikuler</h3>
                <p className="text-sm text-muted-foreground">Anak Anda aktif berpartisipasi dalam kegiatan basket</p>
                <p className="text-xs text-gray-500 mt-1">2 hari yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium">Catatan Kedisiplinan</h3>
                <p className="text-sm text-muted-foreground">Tidak ada pelanggaran tata tertib bulan ini</p>
                <p className="text-xs text-gray-500 mt-1">1 minggu yang lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
