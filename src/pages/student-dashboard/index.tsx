
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarCheck, FileText, MessageSquare, Shield, Award, Calendar, Book } from 'lucide-react';

const StudentDashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard Siswa - Si-Kaji';
  }, []);

  // Mock data for student
  const studentData = {
    name: "Ahmad Fadillah",
    class: "XII RPL 2",
    nisn: "00123456789",
    attendance: {
      present: 95,
      absent: 2,
      late: 3
    },
    violations: 0,
    achievements: 2,
    assignments: 5
  };

  return (
    <DashboardLayout
      title={`Selamat Datang, ${studentData.name}`}
      description={`Kelas ${studentData.class} | NISN: ${studentData.nisn}`}
      userRole="student"
      userName={studentData.name}
    >
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Kehadiran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.attendance.present}%</div>
              <p className="text-xs text-green-500">
                Bulan ini
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Keterlambatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.attendance.late}</div>
              <p className="text-xs text-amber-500">
                Bulan ini
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pelanggaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.violations}</div>
              <p className="text-xs text-green-500">
                Semester ini
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Prestasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.achievements}</div>
              <p className="text-xs text-green-500">
                Semester ini
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Tabs */}
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="academic">Akademik</TabsTrigger>
            <TabsTrigger value="permits">Perizinan</TabsTrigger>
            <TabsTrigger value="activities">Kegiatan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/attendance/me" className="block">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
                      Kehadiran Saya
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Lihat riwayat kehadiran dan keterlambatan</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/schedule" className="block">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Book className="mr-2 h-5 w-5 text-primary" />
                      Jadwal Pelajaran
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Lihat jadwal pelajaran harian dan mingguan</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="permits" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/permission/create" className="block">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      Buat Izin Baru
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Ajukan izin tidak masuk atau keluar kelas</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/permission" className="block">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      Riwayat Izin
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Lihat status dan riwayat izin Anda</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/student-activities" className="block">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Kegiatan Siswa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Lihat dan daftar kegiatan ekstrakurikuler</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/counseling/request" className="block">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                      Konseling
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Ajukan jadwal konseling dengan guru BK</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        {/* Announcements and Upcoming */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengumuman Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/announcement/view" className="block hover:bg-muted/50 p-3 rounded-md transition-colors">
                <h3 className="font-medium">Jadwal Ujian Tengah Semester</h3>
                <p className="text-sm text-muted-foreground">Pelaksanaan UTS akan dimulai tanggal 15 Oktober 2023</p>
                <p className="text-xs text-gray-500 mt-1">3 hari yang lalu</p>
              </Link>
              
              <Link to="/announcement/view" className="block hover:bg-muted/50 p-3 rounded-md transition-colors">
                <h3 className="font-medium">Lomba Debat Bahasa Inggris</h3>
                <p className="text-sm text-muted-foreground">Pendaftaran lomba debat bahasa Inggris dibuka sampai 12 Oktober</p>
                <p className="text-xs text-gray-500 mt-1">1 minggu yang lalu</p>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Mendatang</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded text-center min-w-[50px]">
                  <div className="text-lg font-bold">12</div>
                  <div className="text-xs">Okt</div>
                </div>
                <div>
                  <h3 className="font-medium">Rapat OSIS</h3>
                  <p className="text-sm text-muted-foreground">14:00 - 15:30 di Ruang OSIS</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded text-center min-w-[50px]">
                  <div className="text-lg font-bold">15</div>
                  <div className="text-xs">Okt</div>
                </div>
                <div>
                  <h3 className="font-medium">Ujian Tengah Semester</h3>
                  <p className="text-sm text-muted-foreground">07:30 - 12:00 di Kelas Masing-masing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboardPage;
