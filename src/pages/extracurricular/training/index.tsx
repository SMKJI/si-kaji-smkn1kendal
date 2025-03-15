
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Search, Plus, Calendar, ChevronDown, Users, Flag, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

const ExtracurricularTrainingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [trainingPrograms, setTrainingPrograms] = useState([
    {
      id: 1,
      title: 'Program Latihan Pramuka 1',
      period: 'November - Desember 2023',
      description: 'Fokus pada pengembangan keterampilan kepemimpinan dan kerjasama tim melalui berbagai aktivitas outdoor.',
      status: 'active',
      extracurricular: 'Pramuka',
      participants: 24,
      sessions: 8,
      goals: ['Kepemimpinan', 'Kerjasama Tim', 'Navigasi'],
    },
    {
      id: 2,
      title: 'Program Latihan Basket 1',
      period: 'Januari - Februari 2024',
      description: 'Program latihan intensif untuk persiapan kejuaraan basket antar sekolah tingkat kabupaten.',
      status: 'planned',
      extracurricular: 'Basket',
      participants: 15,
      sessions: 12,
      goals: ['Teknik Dasar', 'Strategi Tim', 'Kondisi Fisik'],
    },
    {
      id: 3,
      title: 'Program Latihan Paduan Suara',
      period: 'Oktober - November 2023',
      description: 'Persiapan untuk penampilan paduan suara pada acara perayaan hari guru nasional.',
      status: 'completed',
      extracurricular: 'Paduan Suara',
      participants: 30,
      sessions: 10,
      goals: ['Harmoni', 'Teknik Vokal', 'Koreografi'],
    },
    {
      id: 4,
      title: 'Program Latihan Robotik',
      period: 'Desember 2023 - Januari 2024',
      description: 'Program pengembangan keterampilan pemrograman dan desain robot untuk kompetisi robotik regional.',
      status: 'active',
      extracurricular: 'Robotik',
      participants: 12,
      sessions: 15,
      goals: ['Pemrograman', 'Desain Mekanik', 'Pemecahan Masalah'],
    },
  ]);

  // Form state for new training program
  const [newProgram, setNewProgram] = useState({
    title: '',
    extracurricular: '',
    period: '',
    description: '',
    goals: '',
    sessions: '',
    status: 'planned',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleAddProgram = () => {
    // Basic validation
    if (!newProgram.title || !newProgram.extracurricular || !newProgram.period || !newProgram.description) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const goalsArray = newProgram.goals.split(',').map(goal => goal.trim());
    
    const newTrainingProgram = {
      id: trainingPrograms.length + 1,
      title: newProgram.title,
      period: newProgram.period,
      description: newProgram.description,
      status: newProgram.status,
      extracurricular: newProgram.extracurricular,
      participants: 0, // New programs start with 0 participants
      sessions: parseInt(newProgram.sessions) || 0,
      goals: goalsArray,
    };

    setTrainingPrograms([...trainingPrograms, newTrainingProgram]);
    
    // Reset form
    setNewProgram({
      title: '',
      extracurricular: '',
      period: '',
      description: '',
      goals: '',
      sessions: '',
      status: 'planned',
    });

    toast.success('Program latihan berhasil ditambahkan');
  };

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.extracurricular.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedPeriod === 'all') return matchesSearch;
    if (selectedPeriod === 'active') return matchesSearch && program.status === 'active';
    if (selectedPeriod === 'planned') return matchesSearch && program.status === 'planned';
    if (selectedPeriod === 'completed') return matchesSearch && program.status === 'completed';
    
    return matchesSearch;
  });

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-amber-100 text-amber-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Aktif';
      case 'planned': return 'Direncanakan';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Program Latihan</h1>
          <p className="text-muted-foreground">
            Rencanakan dan kelola program latihan ekstrakurikuler
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari program latihan..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="planned">Direncanakan</SelectItem>
                <SelectItem value="completed">Selesai</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Program Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Tambah Program Latihan Baru</DialogTitle>
                  <DialogDescription>
                    Isi detail program latihan baru untuk kegiatan ekstrakurikuler
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Judul Program</Label>
                    <Input 
                      id="title" 
                      name="title"
                      placeholder="Masukkan judul program latihan" 
                      value={newProgram.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="extracurricular">Ekstrakurikuler</Label>
                    <Select 
                      name="extracurricular" 
                      value={newProgram.extracurricular}
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
                  
                  <div className="grid gap-2">
                    <Label htmlFor="period">Periode</Label>
                    <Input 
                      id="period" 
                      name="period"
                      placeholder="Contoh: November - Desember 2023" 
                      value={newProgram.period}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="sessions">Jumlah Pertemuan</Label>
                    <Input 
                      id="sessions" 
                      name="sessions"
                      type="number"
                      placeholder="Masukkan jumlah pertemuan" 
                      value={newProgram.sessions}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="goals">Tujuan Program</Label>
                    <Input 
                      id="goals" 
                      name="goals"
                      placeholder="Masukkan tujuan program (pisahkan dengan koma)" 
                      value={newProgram.goals}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      placeholder="Jelaskan detail program latihan" 
                      className="min-h-[100px]"
                      value={newProgram.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      name="status" 
                      value={newProgram.status}
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Pilih status program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Direncanakan</SelectItem>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="completed">Selesai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddProgram}>Simpan Program</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    {program.title}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{program.period}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(program.status)}`}>
                      {getStatusText(program.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    {program.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {program.goals.map((goal, index) => (
                      <span key={index} className="text-xs bg-secondary/30 text-secondary-foreground px-2 py-1 rounded">
                        {goal}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center p-2 bg-secondary/10 rounded">
                      <Users className="h-4 w-4 mb-1 text-primary" />
                      <span className="text-xs text-muted-foreground">Peserta</span>
                      <span className="font-medium">{program.participants}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-secondary/10 rounded">
                      <Clock className="h-4 w-4 mb-1 text-primary" />
                      <span className="text-xs text-muted-foreground">Pertemuan</span>
                      <span className="font-medium">{program.sessions}x</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-secondary/10 rounded">
                      <Flag className="h-4 w-4 mb-1 text-primary" />
                      <span className="text-xs text-muted-foreground">Ekskul</span>
                      <span className="font-medium truncate text-center w-full">{program.extracurricular}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="default" size="sm">
                      Lihat Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center p-8 bg-muted/20 rounded-lg">
              <FileText className="h-12 w-12 mb-4 text-muted" />
              <h3 className="font-medium text-lg mb-1">Tidak ada program yang ditemukan</h3>
              <p className="text-muted-foreground text-center">
                Program latihan yang Anda cari tidak ditemukan. Coba ubah filter atau tambahkan program baru.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default ExtracurricularTrainingPage;
