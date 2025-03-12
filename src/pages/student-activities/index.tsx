
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { CalendarPlus, Search, Filter, Clock, ClipboardList, CalendarCheck, FileText, Users, Calendar, CheckCircle2, XCircle, FileImage, Clipboard, ListChecks, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const StudentActivitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Administrasi Kegiatan Siswa - Si-Kaji';
  }, []);

  const [filter, setFilter] = useState('all');

  // Sample activities data
  const activities = [
    {
      id: 'ACT001',
      title: 'Pekan Olahraga dan Seni',
      organizer: 'OSIS',
      date: '15-20 Oktober 2023',
      status: 'Disetujui',
      location: 'Lapangan SMKN 1 Kendal',
      description: 'Kegiatan tahunan yang meliputi berbagai cabang olahraga dan pentas seni siswa.',
      pic: 'Andi Saputra (XII RPL 1)',
      type: 'Eksternal'
    },
    {
      id: 'ACT002',
      title: 'Workshop Pemrograman Web',
      organizer: 'Ekstrakurikuler Coding',
      date: '25 Oktober 2023',
      status: 'Pending',
      location: 'Lab Komputer 2',
      description: 'Workshop pemrograman web dasar menggunakan HTML, CSS, dan JavaScript untuk siswa RPL.',
      pic: 'Deni Wijaya (XII RPL 2)',
      type: 'Internal'
    },
    {
      id: 'ACT003',
      title: 'Kunjungan Industri PT Telkom',
      organizer: 'Jurusan RPL',
      date: '5 November 2023',
      status: 'Disetujui',
      location: 'PT Telkom Kendal',
      description: 'Kunjungan industri untuk mengenal lebih dekat dunia kerja di bidang IT.',
      pic: 'Budi Santoso (Guru)',
      type: 'Eksternal'
    },
    {
      id: 'ACT004',
      title: 'Rapat Persiapan HUT Sekolah',
      organizer: 'OSIS',
      date: '10 November 2023',
      status: 'Ditolak',
      location: 'Ruang OSIS',
      description: 'Rapat koordinasi persiapan perayaan HUT SMKN 1 Kendal ke-25.',
      pic: 'Cindy Permata (XII RPL 2)',
      type: 'Internal'
    },
  ];

  // Sample facility requests data
  const facilityRequests = [
    {
      id: 'FAC001',
      activity: 'Workshop Pemrograman Web',
      facility: 'Lab Komputer 2',
      date: '25 Oktober 2023',
      time: '09:00 - 12:00',
      status: 'Disetujui',
      approved_by: 'Tono Wijaya, S.T.'
    },
    {
      id: 'FAC002',
      activity: 'Latihan Drama Pentas Seni',
      facility: 'Aula Sekolah',
      date: '18 Oktober 2023',
      time: '14:00 - 16:00',
      status: 'Pending',
      approved_by: '-'
    },
    {
      id: 'FAC003',
      activity: 'Rapat OSIS',
      facility: 'Ruang OSIS',
      date: '10 November 2023',
      time: '13:00 - 15:00',
      status: 'Ditolak',
      approved_by: 'Ani Suryani, S.Pd.'
    },
  ];

  // Sample activity reports data
  const activityReports = [
    {
      id: 'REP001',
      activity: 'Kunjungan Industri PT XYZ',
      date: '15 September 2023',
      submitted_by: 'Budi Santoso (Guru)',
      status: 'Submitted',
      documents: ['laporan_kegiatan.pdf', 'foto_kegiatan.zip']
    },
    {
      id: 'REP002',
      activity: 'Lomba Debat Bahasa Inggris',
      date: '28 September 2023',
      submitted_by: 'Ani Suryani, S.Pd.',
      status: 'Reviewed',
      documents: ['laporan_lomba.pdf', 'sertifikat.pdf']
    },
  ];

  // Sample activity submissions
  const activitySubmissions = [
    {
      id: 'SUB001',
      title: 'Pelatihan Leadership untuk OSIS',
      submitter: 'Andi Saputra',
      date: '2023-10-12',
      status: 'Pending',
      type: 'Workshop',
      target: 'Pengurus OSIS'
    },
    {
      id: 'SUB002',
      title: 'Webinar Karir di Bidang IT',
      submitter: 'Budi Santoso',
      date: '2023-10-05',
      status: 'Disetujui',
      type: 'Webinar',
      target: 'Kelas XII RPL'
    },
    {
      id: 'SUB003',
      title: 'Kompetisi Desain Grafis',
      submitter: 'Cindy Permata',
      date: '2023-09-28',
      status: 'Ditolak',
      type: 'Kompetisi',
      target: 'Seluruh Siswa'
    }
  ];

  const formSchema = z.object({
    title: z.string().min(5, {
      message: "Judul kegiatan minimal 5 karakter",
    }),
    type: z.string({
      required_error: "Pilih jenis kegiatan",
    }),
    organizer: z.string().min(3, {
      message: "Nama penyelenggara minimal 3 karakter",
    }),
    location: z.string().min(3, {
      message: "Lokasi harus diisi",
    }),
    date: z.string().min(3, {
      message: "Tanggal kegiatan harus diisi",
    }),
    description: z.string().min(10, {
      message: "Deskripsi kegiatan minimal 10 karakter",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      organizer: "",
      location: "",
      date: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Kegiatan berhasil diajukan!", {
      description: "Ajuan kegiatan Anda akan segera diproses",
    });
  }

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => 
        filter === 'approved' 
          ? activity.status === 'Disetujui' 
          : filter === 'pending' 
            ? activity.status === 'Pending' 
            : activity.status === 'Ditolak'
      );

  const getStatusColor = (status: string) => {
    const statusColors = {
      'Disetujui': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Ditolak': 'bg-red-100 text-red-800',
      'Submitted': 'bg-blue-100 text-blue-800',
      'Reviewed': 'bg-purple-100 text-purple-800',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Administrasi Kegiatan Siswa</h1>
                <p className="text-muted-foreground mt-1">Kelola kegiatan, peminjaman fasilitas, dan laporan kegiatan</p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ListChecks size={18} />
                      Monitoring Ajuan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Monitoring Ajuan Kegiatan</DialogTitle>
                      <DialogDescription>
                        Lihat status pengajuan kegiatan yang telah Anda kirimkan
                      </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-y-auto max-h-[60vh]">
                      <div className="space-y-4">
                        {activitySubmissions.map((submission) => (
                          <Card key={submission.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold">{submission.title}</h3>
                                  <div className="flex flex-col md:flex-row text-xs text-muted-foreground gap-2 md:gap-4 mt-1">
                                    <span className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      {format(new Date(submission.date), 'dd MMMM yyyy')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Users size={12} />
                                      Target: {submission.target}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clipboard size={12} />
                                      Jenis: {submission.type}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <Badge className={getStatusColor(submission.status)}>
                                    {submission.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="mt-3 pt-3 border-t">
                                <div className="flex justify-between text-xs">
                                  <span>ID: {submission.id}</span>
                                  <span>Diajukan oleh: {submission.submitter}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <CalendarPlus size={18} />
                      Ajukan Kegiatan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Ajukan Kegiatan Baru</DialogTitle>
                      <DialogDescription>
                        Isi formulir berikut untuk mengajukan kegiatan baru
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Judul Kegiatan</FormLabel>
                                <FormControl>
                                  <Input placeholder="Masukkan judul kegiatan" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Jenis Kegiatan</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih jenis kegiatan" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="workshop">Workshop</SelectItem>
                                    <SelectItem value="competition">Kompetisi</SelectItem>
                                    <SelectItem value="exhibition">Pameran</SelectItem>
                                    <SelectItem value="community_service">Bakti Sosial</SelectItem>
                                    <SelectItem value="seminar">Seminar</SelectItem>
                                    <SelectItem value="other">Lainnya</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="organizer"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Penyelenggara</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nama penyelenggara kegiatan" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lokasi</FormLabel>
                                <FormControl>
                                  <Input placeholder="Lokasi kegiatan" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tanggal Kegiatan</FormLabel>
                                <FormControl>
                                  <Input placeholder="Format: DD/MM/YYYY atau periode" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Contoh: 25/11/2023 atau 25-30 November 2023
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="space-y-2">
                            <FormLabel>Unggah Proposal</FormLabel>
                            <Input type="file" />
                            <FormDescription>
                              Format PDF, maksimal 5MB
                            </FormDescription>
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deskripsi Kegiatan</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Jelaskan rincian kegiatan, tujuan, dan target peserta"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <DialogFooter>
                          <Button type="submit" className="flex items-center gap-2">
                            <Upload size={16} />
                            Ajukan Kegiatan
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Tabs defaultValue="activities" className="mt-4">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="activities">Daftar Kegiatan</TabsTrigger>
                <TabsTrigger value="facilities">Peminjaman Fasilitas</TabsTrigger>
                <TabsTrigger value="reports">Laporan Kegiatan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activities">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Cari kegiatan..."
                          className="pl-10"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Select
                          defaultValue="all"
                          onValueChange={(value) => setFilter(value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="approved">Disetujui</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Ditolak</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredActivities.map((activity) => (
                        <Card key={activity.id} className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="flex gap-2 items-center text-xl">
                                  {activity.title}
                                </CardTitle>
                                <CardDescription className="mt-1">
                                  {activity.organizer} • {activity.date}
                                </CardDescription>
                              </div>
                              <Badge className={getStatusColor(activity.status)}>
                                {activity.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium mb-1">Lokasi</p>
                                <p className="text-sm">{activity.location}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">Penanggung Jawab</p>
                                <p className="text-sm">{activity.pic}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-sm font-medium mb-1">Deskripsi</p>
                                <p className="text-sm">{activity.description}</p>
                              </div>
                            </div>
                            <div className="flex justify-end mt-4">
                              <Button variant="outline" size="sm">Lihat Detail</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="facilities">
                <Card>
                  <CardHeader>
                    <CardTitle>Peminjaman Fasilitas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left font-medium">ID</th>
                            <th className="py-3 px-4 text-left font-medium">Kegiatan</th>
                            <th className="py-3 px-4 text-left font-medium">Fasilitas</th>
                            <th className="py-3 px-4 text-left font-medium">Tanggal</th>
                            <th className="py-3 px-4 text-left font-medium">Waktu</th>
                            <th className="py-3 px-4 text-center font-medium">Status</th>
                            <th className="py-3 px-4 text-right font-medium">Disetujui Oleh</th>
                          </tr>
                        </thead>
                        <tbody>
                          {facilityRequests.map((request) => (
                            <tr key={request.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{request.id}</td>
                              <td className="py-3 px-4">{request.activity}</td>
                              <td className="py-3 px-4">{request.facility}</td>
                              <td className="py-3 px-4">{request.date}</td>
                              <td className="py-3 px-4">{request.time}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(request.status)}`}>
                                  {request.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">{request.approved_by}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Laporan Kegiatan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left font-medium">ID</th>
                            <th className="py-3 px-4 text-left font-medium">Kegiatan</th>
                            <th className="py-3 px-4 text-left font-medium">Tanggal</th>
                            <th className="py-3 px-4 text-left font-medium">Diajukan Oleh</th>
                            <th className="py-3 px-4 text-center font-medium">Status</th>
                            <th className="py-3 px-4 text-right font-medium">Dokumen</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activityReports.map((report) => (
                            <tr key={report.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{report.id}</td>
                              <td className="py-3 px-4">{report.activity}</td>
                              <td className="py-3 px-4">{report.date}</td>
                              <td className="py-3 px-4">{report.submitted_by}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(report.status)}`}>
                                  {report.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  {report.documents.map((doc, idx) => (
                                    <Button key={idx} variant="ghost" size="sm" className="h-8 gap-1">
                                      <FileText className="h-3 w-3" />
                                      {doc.split('.')[1]}
                                    </Button>
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
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StudentActivitiesPage;
