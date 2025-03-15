
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar as CalendarIcon, Search, Plus, Filter, Clock, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Types
type Extracurricular = {
  id: number;
  name: string;
  category: string;
  description: string;
  schedule: string;
  location: string;
  coach: string;
  maxMembers: number;
  currentMembers: number;
  coverImage?: string;
};

type ExtracurricularMember = {
  id: number;
  extracurricularId: number;
  studentName: string;
  studentClass: string;
  studentId: string;
  joinDate: Date;
  position: string;
  status: 'active' | 'inactive';
  avatar?: string;
};

const ExtracurricularPage = () => {
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([
    {
      id: 1,
      name: 'Futsal',
      category: 'Olahraga',
      description: 'Kegiatan latihan dan pertandingan futsal',
      schedule: 'Selasa & Kamis, 15:00 - 17:00',
      location: 'Lapangan Futsal Sekolah',
      coach: 'Pak Budi',
      maxMembers: 20,
      currentMembers: 15,
      coverImage: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Paduan Suara',
      category: 'Kesenian',
      description: 'Grup vokal untuk acara sekolah dan perlombaan',
      schedule: 'Rabu & Jumat, 14:00 - 16:00',
      location: 'Ruang Musik',
      coach: 'Ibu Siti',
      maxMembers: 30,
      currentMembers: 25,
      coverImage: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Karya Ilmiah Remaja',
      category: 'Akademik',
      description: 'Pelatihan dan pengembangan penelitian ilmiah',
      schedule: 'Senin & Rabu, 15:30 - 17:00',
      location: 'Laboratorium Sains',
      coach: 'Pak Darmawan',
      maxMembers: 25,
      currentMembers: 12,
      coverImage: '/placeholder.svg'
    }
  ]);

  const [members, setMembers] = useState<ExtracurricularMember[]>([
    {
      id: 1,
      extracurricularId: 1,
      studentName: 'Ahmad Fauzi',
      studentClass: 'XI RPL 1',
      studentId: 'S12345',
      joinDate: new Date(2023, 6, 15),
      position: 'Kapten',
      status: 'active',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      extracurricularId: 1,
      studentName: 'Budi Santoso',
      studentClass: 'X RPL 2',
      studentId: 'S12346',
      joinDate: new Date(2023, 6, 20),
      position: 'Anggota',
      status: 'active',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      extracurricularId: 2,
      studentName: 'Siti Aisyah',
      studentClass: 'XII MM 1',
      studentId: 'S12347',
      joinDate: new Date(2023, 7, 10),
      position: 'Ketua',
      status: 'active',
      avatar: '/placeholder.svg'
    }
  ]);

  const [activeTab, setActiveTab] = useState('extracurricular');
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Filtered extracurriculars based on search query and filter
  const filteredExtracurriculars = extracurriculars.filter(extracurricular => {
    const matchesSearch = 
      extracurricular.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      extracurricular.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && extracurricular.category.toLowerCase() === filter.toLowerCase();
  });

  // Handle add new extracurricular
  const handleAddExtracurricular = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    setOpen(false);
  };

  return (
    <DashboardLayout
      title="Ekstrakurikuler"
      description="Kelola dan pantau aktivitas ekstrakurikuler sekolah"
    >
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Ekstrakurikuler</h1>
            <p className="text-muted-foreground">
              Kelola dan pantau aktivitas ekstrakurikuler sekolah
            </p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Ekstrakurikuler
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Tambah Ekstrakurikuler Baru</DialogTitle>
                <DialogDescription>
                  Tambahkan ekstrakurikuler baru. Klik simpan ketika selesai.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddExtracurricular}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Nama Ekstrakurikuler</Label>
                      <Input id="name" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="olahraga">Olahraga</SelectItem>
                          <SelectItem value="kesenian">Kesenian</SelectItem>
                          <SelectItem value="akademik">Akademik</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Input id="description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="schedule">Jadwal</Label>
                      <Input id="schedule" placeholder="contoh: Senin & Rabu, 15:00 - 17:00" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="location">Lokasi</Label>
                      <Input id="location" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="coach">Pelatih/Pembina</Label>
                      <Input id="coach" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="maxMembers">Kuota Anggota</Label>
                      <Input id="maxMembers" type="number" min="1" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="extracurricular">Ekstrakurikuler</TabsTrigger>
            <TabsTrigger value="members">Anggota</TabsTrigger>
          </TabsList>
          
          <TabsContent value="extracurricular">
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Daftar Ekstrakurikuler</CardTitle>
                    <CardDescription>
                      Total {filteredExtracurriculars.length} ekstrakurikuler
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
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
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="md:w-[180px]">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <SelectValue placeholder="Filter kategori" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        <SelectItem value="olahraga">Olahraga</SelectItem>
                        <SelectItem value="kesenian">Kesenian</SelectItem>
                        <SelectItem value="akademik">Akademik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExtracurriculars.map((extracurricular) => (
                <Card key={extracurricular.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={extracurricular.coverImage || '/placeholder.svg'}
                      alt={extracurricular.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{extracurricular.name}</h3>
                        <Badge variant="outline" className="mt-1">{extracurricular.category}</Badge>
                      </div>
                      <Badge variant="secondary" className="bg-primary text-white">
                        {extracurricular.currentMembers}/{extracurricular.maxMembers}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {extracurricular.description}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{extracurricular.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{extracurricular.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Pembina: {extracurricular.coach}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">Detail</Button>
                      <Button variant="outline" size="sm">Anggota</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Anggota Ekstrakurikuler</CardTitle>
                <CardDescription>
                  Daftar seluruh siswa yang tergabung dalam ekstrakurikuler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Daftar anggota akan ditampilkan di sini...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ExtracurricularPage;
