
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Clock, FileText, User, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageTransition from '@/components/layout/PageTransition';

const disciplineData = [
  {
    id: "D001",
    date: "2023-11-10",
    type: "Peringatan",
    violation: "Terlambat masuk kelas",
    description: "Siswa terlambat masuk kelas selama 15 menit tanpa keterangan yang jelas",
    teacher: "Budi Santoso, S.Pd",
    action: "Peringatan lisan dan surat peringatan tertulis",
    status: "resolved",
    followUp: "Konseling dengan guru BK"
  },
  {
    id: "D002", 
    date: "2023-11-05",
    type: "Sanksi Ringan",
    violation: "Tidak menggunakan seragam lengkap",
    description: "Tidak memakai dasi dan sepatu tidak sesuai aturan sekolah",
    teacher: "Siti Aminah, S.Pd",
    action: "Membersihkan ruang kelas setelah jam pelajaran",
    status: "completed",
    followUp: "Monitoring penggunaan seragam"
  },
  {
    id: "D003",
    date: "2023-10-28", 
    type: "Peringatan",
    violation: "Tidak mengerjakan tugas",
    description: "Tidak mengumpulkan tugas Matematika yang diberikan seminggu sebelumnya",
    teacher: "Ahmad Rahman, S.Pd",
    action: "Peringatan dan wajib mengerjakan tugas tambahan",
    status: "in_progress",
    followUp: "Konsultasi dengan orang tua"
  }
];

const ParentPortalDisciplinePage = () => {
  const [selectedMonth, setSelectedMonth] = useState("november");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'resolved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'in_progress':
        return 'Berlangsung';
      case 'resolved':
        return 'Diselesaikan';
      default:
        return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Peringatan':
        return 'bg-amber-100 text-amber-800';
      case 'Sanksi Ringan':
        return 'bg-orange-100 text-orange-800';
      case 'Sanksi Berat':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = disciplineData.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.status === selectedFilter;
  });

  const monthlyStats = {
    total: disciplineData.length,
    completed: disciplineData.filter(d => d.status === 'completed').length,
    inProgress: disciplineData.filter(d => d.status === 'in_progress').length,
    resolved: disciplineData.filter(d => d.status === 'resolved').length
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Catatan Kedisiplinan
            </h1>
            <p className="text-muted-foreground">
              Pantau catatan kedisiplinan dan perkembangan perilaku anak
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pilih Bulan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="oktober">Oktober</SelectItem>
                <SelectItem value="september">September</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Catatan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.total}</div>
              <p className="text-xs text-muted-foreground">catatan</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{monthlyStats.completed}</div>
              <p className="text-xs text-muted-foreground">catatan</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Berlangsung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{monthlyStats.inProgress}</div>
              <p className="text-xs text-muted-foreground">catatan</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Diselesaikan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{monthlyStats.resolved}</div>
              <p className="text-xs text-muted-foreground">catatan</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="records" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records">Catatan Kedisiplinan</TabsTrigger>
            <TabsTrigger value="summary">Ringkasan & Analisis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="records" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="in_progress">Berlangsung</SelectItem>
                  <SelectItem value="resolved">Diselesaikan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredData.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={getTypeColor(item.type)}>
                            {item.type}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(item.status)}>
                            {getStatusLabel(item.status)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">#{item.id}</span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{item.violation}</h3>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>Tanggal: {format(new Date(item.date), 'dd MMM yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4" />
                              <span>Guru: {item.teacher}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2 text-sm">
                              <FileText className="h-4 w-4 mt-0.5" />
                              <span>Tindakan: {item.action}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-4 w-4 mt-0.5" />
                              <span>Tindak Lanjut: {item.followUp}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Detail
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Hubungi Guru
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredData.length === 0 && (
              <Card className="p-8 text-center">
                <CardContent>
                  <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Tidak ada catatan kedisiplinan yang sesuai dengan filter
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tren Kedisiplinan</CardTitle>
                  <CardDescription>
                    Perkembangan kedisiplinan 3 bulan terakhir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="font-medium">November 2023</span>
                      <span className="text-sm text-green-600">3 catatan (Menurun)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <span className="font-medium">Oktober 2023</span>
                      <span className="text-sm text-amber-600">5 catatan (Stabil)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                      <span className="font-medium">September 2023</span>
                      <span className="text-sm text-red-600">7 catatan (Tinggi)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rekomendasi</CardTitle>
                  <CardDescription>
                    Saran untuk meningkatkan kedisiplinan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Peningkatan Positif</p>
                      <p className="text-xs text-blue-600">Kedisiplinan anak menunjukkan tren membaik dalam 2 bulan terakhir</p>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">Area Perhatian</p>
                      <p className="text-xs text-amber-600">Perlu konsistensi dalam hal ketepatan waktu masuk sekolah</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Saran</p>
                      <p className="text-xs text-green-600">Lanjutkan komunikasi rutin dengan guru dan libatkan anak dalam diskusi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Kontak Guru & Konselor</CardTitle>
                <CardDescription>
                  Untuk konsultasi lebih lanjut mengenai kedisiplinan anak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Guru BK</h4>
                    <p className="text-sm text-muted-foreground mb-2">Siti Nurhaliza, S.Pd</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Hubungi
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Wali Kelas</h4>
                    <p className="text-sm text-muted-foreground mb-2">Ahmad Rahman, S.Pd</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Hubungi
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Kepala Sekolah</h4>
                    <p className="text-sm text-muted-foreground mb-2">Dr. Bambang Sutrisno</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Hubungi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ParentPortalDisciplinePage;
