
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Clock, User, Calendar, Users } from 'lucide-react';

// Types
type Extracurricular = {
  id: number;
  name: string;
  category: string;
  schedule: string;
  location: string;
  coach: string;
  description: string;
  studentCount: number;
  status: string;
};

type ExtracurricularStudent = {
  id: number;
  extracurricularId: number;
  studentId: string;
  studentName: string;
  class: string;
  joinDate: string;
  status: string;
  attendance: number;
};

const ExtracurricularPage = () => {
  // Sample data for extracurricular activities
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([
    {
      id: 1,
      name: 'Pramuka',
      category: 'Kepemimpinan',
      schedule: 'Jumat, 14:00 - 16:00',
      location: 'Lapangan Utama',
      coach: 'Bapak Ahmad',
      description: 'Kegiatan kepramukaan untuk membangun karakter, kedisiplinan, dan kepemimpinan',
      studentCount: 45,
      status: 'active',
    },
    {
      id: 2,
      name: 'Basket',
      category: 'Olahraga',
      schedule: 'Selasa & Kamis, 15:30 - 17:30',
      location: 'Lapangan Basket',
      coach: 'Bapak Budi',
      description: 'Latihan basket untuk persiapan kompetisi antar sekolah dan pengembangan keterampilan',
      studentCount: 18,
      status: 'active',
    },
    {
      id: 3,
      name: 'Paduan Suara',
      category: 'Seni Musik',
      schedule: 'Rabu, 14:00 - 16:00',
      location: 'Ruang Musik',
      coach: 'Ibu Dewi',
      description: 'Latihan paduan suara untuk acara sekolah dan lomba',
      studentCount: 25,
      status: 'active',
    },
    {
      id: 4,
      name: 'Robotik',
      category: 'Teknologi',
      schedule: 'Senin, 15:00 - 17:00',
      location: 'Lab Komputer',
      coach: 'Bapak Rudi',
      description: 'Pengembangan keterampilan robotik dan persiapan kompetisi',
      studentCount: 15,
      status: 'active',
    },
  ]);

  // Sample data for students in extracurriculars
  const [students, setStudents] = useState<ExtracurricularStudent[]>([
    {
      id: 1,
      extracurricularId: 1,
      studentId: 'S12345',
      studentName: 'Budi Santoso',
      class: 'XI RPL 1',
      joinDate: '12 Juli 2023',
      status: 'active',
      attendance: 85,
    },
    {
      id: 2,
      extracurricularId: 1,
      studentId: 'S12346',
      studentName: 'Siti Nuraini',
      class: 'X TKJ 2',
      joinDate: '15 Juli 2023',
      status: 'active',
      attendance: 92,
    },
    {
      id: 3,
      extracurricularId: 2,
      studentId: 'S12347',
      studentName: 'Ahmad Rizki',
      class: 'XII MM 1',
      joinDate: '10 Juli 2023',
      status: 'active',
      attendance: 78,
    },
    {
      id: 4,
      extracurricularId: 3,
      studentId: 'S12348',
      studentName: 'Dewi Anggraini',
      class: 'X AKL 1',
      joinDate: '20 Juli 2023',
      status: 'active',
      attendance: 95,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [selectedExtracurricular, setSelectedExtracurricular] = useState<Extracurricular | null>(null);

  // Filter extracurriculars based on search and active tab
  const filteredExtracurriculars = extracurriculars.filter(extracurricular => {
    const matchesSearch = extracurricular.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      extracurricular.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && extracurricular.category.toLowerCase() === activeTab.toLowerCase();
  });

  // Get students for a specific extracurricular
  const getStudentsForExtracurricular = (extracurricularId: number) => {
    return students.filter(student => student.extracurricularId === extracurricularId);
  };

  // Handle add new extracurricular
  const handleAddExtracurricular = (e: React.FormEvent) => {
    e.preventDefault();
    setDialogOpen(false);
  };

  // Handle add student to extracurricular
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentDialogOpen(false);
  };

  // Handle view extracurricular students
  const handleViewStudents = (extracurricular: Extracurricular) => {
    setSelectedExtracurricular(extracurricular);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Ekstrakurikuler</h1>
            <p className="text-muted-foreground">
              Kelola kegiatan ekstrakurikuler dan peserta
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Ekstrakurikuler
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Tambah Ekstrakurikuler Baru</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddExtracurricular}>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Nama Ekstrakurikuler</Label>
                    <Input id="name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="olahraga">Olahraga</SelectItem>
                          <SelectItem value="seni">Seni</SelectItem>
                          <SelectItem value="teknologi">Teknologi</SelectItem>
                          <SelectItem value="kepemimpinan">Kepemimpinan</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="schedule">Jadwal</Label>
                      <Input id="schedule" placeholder="contoh: Senin, 15:00 - 17:00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="location">Lokasi</Label>
                      <Input id="location" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="coach">Pembina/Pelatih</Label>
                      <Input id="coach" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Input id="description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Daftar Ekstrakurikuler</CardTitle>
                <CardDescription>
                  Total {filteredExtracurriculars.length} ekstrakurikuler
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari ekstrakurikuler..."
                  className="pl-8 md:w-[240px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="olahraga">Olahraga</TabsTrigger>
                <TabsTrigger value="seni">Seni</TabsTrigger>
                <TabsTrigger value="teknologi">Teknologi</TabsTrigger>
                <TabsTrigger value="kepemimpinan">Kepemimpinan</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExtracurriculars.map((extracurricular) => (
                <Card key={extracurricular.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{extracurricular.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {extracurricular.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{extracurricular.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{extracurricular.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4" />
                        <span>{extracurricular.coach}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{extracurricular.studentCount} Siswa</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {extracurricular.description}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedExtracurricular(extracurricular);
                          setStudentDialogOpen(true);
                        }}
                      >
                        Tambah Siswa
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleViewStudents(extracurricular)}
                      >
                        Lihat Peserta
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedExtracurricular && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Peserta {selectedExtracurricular.name}</CardTitle>
                  <CardDescription>
                    Total {getStudentsForExtracurricular(selectedExtracurricular.id).length} siswa terdaftar
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b bg-muted/50 p-3 font-medium">
                  <div>Nama Siswa</div>
                  <div>ID Siswa</div>
                  <div>Kelas</div>
                  <div>Tanggal Bergabung</div>
                  <div>Kehadiran</div>
                </div>
                {getStudentsForExtracurricular(selectedExtracurricular.id).map((student) => (
                  <div key={student.id} className="grid grid-cols-5 border-b p-3">
                    <div>{student.studentName}</div>
                    <div>{student.studentId}</div>
                    <div>{student.class}</div>
                    <div>{student.joinDate}</div>
                    <div>{student.attendance}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dialog for adding students to extracurricular */}
        <Dialog open={studentDialogOpen} onOpenChange={setStudentDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>
                Tambah Siswa ke {selectedExtracurricular?.name}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddStudent}>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="student">Siswa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student1">Ahmad Fauzi - X RPL 1</SelectItem>
                      <SelectItem value="student2">Dewi Cahyani - X TKJ 2</SelectItem>
                      <SelectItem value="student3">Fajar Ramadhan - X MM 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Tambahkan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ExtracurricularPage;
