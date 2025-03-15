
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar as CalendarIcon, Check, Filter, Plus, Search, Shield, X } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Types
type Violation = {
  id: number;
  studentName: string;
  studentId: string;
  class: string;
  date: Date;
  category: string;
  points: number;
  description: string;
  status: 'pending' | 'verified' | 'rejected';
  reporter: string;
};

const DisciplinePage = () => {
  const [activeTab, setActiveTab] = useState('violations');
  const [violations, setViolations] = useState<Violation[]>([
    {
      id: 1,
      studentName: 'Ahmad Rizky',
      studentId: 'S12345',
      class: 'XI RPL 1',
      date: new Date(2023, 8, 15),
      category: 'Kehadiran',
      points: 10,
      description: 'Terlambat masuk sekolah lebih dari 30 menit tanpa keterangan',
      status: 'verified',
      reporter: 'Bpk. Joko'
    },
    {
      id: 2,
      studentName: 'Rizki Pratama',
      studentId: 'S12346',
      class: 'X TKJ 2',
      date: new Date(2023, 8, 16),
      category: 'Seragam',
      points: 5,
      description: 'Tidak mengenakan atribut seragam lengkap (dasi)',
      status: 'verified',
      reporter: 'Ibu Siti'
    },
    {
      id: 3,
      studentName: 'Dian Lestari',
      studentId: 'S12347',
      class: 'XII MM 1',
      date: new Date(2023, 8, 17),
      category: 'Perilaku',
      points: 20,
      description: 'Menggunakan ponsel saat pelajaran berlangsung',
      status: 'pending',
      reporter: 'Bpk. Andi'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Filtered violations based on search query and filter
  const filteredViolations = violations.filter(violation => {
    const matchesSearch = 
      violation.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      violation.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && violation.category.toLowerCase() === filter.toLowerCase();
  });

  // Handle add new violation
  const handleAddViolation = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    setOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500"><Check className="mr-1 h-3 w-3" /> Terverifikasi</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500"><AlertTriangle className="mr-1 h-3 w-3" /> Menunggu</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500"><X className="mr-1 h-3 w-3" /> Ditolak</Badge>;
      default:
        return <Badge className="bg-gray-500">Tidak diketahui</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Kedisiplinan"
      description="Kelola dan pantau kedisiplinan siswa"
    >
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kedisiplinan Siswa</h1>
            <p className="text-muted-foreground">
              Pengelolaan pelanggaran dan poin kedisiplinan siswa
            </p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Catat Pelanggaran
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Catat Pelanggaran Siswa</DialogTitle>
                <DialogDescription>
                  Tambahkan catatan pelanggaran siswa. Klik simpan ketika selesai.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddViolation}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="studentName">Nama Siswa</Label>
                      <Input id="studentName" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="class">Kelas</Label>
                      <Input id="class" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Tanggal</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
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
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="category">Kategori Pelanggaran</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kehadiran">Kehadiran</SelectItem>
                          <SelectItem value="seragam">Seragam</SelectItem>
                          <SelectItem value="perilaku">Perilaku</SelectItem>
                          <SelectItem value="akademik">Akademik</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Deskripsi Pelanggaran</Label>
                    <Input id="description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="points">Poin</Label>
                      <Input id="points" type="number" min="0" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="reporter">Pelapor</Label>
                      <Input id="reporter" />
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="violations" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Pelanggaran</span>
            </TabsTrigger>
            <TabsTrigger value="points" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Rekapitulasi Poin</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="violations">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Daftar Pelanggaran</CardTitle>
                    <CardDescription>
                      Total {filteredViolations.length} pelanggaran tercatat
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Cari siswa atau pelanggaran..."
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
                        <SelectItem value="kehadiran">Kehadiran</SelectItem>
                        <SelectItem value="seragam">Seragam</SelectItem>
                        <SelectItem value="perilaku">Perilaku</SelectItem>
                        <SelectItem value="akademik">Akademik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredViolations.map((violation) => (
                    <Card key={violation.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{violation.studentName}</h3>
                              {getStatusBadge(violation.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{violation.class} • {violation.studentId}</p>
                            <div className="mt-2">
                              <p className="text-sm"><span className="font-medium">Kategori:</span> {violation.category}</p>
                              <p className="text-sm"><span className="font-medium">Tanggal:</span> {format(violation.date, 'PPP', { locale: id })}</p>
                              <p className="text-sm"><span className="font-medium">Pelanggaran:</span> {violation.description}</p>
                              <p className="text-sm"><span className="font-medium">Pelapor:</span> {violation.reporter}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <Badge variant="outline" className="text-lg font-bold">{violation.points} Poin</Badge>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Detail</Button>
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
          
          <TabsContent value="points">
            <Card>
              <CardHeader>
                <CardTitle>Rekapitulasi Poin Siswa</CardTitle>
                <CardDescription>
                  Ringkasan poin pelanggaran per siswa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Konten rekapitulasi poin akan ditampilkan di sini...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DisciplinePage;
