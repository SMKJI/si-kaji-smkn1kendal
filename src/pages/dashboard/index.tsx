
import React, { useEffect } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, GraduationCap, Users, BookOpen, Award, Bell, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard - Si-Kaji';
  }, []);

  // Sample statistics data
  const statistics = {
    students: 850,
    teachers: 45,
    classes: 21,
    attendance: 92,
    complaints: 5,
  };

  // Sample recent activities
  const activities = [
    { id: 1, type: 'Keluhan', title: 'Pengaduan fasilitas rusak', date: '1 jam yang lalu', status: 'Baru' },
    { id: 2, type: 'Siswa', title: 'Pendaftaran siswa baru', date: '3 jam yang lalu', status: 'Diproses' },
    { id: 3, type: 'Kelas', title: 'Perubahan jadwal Kelas XI RPL 1', date: '5 jam yang lalu', status: 'Selesai' },
    { id: 4, type: 'Guru', title: 'Penambahan guru baru', date: '1 hari yang lalu', status: 'Selesai' },
  ];

  // Sample upcoming events
  const events = [
    { id: 1, title: 'Ujian Tengah Semester', date: '10 Oktober 2023' },
    { id: 2, title: 'Rapat Wali Murid', date: '15 Oktober 2023' },
    { id: 3, title: 'Peringatan Hari Pahlawan', date: '10 November 2023' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Ringkasan dan statistik Sistem Informasi Akademik Sekolah</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Siswa</p>
                      <p className="text-3xl font-bold">{statistics.students}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <Link to="/student">
                    <Button variant="link" className="p-0 h-auto mt-4">
                      Lihat Detail <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Guru</p>
                      <p className="text-3xl font-bold">{statistics.teachers}</p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <Link to="/teacher">
                    <Button variant="link" className="p-0 h-auto mt-4">
                      Lihat Detail <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Kelas</p>
                      <p className="text-3xl font-bold">{statistics.classes}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <Link to="/class">
                    <Button variant="link" className="p-0 h-auto mt-4">
                      Lihat Detail <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Kehadiran</p>
                      <p className="text-3xl font-bold">{statistics.attendance}%</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <Link to="/attendance">
                    <Button variant="link" className="p-0 h-auto mt-4">
                      Lihat Detail <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
                        <div className="mt-1">
                          {activity.type === 'Keluhan' && <Bell className="h-5 w-5 text-orange-500" />}
                          {activity.type === 'Siswa' && <Users className="h-5 w-5 text-blue-500" />}
                          {activity.type === 'Kelas' && <BookOpen className="h-5 w-5 text-green-500" />}
                          {activity.type === 'Guru' && <GraduationCap className="h-5 w-5 text-purple-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{activity.title}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              activity.status === 'Baru' ? 'bg-blue-100 text-blue-800' : 
                              activity.status === 'Diproses' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {activity.status}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">{activity.type}</span>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{activity.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kalender Acara</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex gap-4 p-3 border-b last:border-0">
                        <div className="flex flex-col items-center justify-center bg-primary/10 rounded p-2 w-12 h-12">
                          <span className="text-xs text-primary font-medium">
                            {event.date.split(' ')[0]}
                          </span>
                          <span className="text-xs text-primary">
                            {event.date.split(' ')[1]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                        </div>
                      </div>
                    ))}
                    <Link to="/calendar">
                      <Button variant="outline" className="w-full mt-2">
                        Lihat Semua Acara
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="quicklinks" className="mt-6">
              <TabsList>
                <TabsTrigger value="quicklinks">Akses Cepat</TabsTrigger>
                <TabsTrigger value="reports">Laporan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quicklinks" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/complaint">
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="flex items-center gap-4 p-6">
                        <Bell className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                        <div>
                          <h3 className="font-bold">Pengaduan</h3>
                          <p className="text-sm text-muted-foreground">Buat atau pantau pengaduan</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link to="/attendance">
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="flex items-center gap-4 p-6">
                        <Calendar className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                        <div>
                          <h3 className="font-bold">Kehadiran</h3>
                          <p className="text-sm text-muted-foreground">Pantau kehadiran siswa</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link to="/academic-report">
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="flex items-center gap-4 p-6">
                        <FileText className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                        <div>
                          <h3 className="font-bold">Rapor Akademik</h3>
                          <p className="text-sm text-muted-foreground">Lihat laporan akademik</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="reports" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/academic-report">
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="flex items-center gap-4 p-6">
                        <Award className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                        <div>
                          <h3 className="font-bold">Laporan Prestasi</h3>
                          <p className="text-sm text-muted-foreground">Lihat prestasi siswa</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link to="/attendance/report">
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="flex items-center gap-4 p-6">
                        <Calendar className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                        <div>
                          <h3 className="font-bold">Laporan Kehadiran</h3>
                          <p className="text-sm text-muted-foreground">Ringkasan kehadiran</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link to="/academic-report/summary">
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="flex items-center gap-4 p-6">
                        <FileText className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
                        <div>
                          <h3 className="font-bold">Ringkasan Akademik</h3>
                          <p className="text-sm text-muted-foreground">Laporan nilai dan prestasi</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
