
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MessageSquare, Clock, User, Calendar as CalendarFull, Check, Info, AlertTriangle, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CounselingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Layanan BK Digital - Si-Kaji';
  }, []);

  const [date, setDate] = useState<Date>();

  // Sample counselors data
  const counselors = [
    { 
      id: 1, 
      name: "Dr. Rina Wijaya, M.Psi.", 
      photo: "", 
      specialization: "Konseling Akademik", 
      experience: "10 tahun" 
    },
    { 
      id: 2, 
      name: "Hadi Santoso, S.Pd., M.Pd.", 
      photo: "", 
      specialization: "Konseling Karir", 
      experience: "8 tahun" 
    },
    { 
      id: 3, 
      name: "Novi Anggraini, M.Psi.", 
      photo: "", 
      specialization: "Konseling Pribadi", 
      experience: "6 tahun" 
    },
  ];

  // Sample sessions data
  const sessions = [
    { 
      id: 1, 
      type: "Konseling Pribadi", 
      date: "2023-10-05", 
      time: "09:00", 
      counselor: "Dr. Rina Wijaya, M.Psi.", 
      status: "Selesai",
      notes: "Diskusi tentang manajemen stres menghadapi ujian akhir" 
    },
    { 
      id: 2, 
      type: "Bimbingan Karir", 
      date: "2023-10-12", 
      time: "13:30", 
      counselor: "Hadi Santoso, S.Pd., M.Pd.", 
      status: "Dijadwalkan" 
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Janji konseling berhasil dibuat', {
      description: 'Anda akan mendapatkan konfirmasi melalui email'
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Layanan BK Digital</h1>
              <p className="text-muted-foreground mt-1">Layanan bimbingan konseling untuk membantu siswa berkembang optimal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary/10 p-6 rounded-lg md:col-span-3 flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-primary/20 rounded-full">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Jaminan Kerahasiaan</h2>
                  <p className="text-muted-foreground">
                    Setiap konsultasi dan data yang dibagikan akan dijaga kerahasiaannya sesuai dengan kode etik bimbingan konseling. 
                    Kami berkomitmen menciptakan lingkungan yang aman dan nyaman untuk berbagi cerita.
                  </p>
                </div>
              </div>

              <Card className="md:col-span-2 order-2 md:order-1">
                <CardHeader>
                  <CardTitle>Pengajuan Bimbingan Konseling</CardTitle>
                  <CardDescription>
                    Silakan lengkapi formulir untuk mengajukan jadwal bimbingan konseling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="counselingType">Jenis Bimbingan</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis bimbingan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pribadi">Konseling Pribadi</SelectItem>
                            <SelectItem value="akademik">Bimbingan Akademik</SelectItem>
                            <SelectItem value="karir">Bimbingan Karir</SelectItem>
                            <SelectItem value="sosial">Masalah Sosial</SelectItem>
                            <SelectItem value="lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="counselor">Pilih Konselor</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih konselor" />
                          </SelectTrigger>
                          <SelectContent>
                            {counselors.map(counselor => (
                              <SelectItem key={counselor.id} value={`${counselor.id}`}>
                                {counselor.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="any">Siapapun yang tersedia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tanggal Bimbingan</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Waktu Bimbingan</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih waktu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="08:00">08:00 - 09:00</SelectItem>
                            <SelectItem value="09:00">09:00 - 10:00</SelectItem>
                            <SelectItem value="10:00">10:00 - 11:00</SelectItem>
                            <SelectItem value="11:00">11:00 - 12:00</SelectItem>
                            <SelectItem value="13:00">13:00 - 14:00</SelectItem>
                            <SelectItem value="14:00">14:00 - 15:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Topik Bimbingan</Label>
                      <Input id="topic" placeholder="Masukkan topik yang ingin dibahas" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi Masalah</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Jelaskan secara singkat permasalahan yang ingin Anda konsultasikan" 
                        className="min-h-[120px]" 
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSubmit}>Ajukan Bimbingan</Button>
                </CardFooter>
              </Card>

              <div className="order-1 md:order-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Tim Bimbingan Konseling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {counselors.map(counselor => (
                        <div key={counselor.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={counselor.photo} alt={counselor.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {counselor.name.split(' ')[0][0]}{counselor.name.split(' ')[1][0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{counselor.name}</p>
                            <div className="text-xs text-muted-foreground mt-1">
                              <span>{counselor.specialization}</span>
                              <span className="mx-2">•</span>
                              <span>Pengalaman {counselor.experience}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Layanan yang Tersedia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Konseling Pribadi</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Bimbingan untuk masalah pribadi, emosional, dan psikologis
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <CalendarFull className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Bimbingan Akademik</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Bantuan dalam pengembangan strategi belajar dan peningkatan prestasi
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Bimbingan Karir</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Arahan untuk perencanaan karir dan penjurusan studi
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Mediasi Konflik</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Bantuan penyelesaian konflik antar siswa atau dengan pihak lain
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Riwayat Bimbingan</CardTitle>
                <CardDescription>
                  Daftar sesi bimbingan konseling yang telah dan akan dilakukan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming">
                  <TabsList className="mb-4 grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Akan Datang</TabsTrigger>
                    <TabsTrigger value="past">Riwayat</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming">
                    <div className="space-y-4">
                      {sessions.filter(s => s.status === 'Dijadwalkan').map(session => (
                        <Card key={session.id}>
                          <CardContent className="p-4 flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex gap-4">
                              <div className="flex flex-col items-center justify-center bg-primary/10 rounded p-2 w-16 text-center">
                                <span className="text-xs text-primary font-medium">
                                  {format(new Date(session.date), "dd MMM")}
                                </span>
                                <span className="text-sm font-bold text-primary mt-1">
                                  {session.time}
                                </span>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold">{session.type}</h3>
                                <div className="mt-1 flex items-center gap-2 text-sm">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  <span>{session.counselor}</span>
                                </div>
                                <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                                  {session.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Reschedule</Button>
                              <Button variant="destructive" size="sm">Batalkan</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {sessions.filter(s => s.status === 'Dijadwalkan').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          Tidak ada jadwal bimbingan mendatang
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past">
                    <div className="space-y-4">
                      {sessions.filter(s => s.status === 'Selesai').map(session => (
                        <Card key={session.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="flex gap-4">
                                <div className="flex flex-col items-center justify-center bg-green-100 rounded p-2 w-16 text-center">
                                  <Check className="h-5 w-5 text-green-600" />
                                  <span className="text-xs text-green-700 font-medium mt-1">Selesai</span>
                                </div>
                                
                                <div>
                                  <h3 className="font-semibold">{session.type}</h3>
                                  <div className="mt-1 flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{format(new Date(session.date), "dd MMM yyyy")} • {session.time}</span>
                                  </div>
                                  <div className="mt-1 flex items-center gap-2 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{session.counselor}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {session.notes && (
                              <div className="mt-3 pt-3 border-t">
                                <p className="text-sm font-medium">Catatan:</p>
                                <p className="text-sm text-muted-foreground mt-1">{session.notes}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                      
                      {sessions.filter(s => s.status === 'Selesai').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          Belum ada riwayat bimbingan
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CounselingPage;
