
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Pencil, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Clock, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TeacherProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const teacherId = parseInt(id || '0');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Profil Guru ${teacherData?.name || ''} - Si-Kaji`;
  }, [id]);

  // Sample teacher data
  const teacherData = {
    id: teacherId,
    name: 'Budi Santoso, S.Pd.',
    photo: '',
    nip: '198705132008011003',
    subject: 'Bahasa Indonesia',
    email: 'budi.santoso@example.com',
    phone: '08123456789',
    address: 'Jl. Pahlawan No. 123, Kendal',
    dateOfBirth: '13 Mei 1987',
    education: 'S1 Pendidikan Bahasa Indonesia, Universitas Negeri Semarang (2009)',
    joinDate: '1 Agustus 2010',
    status: 'PNS',
    homeroom: 'XII RPL 1',
    schedule: [
      { day: 'Senin', classes: ['X RPL 1', 'X RPL 2', 'XII RPL 1'] },
      { day: 'Selasa', classes: ['XI RPL 1', 'XI RPL 2'] },
      { day: 'Rabu', classes: ['XII RPL 2', 'XII RPL 3'] },
      { day: 'Kamis', classes: ['XI RPL 3', 'X RPL 3'] },
      { day: 'Jumat', classes: ['XII RPL 1'] },
    ],
    courses: [
      { name: 'Bahasa Indonesia', classes: ['X RPL 1', 'X RPL 2', 'XI RPL 1', 'XI RPL 2', 'XII RPL 1', 'XII RPL 2'] },
    ],
    achievements: [
      { year: '2022', title: 'Guru Teladan Tingkat Kabupaten' },
      { year: '2020', title: 'Pembimbing Lomba Debat Bahasa Indonesia Tingkat Provinsi' },
      { year: '2018', title: 'Penulis Buku Ajar Bahasa Indonesia untuk SMK' },
    ]
  };

  if (!teacherData) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            <p>Guru tidak ditemukan</p>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <Link to="/teacher">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronLeft size={16} />
                  Kembali
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={teacherData.photo} alt={teacherData.name} />
                    <AvatarFallback className="text-2xl">
                      {teacherData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div>
                        <h1 className="text-2xl font-bold">{teacherData.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{teacherData.subject}</span>
                          <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                            teacherData.status === 'PNS' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {teacherData.status}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 md:mt-0 flex items-center gap-1">
                        <Pencil size={14} />
                        Edit Profil
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{teacherData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{teacherData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{teacherData.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{teacherData.dateOfBirth}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span>Wali Kelas: {teacherData.homeroom}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Bergabung: {teacherData.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="schedule" className="mt-6">
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="schedule">Jadwal Mengajar</TabsTrigger>
                <TabsTrigger value="classes">Mata Pelajaran</TabsTrigger>
                <TabsTrigger value="achievements">Prestasi</TabsTrigger>
                <TabsTrigger value="documents">Dokumen</TabsTrigger>
              </TabsList>
              
              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Jadwal Mengajar</CardTitle>
                    <CardDescription>Jadwal mengajar untuk {teacherData.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left font-medium">Hari</th>
                            <th className="py-3 px-4 text-left font-medium">Kelas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teacherData.schedule.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{item.day}</td>
                              <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {item.classes.map((cls, idx) => (
                                    <div key={idx} className="py-1 px-2 rounded bg-muted inline-block mr-2 mb-1">
                                      {cls}
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="classes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mata Pelajaran yang Diampu</CardTitle>
                    <CardDescription>Mata pelajaran yang diampu oleh {teacherData.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {teacherData.courses.map((course, index) => (
                        <div key={index} className="border-b pb-5 last:border-b-0">
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-lg">{course.name}</h3>
                          </div>
                          <div className="pl-7">
                            <p className="mb-2 text-sm text-muted-foreground">Kelas yang diajar:</p>
                            <div className="flex flex-wrap gap-2">
                              {course.classes.map((cls, idx) => (
                                <div key={idx} className="py-1 px-3 rounded-full bg-primary/10 text-primary text-sm">
                                  {cls}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Prestasi</CardTitle>
                    <CardDescription>Prestasi dan penghargaan yang diraih oleh {teacherData.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l border-muted-foreground/20 pl-6 space-y-6 ml-2">
                      {teacherData.achievements.map((achievement, index) => (
                        <div key={index} className="relative pb-1">
                          <div className="absolute -left-8 top-1 h-4 w-4 rounded-full bg-primary"></div>
                          <div className="text-sm text-muted-foreground mb-1">{achievement.year}</div>
                          <div className="font-medium">{achievement.title}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dokumen</CardTitle>
                    <CardDescription>Dokumen dan sertifikat milik {teacherData.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Dokumen dan sertifikat akan ditampilkan di sini.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default TeacherProfilePage;
