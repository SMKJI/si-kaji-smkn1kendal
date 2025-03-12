
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Search, MessageSquare, Calendar as CalendarIcon, User, Plus, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CounselingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Konseling - Si-Kaji';
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample counseling sessions
  const counselingSessions = [
    { 
      id: 1, 
      date: '15 Agustus 2023', 
      time: '09:00 - 10:00',
      counselor: 'Ibu Dina, S.Pd.',
      topic: 'Konseling Akademik',
      status: 'scheduled',
      notes: ''
    },
    { 
      id: 2, 
      date: '20 Agustus 2023', 
      time: '13:00 - 14:00',
      counselor: 'Bapak Rizal, M.Psi.',
      topic: 'Konseling Karir',
      status: 'scheduled',
      notes: ''
    },
    { 
      id: 3, 
      date: '5 Agustus 2023', 
      time: '10:00 - 11:00',
      counselor: 'Ibu Dina, S.Pd.',
      topic: 'Konseling Pribadi',
      status: 'completed',
      notes: 'Konseling berjalan dengan baik. Siswa menunjukkan perkembangan positif dalam mengatasi masalah pribadinya.'
    },
  ];

  // Sample counselors
  const counselors = [
    { id: 1, name: 'Ibu Dina, S.Pd.', specialization: 'Konseling Akademik & Pribadi', available: true },
    { id: 2, name: 'Bapak Rizal, M.Psi.', specialization: 'Konseling Karir & Sosial', available: true },
    { id: 3, name: 'Bapak Hendra, S.Psi.', specialization: 'Konseling Pribadi & Keluarga', available: false },
  ];

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      // Show success message
      alert('Permintaan konseling berhasil dikirim! Menunggu konfirmasi dari konselor.');
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'scheduled':
        return <Badge className="bg-yellow-500">Terjadwal</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Selesai</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Dibatalkan</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout 
      title="Konseling" 
      description="Jadwalkan dan kelola sesi konseling" 
      showBackButton
      backTo="/dashboard"
    >
      <Tabs defaultValue="schedule" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="schedule">Jadwal Konseling</TabsTrigger>
          <TabsTrigger value="request">Ajukan Konseling</TabsTrigger>
          <TabsTrigger value="counselors">Konselor</TabsTrigger>
        </TabsList>
        
        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
            <h2 className="text-xl font-semibold">Jadwal Konseling</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari jadwal..." className="pl-8" />
            </div>
          </div>
          
          <div className="space-y-4">
            {counselingSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{session.topic}</h3>
                      <p className="text-muted-foreground">dengan {session.counselor}</p>
                    </div>
                    {getStatusBadge(session.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                  
                  {session.notes && (
                    <div className="mt-2 p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium mb-1">Catatan:</p>
                      <p className="text-sm">{session.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2 mt-4">
                    {session.status === 'scheduled' && (
                      <>
                        <Button variant="outline" size="sm">Batalkan</Button>
                        <Button variant="outline" size="sm">Reschedule</Button>
                      </>
                    )}
                    {session.status === 'completed' && (
                      <Button size="sm">Lihat Detail</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Request Tab */}
        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Ajukan Sesi Konseling</CardTitle>
              <CardDescription>
                Lengkapi formulir berikut untuk menjadwalkan sesi konseling dengan guru BK.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="counseling-topic">Topik Konseling</Label>
                    <Select required>
                      <SelectTrigger id="counseling-topic">
                        <SelectValue placeholder="Pilih topik konseling" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Akademik</SelectItem>
                        <SelectItem value="career">Karir</SelectItem>
                        <SelectItem value="personal">Pribadi</SelectItem>
                        <SelectItem value="social">Sosial</SelectItem>
                        <SelectItem value="family">Keluarga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="counseling-counselor">Konselor</Label>
                    <Select required>
                      <SelectTrigger id="counseling-counselor">
                        <SelectValue placeholder="Pilih konselor" />
                      </SelectTrigger>
                      <SelectContent>
                        {counselors.filter(c => c.available).map(counselor => (
                          <SelectItem key={counselor.id} value={counselor.id.toString()}>
                            {counselor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="counseling-date">Tanggal yang Diinginkan</Label>
                    <Input type="date" id="counseling-date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="counseling-time">Waktu yang Diinginkan</Label>
                    <Select required>
                      <SelectTrigger id="counseling-time">
                        <SelectValue placeholder="Pilih waktu" />
                      </SelectTrigger>
                      <SelectContent>
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
                  <Label htmlFor="counseling-reason">Alasan Konseling</Label>
                  <Textarea 
                    id="counseling-reason" 
                    placeholder="Jelaskan alasan Anda membutuhkan konseling..." 
                    rows={4} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="counseling-privacy">Preferensi Privasi</Label>
                  <Select>
                    <SelectTrigger id="counseling-privacy">
                      <SelectValue placeholder="Pilih preferensi privasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Pribadi (Hanya dengan konselor)</SelectItem>
                      <SelectItem value="group">Grup (Dengan siswa lain yang memiliki masalah serupa)</SelectItem>
                      <SelectItem value="parent">Dengan orang tua</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ajukan Konseling
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Counselors Tab */}
        <TabsContent value="counselors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {counselors.map((counselor) => (
              <Card key={counselor.id} className="h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-3">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium text-center">{counselor.name}</h3>
                    <Badge className={counselor.available ? "bg-green-500 mt-2" : "bg-red-500 mt-2"}>
                      {counselor.available ? "Tersedia" : "Tidak Tersedia"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-center text-muted-foreground mb-4">
                      {counselor.specialization}
                    </p>
                    
                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        disabled={!counselor.available}
                        onClick={() => document.getElementById('counseling-request-tab')?.click()}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Jadwalkan Konseling
                      </Button>
                      <Button variant="outline" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Lihat Profil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CounselingPage;
