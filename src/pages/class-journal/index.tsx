
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Calendar as CalendarIcon, Plus, Search, Filter, BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Types
type JournalEntry = {
  id: number;
  date: Date;
  classId: string;
  activityType: string;
  description: string;
  followUp: string;
  notes: string;
  status: string;
};

const ClassJournalPage = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      date: new Date(2023, 7, 15),
      classId: 'X RPL 1',
      activityType: 'Perwalian Rutin',
      description: 'Diskusi persiapan ujian tengah semester',
      followUp: 'Memberikan jadwal dan materi ujian',
      notes: 'Beberapa siswa menanyakan materi yang sulit',
      status: 'completed'
    },
    {
      id: 2,
      date: new Date(2023, 7, 22),
      classId: 'X RPL 1',
      activityType: 'Konseling Kelas',
      description: 'Mediasi konflik antar siswa',
      followUp: 'Melakukan monitoring harian',
      notes: 'Kedua pihak telah berdamai',
      status: 'completed'
    },
    {
      id: 3,
      date: new Date(2023, 8, 5),
      classId: 'X RPL 1',
      activityType: 'Evaluasi Akademik',
      description: 'Analisis hasil ujian tengah semester',
      followUp: 'Merencanakan program remedial',
      notes: 'Tiga mata pelajaran dengan nilai rendah',
      status: 'in_progress'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch = 
      entry.classId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.activityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && entry.status === activeTab;
  });

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would add form validation and API calls
    // For now, just add a dummy entry to demonstrate the functionality
    const newEntry: JournalEntry = {
      id: journalEntries.length + 1,
      date: selectedDate || new Date(),
      classId: 'X RPL 1',
      activityType: 'Perwalian Rutin',
      description: 'Diskusi mingguan',
      followUp: 'Monitoring kehadiran',
      notes: 'Kehadiran siswa baik',
      status: 'completed'
    };
    
    setJournalEntries([...journalEntries, newEntry]);
    setOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Selesai</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500"><Clock className="mr-1 h-3 w-3" /> Berlangsung</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500"><AlertCircle className="mr-1 h-3 w-3" /> Menunggu</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Jurnal Perwalian</h1>
            <p className="text-muted-foreground">
              Pencatatan dan monitoring kegiatan perwalian kelas
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
                <DialogTitle>Tambah Catatan Jurnal</DialogTitle>
                <DialogDescription>
                  Tambahkan catatan kegiatan perwalian. Klik simpan ketika selesai.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEntry}>
                <div className="grid gap-4 py-4">
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
                      <Label htmlFor="classId">Kelas</Label>
                      <Select defaultValue="X RPL 1">
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="X RPL 1">X RPL 1</SelectItem>
                          <SelectItem value="X RPL 2">X RPL 2</SelectItem>
                          <SelectItem value="XI RPL 1">XI RPL 1</SelectItem>
                          <SelectItem value="XI RPL 2">XI RPL 2</SelectItem>
                          <SelectItem value="XII RPL 1">XII RPL 1</SelectItem>
                          <SelectItem value="XII RPL 2">XII RPL 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="activityType">Jenis Kegiatan</Label>
                    <Select defaultValue="Perwalian Rutin">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kegiatan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Perwalian Rutin">Perwalian Rutin</SelectItem>
                        <SelectItem value="Konseling Kelas">Konseling Kelas</SelectItem>
                        <SelectItem value="Evaluasi Akademik">Evaluasi Akademik</SelectItem>
                        <SelectItem value="Pembinaan Karakter">Pembinaan Karakter</SelectItem>
                        <SelectItem value="Rapat Orang Tua">Rapat Orang Tua</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Deskripsi Kegiatan</Label>
                    <Input id="description" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="followUp">Tindak Lanjut</Label>
                    <Input id="followUp" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">Catatan Tambahan</Label>
                    <Input id="notes" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="completed">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Selesai</SelectItem>
                        <SelectItem value="in_progress">Sedang Berlangsung</SelectItem>
                        <SelectItem value="pending">Menunggu</SelectItem>
                      </SelectContent>
                    </Select>
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
                <CardTitle>Catatan Jurnal Perwalian</CardTitle>
                <CardDescription>
                  Total {filteredEntries.length} catatan
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari catatan..."
                    className="pl-8 md:w-[240px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Semua</TabsTrigger>
                    <TabsTrigger value="completed">Selesai</TabsTrigger>
                    <TabsTrigger value="in_progress">Berlangsung</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{entry.activityType}</h3>
                            {getStatusBadge(entry.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{format(entry.date, 'PPP', { locale: id })} • {entry.classId}</p>
                          <div className="mt-2">
                            <p className="text-sm"><strong>Deskripsi:</strong> {entry.description}</p>
                            <p className="text-sm"><strong>Tindak Lanjut:</strong> {entry.followUp}</p>
                            {entry.notes && <p className="text-sm"><strong>Catatan:</strong> {entry.notes}</p>}
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

export default ClassJournalPage;
