
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Award, BookOpen, Calendar, User, FileText, Shield, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const StudentProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [disciplineRecords, setDisciplineRecords] = useState([
    { id: 1, date: '05 Januari 2023', type: 'Pelanggaran Ringan', description: 'Terlambat masuk kelas', points: -5 },
    { id: 2, date: '20 Februari 2023', type: 'Pelanggaran Sedang', description: 'Tidak mengerjakan tugas', points: -10 },
    { id: 3, date: '15 Maret 2023', type: 'Penghargaan', description: 'Menjadi petugas upacara', points: 15 }
  ]);
  
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

  // Achievement form schema
  const achievementFormSchema = z.object({
    title: z.string().min(5, {
      message: "Judul prestasi minimal 5 karakter",
    }),
    competitionLevel: z.string({
      required_error: "Pilih tingkat kompetisi",
    }),
    year: z.string().min(4, {
      message: "Tahun harus valid",
    }),
    description: z.string().min(10, {
      message: "Deskripsi minimal 10 karakter",
    }),
  });

  const achievementForm = useForm<z.infer<typeof achievementFormSchema>>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      title: "",
      year: new Date().getFullYear().toString(),
      description: "",
    },
  });

  function submitAchievement(values: z.infer<typeof achievementFormSchema>) {
    console.log(values);
    toast.success("Prestasi berhasil diajukan!", {
      description: "Pengajuan prestasi akan diverifikasi oleh admin",
    });
    
    // Add achievement to the student's achievements
    if (student) {
      const newAchievement = {
        id: student.achievements.length + 1,
        title: values.title,
        year: values.year,
      };
      
      setStudent({
        ...student,
        achievements: [...student.achievements, newAchievement]
      });
    }
    
    achievementForm.reset();
  }

  // Discipline record form schema
  const disciplineFormSchema = z.object({
    type: z.string({
      required_error: "Pilih jenis catatan",
    }),
    description: z.string().min(5, {
      message: "Deskripsi minimal 5 karakter",
    }),
    date: z.string().min(6, {
      message: "Masukkan tanggal kejadian",
    }),
  });

  const disciplineForm = useForm<z.infer<typeof disciplineFormSchema>>({
    resolver: zodResolver(disciplineFormSchema),
    defaultValues: {
      description: "",
      date: new Date().toISOString().split('T')[0],
    },
  });

  function submitDisciplineRecord(values: z.infer<typeof disciplineFormSchema>) {
    console.log(values);
    
    // Calculate points based on type
    let points = 0;
    if (values.type === "pelanggaran_ringan") points = -5;
    else if (values.type === "pelanggaran_sedang") points = -10;
    else if (values.type === "pelanggaran_berat") points = -20;
    else if (values.type === "penghargaan") points = 15;
    
    // Add new discipline record
    const newRecord = {
      id: disciplineRecords.length + 1,
      date: values.date,
      type: values.type === "pelanggaran_ringan" ? "Pelanggaran Ringan" :
            values.type === "pelanggaran_sedang" ? "Pelanggaran Sedang" :
            values.type === "pelanggaran_berat" ? "Pelanggaran Berat" : "Penghargaan",
      description: values.description,
      points: points
    };
    
    setDisciplineRecords([...disciplineRecords, newRecord]);
    
    toast.success("Catatan kedisiplinan berhasil ditambahkan!", {
      description: "Data akan ditinjau oleh Guru BK",
    });
    
    disciplineForm.reset();
  }

  if (!student) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
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
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
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
                <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-5">
                  <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
                  <TabsTrigger value="achievements">Prestasi</TabsTrigger>
                  <TabsTrigger value="extracurricular">Ekstrakurikuler</TabsTrigger>
                  <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
                  <TabsTrigger value="discipline">Kedisiplinan</TabsTrigger>
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
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <Award size={20} />
                          Prestasi Akademik & Non-Akademik
                        </CardTitle>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                              <PlusCircle size={16} />
                              Ajukan Prestasi
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Ajukan Prestasi Baru</DialogTitle>
                              <DialogDescription>
                                Isi formulir berikut untuk mengajukan prestasi baru. Prestasi akan diverifikasi oleh admin.
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...achievementForm}>
                              <form onSubmit={achievementForm.handleSubmit(submitAchievement)} className="space-y-4">
                                <FormField
                                  control={achievementForm.control}
                                  name="title"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Judul Prestasi</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Contoh: Juara 1 Lomba Web Design" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={achievementForm.control}
                                  name="competitionLevel"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Tingkat Kompetisi</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Pilih tingkat kompetisi" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="school">Tingkat Sekolah</SelectItem>
                                          <SelectItem value="subdistrict">Tingkat Kecamatan</SelectItem>
                                          <SelectItem value="district">Tingkat Kabupaten/Kota</SelectItem>
                                          <SelectItem value="province">Tingkat Provinsi</SelectItem>
                                          <SelectItem value="national">Tingkat Nasional</SelectItem>
                                          <SelectItem value="international">Tingkat Internasional</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={achievementForm.control}
                                  name="year"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Tahun</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Contoh: 2023" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={achievementForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Deskripsi Prestasi</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Jelaskan detail prestasi yang diraih" 
                                          className="min-h-[100px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <div className="space-y-2">
                                  <FormLabel>Unggah Bukti Prestasi</FormLabel>
                                  <Input type="file" />
                                  <FormDescription>
                                    Format PDF/JPG, maksimal 5MB
                                  </FormDescription>
                                </div>
                                
                                <DialogFooter>
                                  <Button type="submit">Ajukan Prestasi</Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </div>
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

                <TabsContent value="discipline">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <Shield size={20} />
                          Catatan Kedisiplinan
                        </CardTitle>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                              <PlusCircle size={16} />
                              Tambah Catatan
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Tambah Catatan Kedisiplinan</DialogTitle>
                              <DialogDescription>
                                Isi formulir berikut untuk menambahkan catatan kedisiplinan baru.
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...disciplineForm}>
                              <form onSubmit={disciplineForm.handleSubmit(submitDisciplineRecord)} className="space-y-4">
                                <FormField
                                  control={disciplineForm.control}
                                  name="type"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Jenis Catatan</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis catatan" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="pelanggaran_ringan">Pelanggaran Ringan (-5 poin)</SelectItem>
                                          <SelectItem value="pelanggaran_sedang">Pelanggaran Sedang (-10 poin)</SelectItem>
                                          <SelectItem value="pelanggaran_berat">Pelanggaran Berat (-20 poin)</SelectItem>
                                          <SelectItem value="penghargaan">Penghargaan (+15 poin)</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={disciplineForm.control}
                                  name="date"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Tanggal Kejadian</FormLabel>
                                      <FormControl>
                                        <Input type="date" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={disciplineForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Deskripsi</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Jelaskan detail kejadian" 
                                          className="min-h-[100px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <DialogFooter>
                                  <Button type="submit">Simpan Catatan</Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {disciplineRecords.length > 0 ? (
                        <div className="space-y-4">
                          {disciplineRecords.map((record) => (
                            <div key={record.id} className="border-b pb-4 last:border-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{record.type}</h3>
                                  <p className="text-sm">{record.description}</p>
                                  <p className="text-xs text-muted-foreground mt-1">Tanggal: {record.date}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm ${
                                  record.points > 0 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {record.points > 0 ? '+' : ''}{record.points} poin
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="pt-4 border-t">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Total Poin</span>
                              <span className="font-bold text-lg">
                                {disciplineRecords.reduce((total, record) => total + record.points, 0)} poin
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Belum ada catatan kedisiplinan.</p>
                      )}
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
