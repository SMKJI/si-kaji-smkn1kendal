
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, AlertTriangle, Plus, Flag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const DisciplinePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Pencatatan Pelanggaran - Si-Kaji';
  }, []);

  // Sample violations data
  const violations = [
    {
      id: 1,
      student: 'Andi Saputra',
      class: 'XII RPL 1',
      violation: 'Terlambat masuk sekolah',
      category: 'Ringan',
      points: -5,
      date: '12 September 2023',
      handler: 'Budi Santoso, S.Pd.',
      status: 'Tercatat'
    },
    {
      id: 2,
      student: 'Bayu Aditya',
      class: 'XI TKJ 2',
      violation: 'Tidak mengenakan atribut sekolah dengan lengkap',
      category: 'Ringan',
      points: -5,
      date: '14 September 2023',
      handler: 'Dedi Kurniawan, M.Pd.',
      status: 'Tercatat'
    },
    {
      id: 3,
      student: 'Cindy Permata',
      class: 'XII RPL 2',
      violation: 'Membolos pelajaran',
      category: 'Sedang',
      points: -10,
      date: '15 September 2023',
      handler: 'Siti Rahayu, S.Pd.',
      status: 'Proses Konseling'
    },
    {
      id: 4,
      student: 'Dimas Pratama',
      class: 'X RPL 3',
      violation: 'Berkelahi di lingkungan sekolah',
      category: 'Berat',
      points: -20,
      date: '18 September 2023',
      handler: 'Tono Wijaya, S.T.',
      status: 'Panggilan Orang Tua'
    },
    {
      id: 5,
      student: 'Eka Putri',
      class: 'XII RPL 3',
      violation: 'Membawa HP saat ujian',
      category: 'Sedang',
      points: -15,
      date: '20 September 2023',
      handler: 'Ani Suryani, S.Pd.',
      status: 'Proses Konseling'
    }
  ];

  const getCategoryBadge = (category) => {
    switch(category) {
      case 'Ringan':
        return <Badge className="bg-yellow-500">Ringan</Badge>;
      case 'Sedang':
        return <Badge className="bg-orange-500">Sedang</Badge>;
      case 'Berat':
        return <Badge className="bg-red-500">Berat</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Tercatat':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Tercatat</Badge>;
      case 'Proses Konseling':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Proses Konseling</Badge>;
      case 'Panggilan Orang Tua':
        return <Badge variant="outline" className="border-red-500 text-red-500">Panggilan Orang Tua</Badge>;
      case 'Selesai':
        return <Badge variant="outline" className="border-green-500 text-green-500">Selesai</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Pencatatan Pelanggaran"
      description="Sistem pencatatan pelanggaran tata tertib siswa"
      userRole="tppk"
      userName="Admin TPPK"
      showBackButton
      backTo="/dashboard"
    >
      <div className="mb-4 flex justify-end gap-2">
        <Button variant="outline" className="gap-2">
          <Flag size={16} />
          Tata Tertib
        </Button>
        <Button className="gap-2">
          <Plus size={16} />
          Catat Pelanggaran
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-4 sm:flex sm:flex-row">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="minor">Ringan</TabsTrigger>
          <TabsTrigger value="medium">Sedang</TabsTrigger>
          <TabsTrigger value="major">Berat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Daftar Pelanggaran</CardTitle>
              <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari pelanggaran..."
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {violations.map((violation) => (
                  <div key={violation.id} className="p-4 border rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={16} className="text-red-500" />
                          <h3 className="text-lg font-semibold">{violation.violation}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {getCategoryBadge(violation.category)}
                          <span className="text-red-500 font-medium">{violation.points} poin</span>
                          {getStatusBadge(violation.status)}
                        </div>
                        <p className="text-muted-foreground mt-2">
                          Siswa: <span className="font-medium text-foreground">{violation.student}</span> - {violation.class}
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <p>Tanggal: {violation.date}</p>
                          <p>Pencatat: {violation.handler}</p>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 ml-auto md:ml-0 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">Detail</Button>
                        <Button variant="outline" size="sm">Tindak Lanjut</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="minor">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Pelanggaran Ringan</h3>
                <p className="text-muted-foreground">Menampilkan pelanggaran kategori ringan dengan pengurangan 5 poin.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medium">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <AlertTriangle size={48} className="mx-auto text-orange-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Pelanggaran Sedang</h3>
                <p className="text-muted-foreground">Menampilkan pelanggaran kategori sedang dengan pengurangan 10-15 poin.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="major">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Pelanggaran Berat</h3>
                <p className="text-muted-foreground">Menampilkan pelanggaran kategori berat dengan pengurangan 20+ poin.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DisciplinePage;
