
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Calendar, User, Clock, MessageSquare, Plus, Phone } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

const counselingData = [
  {
    id: "KS001",
    date: "2023-11-15",
    time: "10:00",
    type: "individual",
    topic: "Masalah Akademik",
    counselor: "Siti Nurhaliza, S.Pd",
    status: "scheduled",
    description: "Konsultasi mengenai kesulitan belajar matematika"
  },
  {
    id: "KS002", 
    date: "2023-11-10",
    time: "14:00",
    type: "individual",
    topic: "Karier",
    counselor: "Ahmad Rahman, S.Pd",
    status: "completed",
    description: "Diskusi mengenai pilihan jurusan kuliah"
  },
  {
    id: "KS003",
    date: "2023-11-08",
    time: "09:00", 
    type: "group",
    topic: "Motivasi Belajar",
    counselor: "Dr. Maria Sari",
    status: "completed",
    description: "Sesi kelompok untuk meningkatkan motivasi belajar"
  }
];

const CounselingPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'scheduled':
        return 'Terjadwal';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'individual':
        return 'Individual';
      case 'group':
        return 'Kelompok';
      default:
        return type;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <HelpCircle className="h-6 w-6" />
              Layanan Konseling
            </h1>
            <p className="text-muted-foreground">
              Konsultasi dan bimbingan untuk pengembangan diri
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Ajukan Konseling
          </Button>
        </div>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sessions">Riwayat Sesi</TabsTrigger>
            <TabsTrigger value="request">Ajukan Konseling</TabsTrigger>
            <TabsTrigger value="counselors">Daftar Konselor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sessions" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipe Konseling" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="group">Kelompok</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="scheduled">Terjadwal</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {counselingData.map((session) => (
                <Card key={session.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={getStatusColor(session.status)}>
                            {getStatusLabel(session.status)}
                          </Badge>
                          <Badge variant="outline">
                            {getTypeLabel(session.type)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">#{session.id}</span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{session.topic}</h3>
                        <p className="text-muted-foreground mb-4">{session.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>Tanggal: {format(new Date(session.date), 'dd MMM yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4" />
                              <span>Waktu: {session.time}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4" />
                              <span>Konselor: {session.counselor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {session.status === 'scheduled' && (
                          <>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </>
                        )}
                        {session.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            Lihat Hasil
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="request" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ajukan Konseling</CardTitle>
                <CardDescription>
                  Isi form di bawah ini untuk mengajukan sesi konseling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Topik Konseling</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih topik" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Masalah Akademik</SelectItem>
                        <SelectItem value="career">Karier</SelectItem>
                        <SelectItem value="social">Sosial</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipe Konseling</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="group">Kelompok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deskripsi Masalah</label>
                  <Textarea 
                    placeholder="Jelaskan masalah atau topik yang ingin didiskusikan..."
                    rows={4}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal Preferensi</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Waktu Preferensi</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih waktu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 - 10:00</SelectItem>
                        <SelectItem value="10:00">10:00 - 11:00</SelectItem>
                        <SelectItem value="13:00">13:00 - 14:00</SelectItem>
                        <SelectItem value="14:00">14:00 - 15:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button>
                    Ajukan Konseling
                  </Button>
                  <Button variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="counselors" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Siti Nurhaliza, S.Pd", speciality: "Bimbingan Akademik", phone: "081234567890" },
                { name: "Ahmad Rahman, S.Pd", speciality: "Konseling Karier", phone: "081234567891" },
                { name: "Dr. Maria Sari", speciality: "Psikologi Pendidikan", phone: "081234567892" }
              ].map((counselor, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{counselor.name}</CardTitle>
                    <CardDescription>{counselor.speciality}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4" />
                        <span>{counselor.phone}</span>
                      </div>
                      <Button size="sm" className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Hubungi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default CounselingPage;
