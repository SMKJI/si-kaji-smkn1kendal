
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, FileText, Calendar, MapPin, Clock, Users, Check, X, Loader2, PlusCircle } from 'lucide-react';

const StudentActivitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Kegiatan Siswa - Si-Kaji';
  }, []);

  const [activeTab, setActiveTab] = useState("activities");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  // Sample upcoming activities
  const upcomingActivities = [
    { 
      id: 1, 
      title: 'Lomba Debat Bahasa Inggris',
      date: '12 Agustus 2023',
      location: 'Aula Sekolah',
      time: '09:00 - 12:00',
      status: 'approved', 
      participants: 12,
      facilities: ['Meja', 'Kursi', 'Sound System']
    },
    { 
      id: 2, 
      title: 'Pelatihan Kewirausahaan',
      date: '15 Agustus 2023',
      location: 'Ruang Multimedia',
      time: '13:00 - 15:00',
      status: 'pending', 
      participants: 30,
      facilities: ['Proyektor', 'Laptop']
    },
    { 
      id: 3, 
      title: 'Pertandingan Futsal',
      date: '20 Agustus 2023',
      location: 'Lapangan Olahraga',
      time: '14:00 - 17:00',
      status: 'rejected', 
      participants: 20,
      facilities: ['Bola', 'Seragam', 'P3K']
    },
  ];

  // Sample past activities
  const pastActivities = [
    { 
      id: 4, 
      title: 'Workshop Robotika',
      date: '10 Juli 2023',
      location: 'Lab Komputer',
      time: '09:00 - 12:00',
      status: 'completed',
      participants: 15,
      facilities: ['Komputer', 'Alat Robotik'],
      hasReport: true
    },
    { 
      id: 5, 
      title: 'Webinar Kesehatan Mental',
      date: '5 Juli 2023',
      location: 'Online via Zoom',
      time: '13:00 - 15:00',
      status: 'completed',
      participants: 50,
      facilities: ['Laptop', 'Webcam'],
      hasReport: false
    },
  ];

  const handleSubmitActivity = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      // Show success message
      alert('Kegiatan berhasil diajukan! Menunggu persetujuan.');
    }, 1500);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowReportForm(false);
      setSelectedActivity(null);
      // Show success message
      alert('Laporan kegiatan berhasil dikirim!');
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">Disetujui</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Menunggu</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Ditolak</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Selesai</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout 
      title="Kegiatan Siswa" 
      description="Ajukan dan kelola kegiatan siswa" 
      showBackButton
      backTo="/dashboard"
    >
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="activities">Kegiatan</TabsTrigger>
          <TabsTrigger value="new">Ajukan Kegiatan</TabsTrigger>
          <TabsTrigger value="reports">Laporan Kegiatan</TabsTrigger>
        </TabsList>
        
        {/* Activities List Tab */}
        <TabsContent value="activities" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
            <h2 className="text-xl font-semibold">Daftar Kegiatan yang Akan Datang</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari kegiatan..." className="pl-8" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingActivities.map((activity) => (
              <Card key={activity.id} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    {getStatusBadge(activity.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{activity.participants} Peserta</span>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Fasilitas:</p>
                    <div className="flex flex-wrap gap-1">
                      {activity.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {activity.status === 'approved' && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => {
                        setShowReportForm(true);
                        setSelectedActivity(activity.id);
                        setActiveTab("reports");
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Buat Laporan
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Kegiatan Sebelumnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastActivities.map((activity) => (
              <Card key={activity.id} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    {getStatusBadge(activity.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{activity.time}</span>
                  </div>
                  
                  <div className="flex items-start mt-2">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                    <span className="text-sm">
                      {activity.hasReport 
                        ? <span className="text-green-600 flex items-center"><Check size={16} className="mr-1" /> Laporan telah dibuat</span>
                        : <span className="text-red-600 flex items-center"><X size={16} className="mr-1" /> Belum ada laporan</span>
                      }
                    </span>
                  </div>
                  
                  {!activity.hasReport && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => {
                        setShowReportForm(true);
                        setSelectedActivity(activity.id);
                        setActiveTab("reports");
                      }}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Buat Laporan
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Activity Submission Tab */}
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Formulir Pengajuan Kegiatan</CardTitle>
              <CardDescription>
                Lengkapi informasi berikut untuk mengajukan kegiatan baru. Pengajuan akan diproses oleh pihak sekolah.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitActivity} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-title">Nama Kegiatan</Label>
                    <Input id="activity-title" placeholder="Masukkan nama kegiatan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-type">Jenis Kegiatan</Label>
                    <Select required>
                      <SelectTrigger id="activity-type">
                        <SelectValue placeholder="Pilih jenis kegiatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Akademik</SelectItem>
                        <SelectItem value="sports">Olahraga</SelectItem>
                        <SelectItem value="arts">Seni dan Budaya</SelectItem>
                        <SelectItem value="social">Sosial</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-date">Tanggal Kegiatan</Label>
                    <Input type="date" id="activity-date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-time">Waktu Kegiatan</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" id="activity-time-start" required />
                      <Input type="time" id="activity-time-end" required />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-location">Lokasi</Label>
                    <Input id="activity-location" placeholder="Masukkan lokasi kegiatan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity-participants">Jumlah Peserta</Label>
                    <Input type="number" id="activity-participants" placeholder="Masukkan jumlah peserta" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activity-description">Deskripsi Kegiatan</Label>
                  <Textarea id="activity-description" placeholder="Jelaskan secara detail tentang kegiatan ini" rows={4} required />
                </div>
                
                <div className="space-y-2">
                  <Label>Peminjaman Fasilitas</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="facility-projector" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="facility-projector" className="text-sm">Proyektor</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="facility-sound" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="facility-sound" className="text-sm">Sound System</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="facility-chairs" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="facility-chairs" className="text-sm">Kursi</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="facility-tables" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="facility-tables" className="text-sm">Meja</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="facility-laptop" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="facility-laptop" className="text-sm">Laptop</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="facility-mic" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="facility-mic" className="text-sm">Mikrofon</label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facility-others">Fasilitas Lainnya</Label>
                  <Input id="facility-others" placeholder="Sebutkan fasilitas lain yang dibutuhkan" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activity-budget">Anggaran (jika ada)</Label>
                  <Input id="activity-budget" placeholder="Masukkan perkiraan anggaran yang dibutuhkan" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="activity-pic">Penanggung Jawab</Label>
                  <Input id="activity-pic" placeholder="Nama penanggung jawab kegiatan" required />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Ajukan Kegiatan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Activity Reports Tab */}
        <TabsContent value="reports">
          {showReportForm ? (
            <Card>
              <CardHeader>
                <CardTitle>Buat Laporan Kegiatan</CardTitle>
                <CardDescription>
                  Buat laporan kegiatan yang telah dilaksanakan sebagai dokumentasi dan evaluasi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-activity">Kegiatan</Label>
                    <Select defaultValue={selectedActivity?.toString()} required>
                      <SelectTrigger id="report-activity">
                        <SelectValue placeholder="Pilih kegiatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...upcomingActivities, ...pastActivities]
                          .filter(a => a.status === 'approved' || a.status === 'completed')
                          .map(activity => (
                            <SelectItem key={activity.id} value={activity.id.toString()}>
                              {activity.title} ({activity.date})
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="report-summary">Ringkasan Kegiatan</Label>
                    <Textarea 
                      id="report-summary" 
                      placeholder="Jelaskan ringkasan pelaksanaan kegiatan" 
                      rows={3} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="report-outcomes">Hasil dan Pencapaian</Label>
                    <Textarea 
                      id="report-outcomes" 
                      placeholder="Jelaskan hasil dan pencapaian kegiatan" 
                      rows={3} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="report-problems">Kendala dan Solusi</Label>
                    <Textarea 
                      id="report-problems" 
                      placeholder="Jelaskan kendala yang dihadapi dan solusi yang diambil" 
                      rows={3} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-participants">Jumlah Peserta Aktual</Label>
                      <Input type="number" id="report-participants" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="report-budget">Realisasi Anggaran</Label>
                      <Input id="report-budget" placeholder="Masukkan realisasi anggaran" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="report-photo">Dokumentasi Foto</Label>
                    <Input type="file" id="report-photo" accept="image/*" multiple />
                    <p className="text-xs text-muted-foreground mt-1">Upload foto kegiatan (maks. 5 foto)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="report-attachments">Lampiran</Label>
                    <Input type="file" id="report-attachments" />
                    <p className="text-xs text-muted-foreground mt-1">Upload dokumen pendukung jika ada (PDF/DOC)</p>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowReportForm(false);
                        setSelectedActivity(null);
                      }}
                    >
                      Batal
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        "Kirim Laporan"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                <h2 className="text-xl font-semibold">Laporan Kegiatan</h2>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Cari laporan..." className="pl-8" />
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowReportForm(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Laporan
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Kegiatan yang Dibuat</CardTitle>
                  <CardDescription>Daftar laporan kegiatan yang telah Anda buat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">Kegiatan</th>
                          <th className="py-3 px-4 text-left font-medium hidden sm:table-cell">Tanggal</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Pembuat</th>
                          <th className="py-3 px-4 text-right font-medium">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">Workshop Robotika</td>
                          <td className="py-3 px-4 hidden sm:table-cell">10 Juli 2023</td>
                          <td className="py-3 px-4 hidden md:table-cell">Andi Saputra</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="link" className="h-auto p-0">Lihat Detail</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Kegiatan yang Belum Dilaporkan</CardTitle>
                  <CardDescription>Kegiatan yang telah selesai namun belum memiliki laporan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">Kegiatan</th>
                          <th className="py-3 px-4 text-left font-medium hidden sm:table-cell">Tanggal</th>
                          <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Status</th>
                          <th className="py-3 px-4 text-right font-medium">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">Webinar Kesehatan Mental</td>
                          <td className="py-3 px-4 hidden sm:table-cell">5 Juli 2023</td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <Badge className="bg-blue-500">Selesai</Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="link" 
                              className="h-auto p-0"
                              onClick={() => {
                                setShowReportForm(true);
                                setSelectedActivity(5);
                              }}
                            >
                              Buat Laporan
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default StudentActivitiesPage;
