
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  HelpCircle, MessageSquare, Users, FileText, Calendar, Shield, BarChart3, FileCheck
} from 'lucide-react';

// Stats for counselor dashboard
const statsCards = [
  { label: 'Siswa Dalam Bimbingan', value: '28', change: '+3', status: 'neutral' },
  { label: 'Sesi Konseling Bulan Ini', value: '42', change: '+7', status: 'positive' },
  { label: 'Kasus Perlu Perhatian', value: '5', change: '+2', status: 'warning' },
  { label: 'Surat Rekomendasi', value: '3', change: '0', status: 'neutral' },
];

const CounselorDashboard = () => {
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
              <p className={`text-xs ${stat.status === 'positive' ? 'text-green-500' : stat.status === 'warning' ? 'text-amber-500' : 'text-gray-500'}`}>
                {stat.change} dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-xl font-semibold mt-6">Layanan Konseling</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/counseling/manage" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                Manajemen Konseling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola sesi konseling siswa</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/counseling/session" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Buat Sesi Konseling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Jadwalkan sesi konseling baru</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/counseling/students" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Pendampingan Siswa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola pendampingan khusus siswa</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/discipline" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Monitoring Pelanggaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Pantau pelanggaran siswa</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/counseling/reports" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Laporan Evaluasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Buat laporan evaluasi konseling</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/counseling/recommendation" className="block">
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <FileCheck className="mr-2 h-5 w-5 text-primary" />
                Surat Rekomendasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Buat surat rekomendasi konseling</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      {/* Priority Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Siswa Butuh Pendampingan Segera</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Andi Pratama (X IPA 1)</h3>
                <p className="text-sm text-muted-foreground">Kasus: Sering tidak masuk sekolah (7 hari)</p>
                <p className="text-xs text-gray-500 mt-1">Laporan dari Wali Kelas</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Budi Santoso (XI IPS 2)</h3>
                <p className="text-sm text-muted-foreground">Kasus: Penurunan nilai signifikan</p>
                <p className="text-xs text-gray-500 mt-1">Laporan dari Guru Matematika</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium">Citra Dewi (XII IPA 3)</h3>
                <p className="text-sm text-muted-foreground">Kasus: Konflik dengan teman sekelas</p>
                <p className="text-xs text-gray-500 mt-1">Laporan dari Satgas TPPK</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Jadwal Konseling Hari Ini</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Dewi Safitri (X IPA 3)</h3>
                <p className="text-sm text-muted-foreground">Waktu: 09:00 - 09:45</p>
                <p className="text-xs text-gray-500 mt-1">Konseling karir</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Eko Prasetyo (XI IPA 1)</h3>
                <p className="text-sm text-muted-foreground">Waktu: 10:00 - 10:45</p>
                <p className="text-xs text-gray-500 mt-1">Konseling akademik</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Kelompok XII IPS 2</h3>
                <p className="text-sm text-muted-foreground">Waktu: 13:00 - 14:30</p>
                <p className="text-xs text-gray-500 mt-1">Konseling kelompok persiapan SNBT</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CounselorDashboard;
