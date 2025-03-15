
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Search, Filter, Plus, AlertCircle, ThumbsUp, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { DISCIPLINE_POINTS } from '@/lib/constants';

// Types
type DisciplineRecord = {
  id: number;
  studentName: string;
  studentClass: string;
  date: string;
  recordType: string;
  category: string;
  description: string;
  points: number;
  status: string;
  location: string;
  witnessName: string;
  notes: string;
};

const DisciplinePage = () => {
  const [records, setRecords] = useState<DisciplineRecord[]>([
    {
      id: 1,
      studentName: 'Budi Santoso',
      studentClass: 'XI RPL 1',
      date: '15 Agustus 2023',
      recordType: 'violation',
      category: 'Terlambat',
      description: 'Terlambat masuk sekolah 30 menit',
      points: -5,
      status: 'processed',
      location: 'Gerbang Sekolah',
      witnessName: 'Satpam Sekolah',
      notes: 'Siswa mengaku kesiangan'
    },
    {
      id: 2,
      studentName: 'Siti Nuraini',
      studentClass: 'X TKJ 2',
      date: '18 Agustus 2023',
      recordType: 'achievement',
      category: 'Prestasi Akademik',
      description: 'Juara 1 Olimpiade Matematika Tingkat Kabupaten',
      points: 15,
      status: 'processed',
      location: 'SMAN 1 Kendal',
      witnessName: 'Ibu Sari (Guru Matematika)',
      notes: 'Menjadi perwakilan ke tingkat provinsi'
    },
    {
      id: 3,
      studentName: 'Ahmad Rizki',
      studentClass: 'XII MM 1',
      date: '20 Agustus 2023',
      recordType: 'violation',
      category: 'Atribut Tidak Lengkap',
      description: 'Tidak memakai dasi dan ikat pinggang',
      points: -5,
      status: 'processed',
      location: 'Ruang Kelas',
      witnessName: 'Bapak Joko (Wali Kelas)',
      notes: 'Sudah diperingatkan sebelumnya'
    },
    {
      id: 4,
      studentName: 'Dewi Anggraini',
      studentClass: 'X AKL 1',
      date: '22 Agustus 2023',
      recordType: 'achievement',
      category: 'Perilaku Baik',
      description: 'Membantu teman yang sakit dan mengantarkan ke UKS',
      points: 10,
      status: 'processed',
      location: 'Koridor Sekolah',
      witnessName: 'Ibu Rina (Guru Piket)',
      notes: 'Menunjukkan kepedulian yang tinggi'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [recordType, setRecordType] = useState('violation');

  // Filter records based on search query and tab selection
  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && record.recordType === activeTab;
  });

  // Add new discipline record
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would add form validation and API calls
    // For now, just add a dummy record to demonstrate the functionality
    const newRecord: DisciplineRecord = {
      id: records.length + 1,
      studentName: 'Nama Siswa',
      studentClass: 'Kelas Siswa',
      date: format(selectedDate || new Date(), 'dd MMMM yyyy', { locale: id }),
      recordType: recordType,
      category: recordType === 'violation' ? 'Terlambat' : 'Prestasi Akademik',
      description: 'Deskripsi pelanggaran/prestasi',
      points: recordType === 'violation' ? DISCIPLINE_POINTS.MINOR_VIOLATION : DISCIPLINE_POINTS.ACHIEVEMENT,
      status: 'processed',
      location: 'Lokasi',
      witnessName: 'Nama Saksi',
      notes: 'Catatan tambahan'
    };
    
    setRecords([...records, newRecord]);
    setOpen(false);
  };

  const getPointsBadge = (points: number) => {
    if (points > 0) {
      return <Badge className="bg-green-500">+{points} Poin</Badge>;
    } else {
      return <Badge className="bg-red-500">{points} Poin</Badge>;
    }
  };

  const getRecordIcon = (recordType: string) => {
    if (recordType === 'violation') {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    } else {
      return <ThumbsUp className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kedisiplinan</h1>
            <p className="text-muted-foreground">
              Pencatatan pelanggaran dan prestasi siswa
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Catatan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Tambah Catatan Kedisiplinan</DialogTitle>
                <DialogDescription>
                  Tambahkan catatan pelanggaran atau prestasi siswa. Klik simpan ketika selesai.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddRecord}>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="recordType">Jenis Catatan</Label>
                    <Select value={recordType} onValueChange={setRecordType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis catatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="violation">Pelanggaran</SelectItem>
                        <SelectItem value="achievement">Prestasi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="studentName">Nama Siswa</Label>
                      <Input id="studentName" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="studentClass">Kelas</Label>
                      <Input id="studentClass" />
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
                            {selectedDate ? format(selectedDate, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {recordType === 'violation' ? (
                            <>
                              <SelectItem value="terlambat">Terlambat</SelectItem>
                              <SelectItem value="atribut">Atribut Tidak Lengkap</SelectItem>
                              <SelectItem value="kehadiran">Kehadiran</SelectItem>
                              <SelectItem value="kerapian">Kerapian</SelectItem>
                              <SelectItem value="perilaku">Perilaku Buruk</SelectItem>
                              <SelectItem value="lainnya">Lainnya</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="akademik">Prestasi Akademik</SelectItem>
                              <SelectItem value="non-akademik">Prestasi Non-Akademik</SelectItem>
                              <SelectItem value="perilaku">Perilaku Baik</SelectItem>
                              <SelectItem value="kreativitas">Kreativitas</SelectItem>
                              <SelectItem value="kepemimpinan">Kepemimpinan</SelectItem>
                              <SelectItem value="lainnya">Lainnya</SelectItem>
                            </>
                          )}
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
                      <Label htmlFor="location">Lokasi</Label>
                      <Input id="location" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="witnessName">Saksi/Pelapor</Label>
                      <Input id="witnessName" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">Catatan Tambahan</Label>
                    <Input id="notes" />
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
                <CardTitle>Catatan Kedisiplinan</CardTitle>
                <CardDescription>
                  Total {filteredRecords.length} catatan
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari siswa atau catatan..."
                    className="pl-8 md:w-[240px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Semua</TabsTrigger>
                    <TabsTrigger value="violation">Pelanggaran</TabsTrigger>
                    <TabsTrigger value="achievement">Prestasi</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          {getRecordIcon(record.recordType)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{record.studentName}</h3>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{record.studentClass}</span>
                            {getPointsBadge(record.points)}
                          </div>
                          <p className="text-sm text-muted-foreground">{record.date} • {record.category}</p>
                          <div className="mt-2">
                            <p className="text-sm"><strong>Deskripsi:</strong> {record.description}</p>
                            <p className="text-sm"><strong>Lokasi:</strong> {record.location}</p>
                            <p className="text-sm"><strong>Saksi/Pelapor:</strong> {record.witnessName}</p>
                            {record.notes && <p className="text-sm"><strong>Catatan:</strong> {record.notes}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Detail</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DisciplinePage;
