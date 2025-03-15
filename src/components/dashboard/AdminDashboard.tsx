
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, Book, CalendarCheck, FileText, MessageSquare, GraduationCap, 
  Shield, Bell, Award, BarChart3, Settings
} from 'lucide-react';

// Stats cards for admin dashboard
const statsCards = [
  { label: 'Total Siswa', value: '1,234', change: '+12', status: 'positive' },
  { label: 'Kehadiran Hari Ini', value: '97%', change: '+2%', status: 'positive' },
  { label: 'Pelanggaran Bulan Ini', value: '28', change: '-5', status: 'positive' },
  { label: 'Perizinan Aktif', value: '17', change: '+3', status: 'neutral' },
];

const AdminDashboard = () => {
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
              <p className={`text-xs ${stat.status === 'positive' ? 'text-green-500' : stat.status === 'negative' ? 'text-red-500' : 'text-gray-500'}`}>
                {stat.change} dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl font-semibold mt-6">Akses Cepat</h2>
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
                Presensi & Disiplin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Pantau dan kelola kehadiran siswa</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/complaint" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Pengaduan & Kasus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola pengaduan dari siswa dan orang tua</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/permission" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Perizinan & Dispensasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola perizinan dan dispensasi siswa</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      {/* Recent Activities & Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Notifikasi & Persetujuan Tertunda</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Persetujuan Perizinan</h3>
                <p className="text-sm text-muted-foreground">5 permohonan izin baru memerlukan persetujuan</p>
                <p className="text-xs text-gray-500 mt-1">10 menit yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Pengaduan Baru</h3>
                <p className="text-sm text-muted-foreground">2 pengaduan baru dari orang tua siswa</p>
                <p className="text-xs text-gray-500 mt-1">1 jam yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Award className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium">Proposal Kegiatan</h3>
                <p className="text-sm text-muted-foreground">Proposal kegiatan OSIS menunggu persetujuan</p>
                <p className="text-xs text-gray-500 mt-1">3 jam yang lalu</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Laporan Pelanggaran</h3>
                <p className="text-sm text-muted-foreground">3 pelanggaran baru dilaporkan oleh guru</p>
                <p className="text-xs text-gray-500 mt-1">6 jam yang lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Pendaftaran Siswa Baru</h3>
                <p className="text-sm text-muted-foreground">7 siswa baru telah terdaftar dalam sistem</p>
                <p className="text-xs text-gray-500 mt-1">Hari ini, 08:30</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bell className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">Pengumuman Dibuat</h3>
                <p className="text-sm text-muted-foreground">Pengumuman "Jadwal UTS Semester Genap" telah dipublikasikan</p>
                <p className="text-xs text-gray-500 mt-1">Hari ini, 09:45</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Settings className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-medium">Konfigurasi Sistem</h3>
                <p className="text-sm text-muted-foreground">Perubahan pada pengaturan notifikasi sistem</p>
                <p className="text-xs text-gray-500 mt-1">Kemarin, 15:20</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Laporan Bulanan</h3>
                <p className="text-sm text-muted-foreground">Laporan kehadiran bulan Mei telah dihasilkan</p>
                <p className="text-xs text-gray-500 mt-1">Kemarin, 16:30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
