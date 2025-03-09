
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Award, BookOpen, Calendar, User } from 'lucide-react';

const StudentProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Profil Siswa - Si-Kaji';
    
    // In a real app, we would fetch student data from an API
    // For now, let's use dummy data
    const dummyStudent = {
      id: parseInt(id),
      name: 'Andi Saputra',
      nisn: '0012345678',
      gender: 'Laki-laki',
      birthDate: '15 Mei 2006',
      address: 'Jl. Sudirman No. 123, Kendal',
      phone: '081234567890',
      email: 'andi.saputra@example.com',
      parentName: 'Budi Saputra',
      parentPhone: '081234567891',
      class: 'XII RPL 1',
      admissionYear: '2021',
      achievements: [
        { id: 1, title: 'Juara 1 Lomba Web Design Tingkat Kabupaten', year: '2022' },
        { id: 2, title: 'Juara 2 Lomba Competitive Programming', year: '2023' },
        { id: 3, title: 'Peserta Olimpiade Informatika Tingkat Provinsi', year: '2023' }
      ],
      extracurricular: [
        { id: 1, name: 'OSIS', role: 'Anggota Divisi Teknologi', year: '2021-2022' },
        { id: 2, name: 'English Club', role: 'Anggota Aktif', year: '2022-2023' },
        { id: 3, name: 'Robotik', role: 'Ketua', year: '2023-2024' }
      ],
      attendance: {
        present: 95,
        sick: 3,
        absent: 1,
        leave: 1
      }
    };
    
    setStudent(dummyStudent);
  }, [id]);

  if (!student) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            <div className="flex items-center justify-center h-full">
              <p>Loading student data...</p>
            </div>
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
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-2"
            onClick={() => navigate('/student')}
          >
            <ArrowLeft size={18} />
            Kembali ke Daftar Siswa
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src="/placeholder.svg" alt={student.name} />
                    <AvatarFallback>
                      <User size={48} />
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-bold text-center">{student.name}</h2>
                  <p className="text-muted-foreground text-center mb-2">{student.nisn}</p>
                  <p className="text-center font-medium">{student.class}</p>
                  
                  <div className="w-full mt-6">
                    <p className="text-sm text-muted-foreground mb-1">Status Siswa</p>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <p>Aktif</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
                  <TabsTrigger value="achievements">Prestasi</TabsTrigger>
                  <TabsTrigger value="extracurricular">Ekstrakurikuler</TabsTrigger>
                  <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User size={20} />
                        Data Pribadi
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Informasi Pribadi</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                              <p className="font-medium">{student.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">NISN</p>
                              <p className="font-medium">{student.nisn}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                              <p className="font-medium">{student.gender}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                              <p className="font-medium">{student.birthDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Alamat</p>
                              <p className="font-medium">{student.address}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Informasi Kontak</h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium">{student.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                              <p className="font-medium">{student.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Nama Orang Tua/Wali</p>
                              <p className="font-medium">{student.parentName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Nomor Telepon Orang Tua/Wali</p>
                              <p className="font-medium">{student.parentPhone}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award size={20} />
                        Prestasi Akademik & Non-Akademik
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {student.achievements.length > 0 ? (
                        <div className="space-y-4">
                          {student.achievements.map((achievement) => (
                            <div key={achievement.id} className="border-b pb-4 last:border-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{achievement.title}</h3>
                                  <p className="text-sm text-muted-foreground">Tahun {achievement.year}</p>
                                </div>
                                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                  {achievement.year}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Belum ada data prestasi.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="extracurricular">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen size={20} />
                        Aktivitas Ekstrakurikuler
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {student.extracurricular.length > 0 ? (
                        <div className="space-y-4">
                          {student.extracurricular.map((activity) => (
                            <div key={activity.id} className="border-b pb-4 last:border-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{activity.name}</h3>
                                  <p className="text-sm text-muted-foreground">{activity.role}</p>
                                </div>
                                <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                                  {activity.year}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Belum ada data ekstrakurikuler.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="attendance">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar size={20} />
                        Kehadiran
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Hadir</p>
                          <p className="text-2xl font-bold text-green-600">{student.attendance.present}%</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Sakit</p>
                          <p className="text-2xl font-bold text-yellow-600">{student.attendance.sick}%</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Izin</p>
                          <p className="text-2xl font-bold text-blue-600">{student.attendance.leave}%</p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">Tanpa Keterangan</p>
                          <p className="text-2xl font-bold text-red-600">{student.attendance.absent}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StudentProfilePage;
