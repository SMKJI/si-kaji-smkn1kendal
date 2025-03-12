
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, GraduationCap, BookOpen, Award, Bell, ChevronRight, Clock, Shield, UserCheck, AlarmCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from "date-fns";
import { id } from "date-fns/locale";

const ParentPortalPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Portal Orang Tua - Si-Kaji';
  }, []);

  // Sample student data
  const student = {
    id: 123,
    name: 'Budi Santoso',
    class: 'XI RPL 2',
    photo: '',
    nisn: '0012345679',
    homeroom_teacher: 'Dian Pertiwi, M.Pd.'
  };

  // Sample attendance data
  const attendance = {
    present: 85,
    absent: 5,
    sick: 8,
    permission: 2,
    total: 100,
    last_attendance: '2023-10-10',
    month_percentage: 92
  };

  // Sample achievement data
  const achievements = [
    { id: 1, title: 'Juara 1 Lomba Web Design', date: '2023-09-15', category: 'Kompetisi', level: 'Kabupaten' },
    { id: 2, title: 'Nilai Sempurna Ujian Pemrograman', date: '2023-08-21', category: 'Akademik', level: 'Sekolah' }
  ];

  // Sample violation data
  const violations = [
    { id: 1, title: 'Terlambat masuk kelas', date: '2023-09-20', points: 5, status: 'Diproses' }
  ];

  // Sample upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Ujian Tengah Semester', date: '2023-10-16', type: 'Akademik' },
    { id: 2, title: 'Pertemuan Orang Tua', date: '2023-10-25', type: 'Rapat' }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Portal Orang Tua</h1>
              <p className="text-muted-foreground mt-1">Pantau perkembangan akademik dan kegiatan putra/putri Anda</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-3">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={student.photo} alt={student.name} />
                      <AvatarFallback className="text-2xl">
                        {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-2xl font-bold">{student.name}</h2>
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span>{student.class}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span>NISN: {student.nisn}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>Wali Kelas: {student.homeroom_teacher}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlarmCheck className="h-5 w-5 text-primary" />
                    Kehadiran
                  </CardTitle>
                  <CardDescription>
                    Bulan {format(new Date(), 'MMMM yyyy', { locale: id })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Persentase Kehadiran</span>
                        <span className="text-sm font-semibold">{attendance.month_percentage}%</span>
                      </div>
                      <Progress value={attendance.month_percentage} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-50 p-3 rounded-md">
                        <div className="text-green-700 text-xs">Hadir</div>
                        <div className="text-green-800 text-lg font-bold">{attendance.present}</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-md">
                        <div className="text-red-700 text-xs">Absen</div>
                        <div className="text-red-800 text-lg font-bold">{attendance.absent}</div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-md">
                        <div className="text-yellow-700 text-xs">Sakit</div>
                        <div className="text-yellow-800 text-lg font-bold">{attendance.sick}</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <div className="text-blue-700 text-xs">Izin</div>
                        <div className="text-blue-800 text-lg font-bold">{attendance.permission}</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Terakhir hadir: {format(new Date(attendance.last_attendance), 'dd MMMM yyyy', { locale: id })}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Lihat Detail Kehadiran
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Prestasi & Pelanggaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="achievements">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="achievements">Prestasi</TabsTrigger>
                      <TabsTrigger value="violations">Pelanggaran</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="achievements" className="mt-4 space-y-4">
                      {achievements.length > 0 ? (
                        achievements.map(achievement => (
                          <div key={achievement.id} className="p-3 bg-green-50 rounded-md">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-green-800">{achievement.title}</span>
                              <Badge variant="outline" className="text-green-700 border-green-200 bg-green-100">
                                {achievement.level}
                              </Badge>
                            </div>
                            <div className="text-xs text-green-700 mt-1">
                              {format(new Date(achievement.date), 'dd MMMM yyyy', { locale: id })}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          Belum ada data prestasi
                        </div>
                      )}
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Lihat Semua Prestasi
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="violations" className="mt-4 space-y-4">
                      {violations.length > 0 ? (
                        violations.map(violation => (
                          <div key={violation.id} className="p-3 bg-red-50 rounded-md">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-red-800">{violation.title}</span>
                              <Badge variant="outline" className="text-red-700 border-red-200 bg-red-100">
                                {violation.points} Poin
                              </Badge>
                            </div>
                            <div className="text-xs text-red-700 mt-1">
                              {format(new Date(violation.date), 'dd MMMM yyyy', { locale: id })}
                            </div>
                            <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded mt-2 inline-block">
                              Status: {violation.status}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          Tidak ada catatan pelanggaran
                        </div>
                      )}
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Lihat Semua Pelanggaran
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Jadwal Penting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="flex gap-4 p-3 bg-muted/50 rounded-md">
                        <div className="flex flex-col items-center justify-center bg-primary/10 rounded p-2 w-12 h-12">
                          <span className="text-xs text-primary font-medium">
                            {format(new Date(event.date), 'dd')}
                          </span>
                          <span className="text-xs text-primary">
                            {format(new Date(event.date), 'MMM', { locale: id })}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(event.date), 'EEEE', { locale: id })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Lihat Kalender Lengkap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ParentPortalPage;
