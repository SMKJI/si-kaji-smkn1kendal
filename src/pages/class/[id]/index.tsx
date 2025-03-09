
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ChevronLeft, Pencil, UserPlus, Users, GraduationCap, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ClassDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id || '0');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Detail Kelas ${classData?.name || ''} - Si-Kaji`;
  }, [id]);

  // Sample class data
  const classData = {
    id: classId,
    name: 'XII RPL 1',
    totalStudents: 36,
    homeroom: {
      id: 5,
      name: 'Budi Santoso, S.Pd.',
      photo: '',
      subject: 'Bahasa Indonesia',
      phoneNumber: '08123456789',
    },
    year: '2023/2024',
    description: 'Kelas jurusan Rekayasa Perangkat Lunak tingkat 3',
    schedule: [
      { day: 'Senin', subjects: ['Matematika', 'Bahasa Indonesia', 'Pemrograman Web'] },
      { day: 'Selasa', subjects: ['Basis Data', 'PBO', 'Bahasa Inggris'] },
      { day: 'Rabu', subjects: ['PKN', 'Pemrograman Mobile', 'Matematika'] },
      { day: 'Kamis', subjects: ['Pemrograman Web', 'Prakarya', 'Sejarah Indonesia'] },
      { day: 'Jumat', subjects: ['Penjaskes', 'Agama', 'Bahasa Jawa'] },
    ]
  };

  // Sample student data
  const students = [
    { id: 1, name: 'Andi Saputra', nisn: '0012345678', photo: '' },
    { id: 2, name: 'Budi Santoso', nisn: '0012345679', photo: '' },
    { id: 3, name: 'Cindy Permata', nisn: '0012345680', photo: '' },
    { id: 4, name: 'Deni Wijaya', nisn: '0012345681', photo: '' },
    { id: 5, name: 'Eka Putri', nisn: '0012345682', photo: '' },
    { id: 6, name: 'Farhan Ahmad', nisn: '0012345683', photo: '' },
    { id: 7, name: 'Gita Nirmala', nisn: '0012345684', photo: '' },
    { id: 8, name: 'Hendra Kusuma', nisn: '0012345685', photo: '' },
  ];

  if (!classData) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            <p>Kelas tidak ditemukan</p>
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
              <Link to="/class">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronLeft size={16} />
                  Kembali
                </Button>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{classData.name}</h1>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                    {classData.year}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1">{classData.description}</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Pencil size={16} />
                Edit Kelas
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wali Kelas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={classData.homeroom.photo} alt={classData.homeroom.name} />
                      <AvatarFallback className="text-lg">
                        {classData.homeroom.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link to={`/teacher/${classData.homeroom.id}`}>
                        <h3 className="font-semibold text-primary hover:underline">{classData.homeroom.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{classData.homeroom.subject}</p>
                      <p className="text-sm mt-1">{classData.homeroom.phoneNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistik Siswa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-around py-2">
                    <div className="text-center">
                      <div className="flex flex-col items-center">
                        <Users className="h-8 w-8 text-primary mb-1" />
                        <span className="text-2xl font-bold">{classData.totalStudents}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Total Siswa</p>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-col items-center">
                        <GraduationCap className="h-8 w-8 text-primary mb-1" />
                        <span className="text-2xl font-bold">98%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Kelulusan</p>
                    </div>
                    <div className="text-center">
                      <div className="flex flex-col items-center">
                        <Calendar className="h-8 w-8 text-primary mb-1" />
                        <span className="text-2xl font-bold">95%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Kehadiran</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Button className="justify-start">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Tambah Siswa
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Pencil className="mr-2 h-4 w-4" />
                    Ubah Wali Kelas
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="students" className="mt-6">
              <TabsList className="mb-4 w-full justify-start">
                <TabsTrigger value="students">Daftar Siswa</TabsTrigger>
                <TabsTrigger value="schedule">Jadwal Pelajaran</TabsTrigger>
                <TabsTrigger value="reports">Laporan Akademik</TabsTrigger>
              </TabsList>
              
              <TabsContent value="students" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Cari siswa..." className="pl-10" />
                      </div>
                      <Button className="flex items-center gap-2">
                        <UserPlus size={16} />
                        Tambah Siswa
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left font-medium">NISN</th>
                            <th className="py-3 px-4 text-left font-medium">Nama Siswa</th>
                            <th className="py-3 px-4 text-right font-medium">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student) => (
                            <tr key={student.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{student.nisn}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={student.photo} alt={student.name} />
                                    <AvatarFallback>
                                      {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {student.name}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Link to={`/student/${student.id}`}>
                                  <Button variant="link" className="h-auto p-0">Lihat Detail</Button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Jadwal Pelajaran</CardTitle>
                    <CardDescription>Jadwal pelajaran untuk kelas {classData.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left font-medium">Hari</th>
                            <th className="py-3 px-4 text-left font-medium">Mata Pelajaran</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classData.schedule.map((item, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium">{item.day}</td>
                              <td className="py-3 px-4">
                                <div className="flex flex-col gap-1">
                                  {item.subjects.map((subject, idx) => (
                                    <div key={idx} className="py-1 px-2 rounded bg-muted inline-block mr-2 mb-1">
                                      {subject}
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
              
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Laporan Akademik</CardTitle>
                    <CardDescription>Ringkasan hasil akademik kelas {classData.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Data laporan akademik akan ditampilkan di sini.
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

export default ClassDetailPage;
