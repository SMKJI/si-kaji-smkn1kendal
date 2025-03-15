
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Search, Calendar, Filter, Eye, Edit, ArrowRight, Bookmark } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { toast } from 'sonner';
import PageTransition from '@/components/layout/PageTransition';

const ExtracurricularJournalPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEkskul, setSelectedEkskul] = useState('all');
  
  // Dummy journal entries
  const [journals, setJournals] = useState([
    {
      id: 1,
      title: 'Jurnal Latihan Pramuka - Tali Temali',
      date: '2023-12-12',
      extracurricular: 'Pramuka',
      status: 'completed',
      description: 'Kegiatan latihan rutin pramuka dengan materi tali temali dan pioneering. Siswa belajar berbagai simpul dan penggunaannya dalam kegiatan perkemahan.',
      participants: 28,
      duration: '2 jam',
      achievements: 'Siswa berhasil membuat 3 jenis simpul dan memahami penggunaannya',
      nextPlan: 'Latihan mendirikan tenda dan teknik bertahan hidup dasar',
    },
    {
      id: 2,
      title: 'Jurnal Latihan Basket - Shooting Drill',
      date: '2023-12-10',
      extracurricular: 'Basket',
      status: 'completed',
      description: 'Latihan shooting dan free throw untuk persiapan pertandingan antar sekolah tingkat kabupaten.',
      participants: 15,
      duration: '2.5 jam',
      achievements: 'Akurasi shooting meningkat 15% dari latihan sebelumnya',
      nextPlan: 'Latihan strategi serangan dan pertahanan tim',
    },
    {
      id: 3,
      title: 'Jurnal Latihan Paduan Suara - Harmoni',
      date: '2023-12-08',
      extracurricular: 'Paduan Suara',
      status: 'completed',
      description: 'Latihan menyanyi lagu daerah dengan harmoni empat suara untuk pertunjukan hari guru nasional.',
      participants: 20,
      duration: '1.5 jam',
      achievements: 'Berhasil menguasai 2 lagu dengan harmoni yang baik',
      nextPlan: 'Latihan koreografi dan penampilan panggung',
    },
    {
      id: 4,
      title: 'Jurnal Latihan Robotik - Pemrograman Dasar',
      date: '2023-12-05',
      extracurricular: 'Robotik',
      status: 'completed',
      description: 'Pengenalan dasar-dasar pemrograman robot menggunakan Arduino untuk persiapan kompetisi robotik.',
      participants: 12,
      duration: '3 jam',
      achievements: 'Siswa berhasil membuat program sederhana untuk menggerakkan robot',
      nextPlan: 'Pengembangan sensor dan sistem navigasi robot',
    },
  ]);

  // New journal form state
  const [newJournal, setNewJournal] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    extracurricular: '',
    description: '',
    participants: '',
    duration: '',
    achievements: '',
    nextPlan: '',
    status: 'completed',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJournal({ ...newJournal, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewJournal({ ...newJournal, [name]: value });
  };

  const handleAddJournal = () => {
    // Basic validation
    if (!newJournal.title || !newJournal.extracurricular || !newJournal.description) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const newJournalEntry = {
      id: journals.length + 1,
      ...newJournal,
      participants: parseInt(newJournal.participants) || 0,
    };

    setJournals([newJournalEntry, ...journals]);
    
    // Reset form
    setNewJournal({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      extracurricular: '',
      description: '',
      participants: '',
      duration: '',
      achievements: '',
      nextPlan: '',
      status: 'completed',
    });

    toast.success('Jurnal berhasil ditambahkan');
  };

  const filteredJournals = journals.filter(journal => {
    const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          journal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedEkskul === 'all') return matchesSearch;
    return matchesSearch && journal.extracurricular === selectedEkskul;
  });

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Jurnal Ekstrakurikuler</h1>
          <p className="text-muted-foreground">
            Catat dan kelola jurnal kegiatan ekstrakurikuler
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari jurnal..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedEkskul} onValueChange={setSelectedEkskul}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter Ekstrakurikuler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Ekskul</SelectItem>
                <SelectItem value="Pramuka">Pramuka</SelectItem>
                <SelectItem value="Basket">Basket</SelectItem>
                <SelectItem value="Futsal">Futsal</SelectItem>
                <SelectItem value="Paduan Suara">Paduan Suara</SelectItem>
                <SelectItem value="Robotik">Robotik</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Buat Jurnal Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Buat Jurnal Baru</DialogTitle>
                  <DialogDescription>
                    Isi detail kegiatan ekstrakurikuler yang telah dilaksanakan
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Judul Jurnal</Label>
                    <Input 
                      id="title" 
                      name="title"
                      placeholder="Judul kegiatan ekstrakurikuler" 
                      value={newJournal.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Tanggal Kegiatan</Label>
                      <Input 
                        id="date" 
                        name="date"
                        type="date" 
                        value={newJournal.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="extracurricular">Ekstrakurikuler</Label>
                      <Select 
                        name="extracurricular" 
                        value={newJournal.extracurricular}
                        onValueChange={(value) => handleSelectChange('extracurricular', value)}
                      >
                        <SelectTrigger id="extracurricular">
                          <SelectValue placeholder="Pilih ekstrakurikuler" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pramuka">Pramuka</SelectItem>
                          <SelectItem value="Basket">Basket</SelectItem>
                          <SelectItem value="Futsal">Futsal</SelectItem>
                          <SelectItem value="Paduan Suara">Paduan Suara</SelectItem>
                          <SelectItem value="Robotik">Robotik</SelectItem>
                          <SelectItem value="PMR">PMR</SelectItem>
                          <SelectItem value="English Club">English Club</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="participants">Jumlah Peserta</Label>
                      <Input 
                        id="participants" 
                        name="participants"
                        type="number"
                        placeholder="Jumlah peserta yang hadir" 
                        value={newJournal.participants}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Durasi Kegiatan</Label>
                      <Input 
                        id="duration" 
                        name="duration"
                        placeholder="Contoh: 2 jam" 
                        value={newJournal.duration}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Deskripsi Kegiatan</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      placeholder="Jelaskan detail kegiatan yang dilaksanakan" 
                      className="min-h-[100px]"
                      value={newJournal.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="achievements">Pencapaian</Label>
                    <Textarea 
                      id="achievements" 
                      name="achievements"
                      placeholder="Tuliskan pencapaian atau hasil dari kegiatan ini" 
                      className="min-h-[80px]"
                      value={newJournal.achievements}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="nextPlan">Rencana Kegiatan Selanjutnya</Label>
                    <Textarea 
                      id="nextPlan" 
                      name="nextPlan"
                      placeholder="Tuliskan rencana untuk kegiatan berikutnya" 
                      className="min-h-[80px]"
                      value={newJournal.nextPlan}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddJournal}>Simpan Jurnal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {filteredJournals.length > 0 ? (
            filteredJournals.map((journal) => (
              <Card key={journal.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    {journal.title}
                  </CardTitle>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(journal.date)}
                    </p>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                      Terlaksana
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <span className="text-xs font-medium uppercase text-primary bg-primary/10 px-2 py-1 rounded">
                      {journal.extracurricular}
                    </span>
                  </div>
                  <p className="text-sm mb-4 line-clamp-2">
                    {journal.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Peserta</span>
                      <span>{journal.participants} siswa</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Durasi</span>
                      <span>{journal.duration}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                    <Button size="sm" className="gap-1">
                      <Eye className="h-4 w-4" /> Lihat Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center p-8 bg-muted/20 rounded-lg">
              <FileText className="h-12 w-12 mb-4 text-muted" />
              <h3 className="font-medium text-lg mb-1">Tidak ada jurnal yang ditemukan</h3>
              <p className="text-muted-foreground text-center">
                Jurnal yang Anda cari tidak ditemukan. Coba ubah filter atau buat jurnal baru.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ExtracurricularJournalPage;
