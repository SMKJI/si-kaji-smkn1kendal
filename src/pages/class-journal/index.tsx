
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Edit, Calendar, Clock, User, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

const ClassJournalPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Jurnal Perwalian - Si-Kaji';
  }, []);

  // Sample journal data
  const journals = [
    {
      id: 1,
      date: '15 September 2023',
      time: '09:00 - 09:45',
      class: 'XII RPL 1',
      title: 'Konsultasi Akademik',
      type: 'Individu',
      student: 'Andi Saputra',
      description: 'Pembahasan penurunan nilai matematika dan strategi belajar untuk persiapan ujian.',
      followUp: 'Akan diadakan monitoring mingguan dan pemberian tugas tambahan untuk latihan.'
    },
    {
      id: 2,
      date: '16 September 2023',
      time: '10:00 - 10:45',
      class: 'XII RPL 1',
      title: 'Pertemuan Rutin Kelas',
      type: 'Klasikal',
      student: '-',
      description: 'Pembahasan persiapan ujian semester dan pengarahan terkait tata tertib.',
      followUp: 'Membuat jadwal belajar kelompok untuk persiapan ujian.'
    },
    {
      id: 3,
      date: '18 September 2023',
      time: '13:00 - 13:30',
      class: 'XII RPL 1',
      title: 'Konsultasi Pelanggaran',
      type: 'Individu',
      student: 'Bayu Aditya',
      description: 'Pembahasan pelanggaran keterlambatan yang sering terjadi.',
      followUp: 'Siswa berjanji untuk lebih disiplin. Akan dilakukan pemantauan selama 2 minggu.'
    },
    {
      id: 4,
      date: '20 September 2023',
      time: '14:00 - 14:45',
      class: 'XII RPL 1',
      title: 'Pertemuan dengan Orang Tua',
      type: 'Keluarga',
      student: 'Cindy Permata',
      description: 'Diskusi dengan orang tua terkait persiapan kuliah dan rencana masa depan siswa.',
      followUp: 'Akan diadakan bimbingan karir dan membantu siswa mencari informasi perguruan tinggi.'
    },
    {
      id: 5,
      date: '22 September 2023',
      time: '09:00 - 10:30',
      class: 'XII RPL 1',
      title: 'Diskusi Masalah Kelas',
      type: 'Klasikal',
      student: '-',
      description: 'Pembahasan permasalahan pembelajaran dan dinamika kelas.',
      followUp: 'Pembentukan struktur kelas baru dan pembagian tugas untuk meningkatkan koordinasi.'
    }
  ];

  const getTypeBadge = (type) => {
    switch(type) {
      case 'Individu':
        return <Badge className="bg-blue-500">Individu</Badge>;
      case 'Klasikal':
        return <Badge className="bg-green-500">Klasikal</Badge>;
      case 'Keluarga':
        return <Badge className="bg-purple-500">Keluarga</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Jurnal Perwalian"
      description="Pencatatan kegiatan perwalian dan bimbingan siswa"
      userRole="class_teacher"
      userName="Wali Kelas"
      showBackButton
      backTo="/dashboard"
    >
      <div className="mb-6">
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center md:text-left md:flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Kelas: XII RPL 1</h3>
                <p className="text-muted-foreground">Tahun Ajaran 2023/2024</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Pilih Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Semester</SelectItem>
                    <SelectItem value="odd">Semester Ganjil</SelectItem>
                    <SelectItem value="even">Semester Genap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4 flex justify-end">
        <Button className="gap-2">
          <PlusCircle size={16} />
          Tambah Catatan
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-3 sm:flex sm:flex-row">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="individual">Individu</TabsTrigger>
          <TabsTrigger value="class">Klasikal</TabsTrigger>
          <TabsTrigger value="family">Keluarga</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Catatan Perwalian</CardTitle>
              <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari catatan..."
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {journals.map((journal) => (
                  <div key={journal.id} className="p-4 border rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Edit size={16} className="text-primary" />
                          <h3 className="text-lg font-semibold">{journal.title}</h3>
                          {getTypeBadge(journal.type)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            {journal.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock size={14} />
                            {journal.time}
                          </div>
                          {journal.student !== '-' && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground md:col-span-2">
                              <User size={14} />
                              Siswa: {journal.student}
                            </div>
                          )}
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium">Catatan:</p>
                          <p className="text-sm">{journal.description}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium">Tindak Lanjut:</p>
                          <p className="text-sm">{journal.followUp}</p>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 ml-auto md:ml-0 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">Detail</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="individual">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <User size={48} className="mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Perwalian Individu</h3>
                <p className="text-muted-foreground">Menampilkan catatan perwalian untuk siswa secara individual.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="class">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <User size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Perwalian Klasikal</h3>
                <p className="text-muted-foreground">Menampilkan catatan perwalian untuk kelas secara keseluruhan.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="family">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <User size={48} className="mx-auto text-purple-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Perwalian Keluarga</h3>
                <p className="text-muted-foreground">Menampilkan catatan perwalian yang melibatkan orang tua/wali siswa.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ClassJournalPage;
