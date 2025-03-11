
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CalendarPlus, Search, Filter, Clock, ClipboardList, CalendarCheck, FileText, Users, Calendar, CheckCircle2, XCircle, FileImage } from 'lucide-react';
import { toast } from 'sonner';

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

  const handleNewActivityClick = () => {
    toast.info('Fitur pengajuan kegiatan baru akan segera hadir', {
      description: 'Anda akan dapat mengajukan kegiatan baru melalui sistem ini'
    });
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => 
        filter === 'approved' 
          ? activity.status === 'Disetujui' 
          : filter === 'pending' 
            ? activity.status === 'Pending' 
            : activity.status === 'Ditolak'
      );

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Administrasi Kegiatan Siswa</h1>
                <p className="text-muted-foreground mt-1">Kelola kegiatan, peminjaman fasilitas, dan laporan kegiatan</p>
              </div>
              <Button onClick={handleNewActivityClick} className="flex items-center gap-2">
                <CalendarPlus size={18} />
                Ajukan Kegiatan Baru
              </Button>
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
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <CardTitle>Kegiatan Terdaftar</CardTitle>
                      <div className="flex flex-col md:flex-row gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Cari kegiatan..."
                            className="pl-10 w-full md:w-64"
                          />
                        </div>
                        <Select defaultValue="all" onValueChange={setFilter}>
                          <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="Filter Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="approved">Disetujui</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Ditolak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredActivities.map((activity) => (
                        <Card key={activity.id} className="border shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between mb-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{activity.title}</h3>
                                  <Badge variant={
                                    activity.status === 'Disetujui' ? 'default' :
                                    activity.status === 'Pending' ? 'outline' : 'destructive'
                                  }>
                                    {activity.status}
                                  </Badge>
                                </div>
                                <p className="text-muted-foreground text-sm">{activity.id} • {activity.organizer}</p>
                              </div>
                              <div className="mt-2 md:mt-0 flex items-center gap-2">
                                <Badge variant="secondary">
                                  {activity.type}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{activity.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">PIC: {activity.pic}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Lokasi: {activity.location}</span>
                              </div>
                            </div>
                            
                            <p className="text-sm mb-4">{activity.description}</p>
                            
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">Detail</Button>
                              {activity.status === 'Disetujui' && (
                                <Button variant="outline" size="sm">Laporan Kegiatan</Button>
                              )}
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
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <CardTitle>Peminjaman Fasilitas</CardTitle>
                      <Button className="flex items-center gap-2">
                        <CalendarCheck size={18} />
                        Ajukan Peminjaman
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2">ID</th>
                            <th className="text-left font-medium p-2">Kegiatan</th>
                            <th className="text-left font-medium p-2">Fasilitas</th>
                            <th className="text-left font-medium p-2">Tanggal</th>
                            <th className="text-left font-medium p-2">Waktu</th>
                            <th className="text-left font-medium p-2">Status</th>
                            <th className="text-left font-medium p-2">Disetujui Oleh</th>
                            <th className="text-center font-medium p-2">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {facilityRequests.map((request) => (
                            <tr key={request.id} className="border-b hover:bg-muted/50">
                              <td className="p-2">{request.id}</td>
                              <td className="p-2">{request.activity}</td>
                              <td className="p-2">{request.facility}</td>
                              <td className="p-2">{request.date}</td>
                              <td className="p-2">{request.time}</td>
                              <td className="p-2">
                                <Badge variant={
                                  request.status === 'Disetujui' ? 'default' :
                                  request.status === 'Pending' ? 'outline' : 'destructive'
                                }>
                                  {request.status}
                                </Badge>
                              </td>
                              <td className="p-2">{request.approved_by}</td>
                              <td className="p-2 text-center">
                                <Button variant="ghost" size="sm">Detail</Button>
                              </td>
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
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <CardTitle>Laporan Kegiatan</CardTitle>
                      <Button className="flex items-center gap-2">
                        <FileText size={18} />
                        Unggah Laporan
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityReports.map((report) => (
                        <Card key={report.id} className="border shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between mb-3">
                              <div>
                                <h3 className="font-semibold">{report.activity}</h3>
                                <p className="text-muted-foreground text-sm">{report.id} • {report.date}</p>
                              </div>
                              <div className="mt-2 md:mt-0">
                                <Badge variant={report.status === 'Submitted' ? 'outline' : 'default'}>
                                  {report.status === 'Submitted' ? 'Terkirim' : 'Ditinjau'}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm mb-3">
                              <span className="font-medium">Penanggung Jawab:</span> {report.submitted_by}
                            </p>
                            
                            <div className="border rounded-md p-3 bg-muted/50 mb-3">
                              <p className="text-sm font-medium mb-2">Dokumen:</p>
                              <div className="space-y-2">
                                {report.documents.map((doc, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <FileImage className="h-4 w-4 text-primary" />
                                    <span>{doc}</span>
                                    <Button variant="link" size="sm" className="h-auto p-0 ml-auto">
                                      Unduh
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">Detail</Button>
                              {report.status === 'Submitted' && (
                                <Button variant="outline" size="sm">Edit</Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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
