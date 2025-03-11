
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, AlertCircle, Send, Search, Filter, User, EyeOff, MessageSquare } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const ParentComplaintPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sistem Pengaduan Orang Tua - Si-Kaji';
  }, []);

  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pengaduan telah berhasil dikirim', {
      description: 'Tim kami akan segera meninjau laporan Anda.'
    });
  };

  // Sample complaint data
  const complaints = [
    { 
      id: 'ADU001', 
      date: '2023-09-15', 
      title: 'Fasilitas toilet rusak', 
      category: 'Fasilitas', 
      status: 'Selesai',
      response: 'Toilet sudah diperbaiki pada tanggal 18 September 2023',
      anonymous: false
    },
    { 
      id: 'ADU002', 
      date: '2023-09-28', 
      title: 'Laporan bullying di kelas', 
      category: 'Perilaku Siswa', 
      status: 'Proses',
      response: 'Sedang dalam investigasi oleh tim BK',
      anonymous: true
    },
    { 
      id: 'ADU003', 
      date: '2023-10-05', 
      title: 'Kesalahan nilai rapor semester', 
      category: 'Akademik', 
      status: 'Diverifikasi',
      response: 'Menunggu konfirmasi dari guru mata pelajaran terkait',
      anonymous: false
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Sistem Pengaduan</h1>
              <p className="text-muted-foreground mt-1">Sampaikan keluhan, saran, atau laporan terkait permasalahan di sekolah</p>
            </div>

            <Alert variant="default" className="bg-primary/10 border-primary">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertTitle>Catatan Penting</AlertTitle>
              <AlertDescription>
                Laporan yang disampaikan akan dijamin kerahasiaannya dan ditindaklanjuti sesuai prosedur yang berlaku.
                Identitas pelapor dapat dirahasiakan jika diinginkan.
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="submit" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="submit">Buat Pengaduan</TabsTrigger>
                <TabsTrigger value="history">Riwayat Pengaduan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="submit" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Formulir Pengaduan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input 
                            id="name" 
                            placeholder="Masukkan nama lengkap" 
                            disabled={isAnonymous} 
                            value={isAnonymous ? "Anonim" : ""}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relation">Hubungan dengan Sekolah</Label>
                          <Select defaultValue="orangtua" disabled={isAnonymous}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih hubungan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="orangtua">Orang Tua/Wali</SelectItem>
                              <SelectItem value="siswa">Siswa</SelectItem>
                              <SelectItem value="guru">Guru/Staf</SelectItem>
                              <SelectItem value="masyarakat">Masyarakat</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori Pengaduan</Label>
                        <Select defaultValue="fasilitas">
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fasilitas">Fasilitas</SelectItem>
                            <SelectItem value="pembelajaran">Pembelajaran</SelectItem>
                            <SelectItem value="perilaku">Perilaku Siswa</SelectItem>
                            <SelectItem value="keamanan">Keamanan</SelectItem>
                            <SelectItem value="akademik">Akademik</SelectItem>
                            <SelectItem value="lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Judul Pengaduan</Label>
                        <Input id="title" placeholder="Masukkan judul singkat pengaduan" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Detail Pengaduan</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Jelaskan detail permasalahan, lokasi, waktu kejadian, dan pihak yang terlibat" 
                          className="min-h-[150px]"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="anonymous" 
                          checked={isAnonymous} 
                          onCheckedChange={setIsAnonymous} 
                        />
                        <Label htmlFor="anonymous" className="flex items-center gap-2">
                          <EyeOff className="h-4 w-4" />
                          Kirim sebagai anonim
                        </Label>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSubmit} className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Kirim Pengaduan
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Riwayat Pengaduan</CardTitle>
                    <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                      <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Cari pengaduan..."
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        Filter Status
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {complaints.map((complaint) => (
                        <Card key={complaint.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-4 bg-muted/50">
                              <div className="flex flex-col md:flex-row justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">{complaint.title}</span>
                                  {complaint.anonymous && (
                                    <span className="bg-muted rounded-full px-2 py-0.5 text-xs flex items-center gap-1">
                                      <EyeOff className="h-3 w-3" /> Anonim
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    complaint.status === 'Selesai' ? 'bg-green-100 text-green-800' : 
                                    complaint.status === 'Proses' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-blue-100 text-blue-800'
                                  }`}>
                                    {complaint.status}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                <span>ID: {complaint.id}</span>
                                <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                                <span>Kategori: {complaint.category}</span>
                                <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                                <span>Tanggal: {complaint.date}</span>
                              </div>
                            </div>
                            <div className="p-4 border-t">
                              <div className="flex items-start gap-3">
                                <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium mb-1">Tanggapan:</p>
                                  <p className="text-sm text-muted-foreground">{complaint.response}</p>
                                </div>
                              </div>
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

export default ParentComplaintPage;
