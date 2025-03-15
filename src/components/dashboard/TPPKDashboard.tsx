
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageSquare, Shield, FileEdit, Trophy, Bell, BarChart3, Users, ClipboardList, FileText
} from 'lucide-react';

// Stats for TPPK dashboard
const statsCards = [
  { label: 'Kasus Aktif', value: '12', change: '+2', status: 'warning' },
  { label: 'Pelanggaran Bulan Ini', value: '23', change: '-7', status: 'positive' },
  { label: 'Pengaduan Baru', value: '5', change: '+3', status: 'warning' },
  { label: 'Kasus Selesai', value: '45', change: '+12', status: 'positive' },
];

const TPPKDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.status === 'positive' ? 'text-green-500' : stat.status === 'warning' ? 'text-amber-500' : 'text-red-500'}`}>
                {stat.change} dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl font-semibold mt-6">Penanganan Kasus</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/complaint" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Monitoring Pengaduan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola pengaduan siswa yang masuk</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/tppk/cases" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <ClipboardList className="mr-2 h-5 w-5 text-primary" />
                Tindak Lanjut Kasus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tindak lanjut dan penanganan kasus</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/discipline" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Pelanggaran Tata Tertib
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Catat dan pantau pelanggaran siswa</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/discipline/manage" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <FileEdit className="mr-2 h-5 w-5 text-primary" />
                Catat Pelanggaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Catat pelanggaran baru</p>
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
              <p className="text-sm text-muted-foreground">Kelola poin dan reward siswa</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/notifications" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Kirim Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kirim notifikasi pelanggaran</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      {/* Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Pengaduan Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Laporan Bullying</h3>
                <p className="text-sm text-muted-foreground">Pengaduan tentang bullying di kelas X IPA 2</p>
                <p className="text-xs text-gray-500 mt-1">30 menit yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Kehilangan Barang</h3>
                <p className="text-sm text-muted-foreground">Laporan kehilangan laptop di ruang multimedia</p>
                <p className="text-xs text-gray-500 mt-1">2 jam yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Kerusakan Fasilitas</h3>
                <p className="text-sm text-muted-foreground">Laporan kerusakan proyektor di kelas XI IPS 1</p>
                <p className="text-xs text-gray-500 mt-1">5 jam yang lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Status Penanganan Kasus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Kasus Perselisihan Siswa</h3>
                <p className="text-sm text-muted-foreground">Status: <span className="text-green-500 font-medium">Selesai</span></p>
                <p className="text-xs text-gray-500 mt-1">Ditutup kemarin</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Kasus Intimidasi</h3>
                <p className="text-sm text-muted-foreground">Status: <span className="text-amber-500 font-medium">Proses Mediasi</span></p>
                <p className="text-xs text-gray-500 mt-1">Ditangani oleh Tim BK</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Kasus Vandalisme</h3>
                <p className="text-sm text-muted-foreground">Status: <span className="text-red-500 font-medium">Investigasi</span></p>
                <p className="text-xs text-gray-500 mt-1">Ditindaklanjuti dengan CCTV</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TPPKDashboard;
