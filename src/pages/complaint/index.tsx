
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Calendar, User, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

const complaintData = [
  {
    id: "ADU001",
    title: "Fasilitas toilet kurang bersih",
    category: "Fasilitas",
    status: "in_progress",
    priority: "medium",
    date: "2023-11-10",
    reporter: "Siswa Anonim",
    description: "Toilet di lantai 2 sering kotor dan tidak ada sabun",
    response: "Tim kebersihan sudah dijadwalkan untuk pembersihan ekstra"
  },
  {
    id: "ADU002",
    title: "Kantin kurang variasi makanan",
    category: "Kantin",
    status: "resolved",
    priority: "low",
    date: "2023-11-08",
    reporter: "Ahmad Rizki",
    description: "Menu kantin monoton, perlu variasi makanan sehat",
    response: "Kantin telah menambah 5 menu baru dan menu sehat"
  },
  {
    id: "ADU003",
    title: "AC di kelas XII-A rusak",
    category: "Fasilitas",
    status: "pending",
    priority: "high",
    date: "2023-11-12",
    reporter: "Wali Kelas XII-A",
    description: "AC tidak dingin dan berisik, mengganggu pembelajaran",
    response: ""
  }
];

const ComplaintPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'Selesai';
      case 'in_progress':
        return 'Dalam Proses';
      case 'pending':
        return 'Menunggu';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Tinggi';
      case 'medium':
        return 'Sedang';
      case 'low':
        return 'Rendah';
      default:
        return priority;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Sistem Pengaduan
            </h1>
            <p className="text-muted-foreground">
              Sampaikan keluhan dan saran untuk perbaikan sekolah
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Buat Pengaduan Baru
          </Button>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Daftar Pengaduan</TabsTrigger>
            <TabsTrigger value="create">Buat Pengaduan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="fasilitas">Fasilitas</SelectItem>
                  <SelectItem value="kantin">Kantin</SelectItem>
                  <SelectItem value="akademik">Akademik</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Prioritas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Prioritas</SelectItem>
                  <SelectItem value="high">Tinggi</SelectItem>
                  <SelectItem value="medium">Sedang</SelectItem>
                  <SelectItem value="low">Rendah</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {complaintData.map((complaint) => (
                <Card key={complaint.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={getStatusColor(complaint.status)}>
                            {getStatusLabel(complaint.status)}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                            {getPriorityLabel(complaint.priority)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">#{complaint.id}</span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{complaint.title}</h3>
                        <p className="text-muted-foreground mb-4">{complaint.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>Tanggal: {format(new Date(complaint.date), 'dd MMM yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4" />
                              <span>Pelapor: {complaint.reporter}</span>
                            </div>
                          </div>
                          {complaint.response && (
                            <div className="space-y-2">
                              <div className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                                <span>Tanggapan: {complaint.response}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                        {complaint.status !== 'resolved' && (
                          <Button variant="outline" size="sm">
                            Update Status
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Buat Pengaduan Baru</CardTitle>
                <CardDescription>
                  Isi form di bawah ini untuk membuat pengaduan baru
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Judul Pengaduan</label>
                    <Input placeholder="Masukkan judul pengaduan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Kategori</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fasilitas">Fasilitas</SelectItem>
                        <SelectItem value="kantin">Kantin</SelectItem>
                        <SelectItem value="akademik">Akademik</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deskripsi Pengaduan</label>
                  <Textarea 
                    placeholder="Jelaskan pengaduan Anda secara detail..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prioritas</label>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="medium">Sedang</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button>
                    Kirim Pengaduan
                  </Button>
                  <Button variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ComplaintPage;
