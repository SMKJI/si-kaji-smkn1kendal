
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarCheck, Shield, MessageSquare, BookOpen, Bell, FileText } from 'lucide-react';

const ParentDashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Portal Orang Tua - Si-Kaji';
  }, []);

  // Mock data for parent dashboard
  const childData = {
    name: "Ahmad Fadillah",
    class: "XII RPL 2",
    attendance: {
      present: "95%",
      absent: 2,
      late: 3
    },
    violations: 0,
    achievements: 2,
    lastUpdated: "2 jam yang lalu"
  };

  return (
    <DashboardLayout
      title="Portal Orang Tua"
      description={`Pantau perkembangan ${childData.name} di SMKN 1 Kendal`}
      userRole="parent"
      userName="Budi Santoso"
    >
      <div className="space-y-6">
        {/* Child Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Data Anak</CardTitle>
            <CardDescription>Terakhir diperbarui: {childData.lastUpdated}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Nama Lengkap</p>
                <p className="text-lg font-semibold">{childData.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Kelas</p>
                <p className="text-lg font-semibold">{childData.class}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Kehadiran</p>
                <p className="text-lg font-semibold">{childData.attendance.present}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Keterlambatan</p>
                <p className="text-lg font-semibold">{childData.attendance.late} kali</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/parent-portal/attendance" className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                  Monitoring Kehadiran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pantau kehadiran dan keterlambatan anak Anda
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/parent-portal/academic" className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  Akademik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lihat perkembangan akademik dan nilai-nilai
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/parent-portal/discipline" className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Kedisiplinan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pantau catatan kedisiplinan dan pelanggaran
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/parent-complaint" className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Pengaduan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sampaikan pengaduan atau keluhan kepada sekolah
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/permission" className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Perizinan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ajukan dan pantau status perizinan anak
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/parent-portal/notifications" className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lihat pemberitahuan penting dari sekolah
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terkini</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <CalendarCheck className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <p className="font-medium">Hadir di Sekolah</p>
                  <p className="text-sm text-muted-foreground">Hari ini, 06:45 WIB</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <p className="font-medium">Mengikuti Upacara</p>
                  <p className="text-sm text-muted-foreground">Hari ini, 07:00 WIB</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BookOpen className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <p className="font-medium">Mengumpulkan Tugas Matematika</p>
                  <p className="text-sm text-muted-foreground">Kemarin, 10:30 WIB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengumuman Sekolah</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/announcement/view" className="block hover:bg-muted/50 p-3 rounded-md transition-colors">
                <h3 className="font-medium">Jadwal Ujian Tengah Semester</h3>
                <p className="text-sm text-muted-foreground">Pelaksanaan UTS akan dimulai tanggal 15 Oktober 2023</p>
                <p className="text-xs text-gray-500 mt-1">3 hari yang lalu</p>
              </Link>
              
              <Link to="/announcement/view" className="block hover:bg-muted/50 p-3 rounded-md transition-colors">
                <h3 className="font-medium">Rapat Orang Tua Murid</h3>
                <p className="text-sm text-muted-foreground">Rapat akan diadakan pada hari Sabtu, 20 Oktober 2023</p>
                <p className="text-xs text-gray-500 mt-1">1 minggu yang lalu</p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentDashboardPage;
