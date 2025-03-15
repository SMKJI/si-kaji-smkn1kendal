
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Search, Plus, Filter, Award, Medal, Trophy } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Types
type Achievement = {
  id: number;
  studentName: string;
  studentId: string;
  class: string;
  achievementType: string;
  achievementName: string;
  level: string;
  position: string;
  date: Date;
  organizer: string;
  coach: string;
  description: string;
};

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      studentName: 'Budi Santoso',
      studentId: 'S12345',
      class: 'XI RPL 1',
      achievementType: 'Akademik',
      achievementName: 'Olimpiade Matematika',
      level: 'Provinsi',
      position: 'Juara 1',
      date: new Date(2023, 3, 15),
      organizer: 'Dinas Pendidikan Provinsi',
      coach: 'Ibu Wati',
      description: 'Juara 1 Olimpiade Matematika tingkat Provinsi tahun 2023'
    },
    {
      id: 2,
      studentName: 'Siti Nuraini',
      studentId: 'S12346',
      class: 'X TKJ 2',
      achievementType: 'Non-Akademik',
      achievementName: 'Lomba Desain Grafis',
      level: 'Nasional',
      position: 'Juara 2',
      date: new Date(2023, 5, 22),
      organizer: 'Kementerian Pendidikan dan Kebudayaan',
      coach: 'Bapak Joko',
      description: 'Juara 2 Lomba Desain Grafis tingkat Nasional tahun 2023'
    },
    {
      id: 3,
      studentName: 'Reni Puspita',
      studentId: 'S12350',
      class: 'XII MM 1',
      achievementType: 'Non-Akademik',
      achievementName: 'Festival Film Pendek',
      level: 'Kabupaten',
      position: 'Juara 1',
      date: new Date(2023, 7, 10),
      organizer: 'Dinas Pendidikan Kabupaten',
      coach: 'Bapak Andi',
      description: 'Juara 1 Festival Film Pendek tingkat Kabupaten tahun 2023'
    }
  ]);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Filtered achievements based on search query and filter
  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.achievementName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && achievement.achievementType.toLowerCase() === filter.toLowerCase();
  });

  // Add new achievement
  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    setOpen(false);
  };

  const getIconForAchievement = (position: string) => {
    if (position.includes('1')) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (position.includes('2')) return <Medal className="h-5 w-5 text-gray-400" />;
    if (position.includes('3')) return <Award className="h-5 w-5 text-amber-600" />;
    return <Award className="h-5 w-5 text-blue-500" />;
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'internasional': return 'bg-purple-500';
      case 'nasional': return 'bg-red-500';
      case 'provinsi': return 'bg-blue-500';
      case 'kabupaten': return 'bg-green-500';
      case 'kecamatan': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Prestasi Siswa</h1>
            <p className="text-muted-foreground">
              Kelola dan pantau prestasi akademik dan non-akademik siswa
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Prestasi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Tambah Prestasi Siswa</DialogTitle>
                <DialogDescription>
                  Tambahkan data prestasi siswa. Klik simpan ketika selesai.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAchievement}>
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
                      <Label htmlFor="achievementType">Jenis Prestasi</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="akademik">Akademik</SelectItem>
                          <SelectItem value="non-akademik">Non-Akademik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="achievementName">Nama Prestasi</Label>
                      <Input id="achievementName" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="level">Tingkat</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tingkat" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kecamatan">Kecamatan</SelectItem>
                          <SelectItem value="kabupaten">Kabupaten</SelectItem>
                          <SelectItem value="provinsi">Provinsi</SelectItem>
                          <SelectItem value="nasional">Nasional</SelectItem>
                          <SelectItem value="internasional">Internasional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="position">Peringkat/Juara</Label>
                      <Input id="position" placeholder="contoh: Juara 1" />
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
                      <Label htmlFor="organizer">Penyelenggara</Label>
                      <Input id="organizer" />
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
                <CardTitle>Daftar Prestasi Siswa</CardTitle>
                <CardDescription>
                  Total {filteredAchievements.length} prestasi siswa
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari prestasi atau siswa..."
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
                    <SelectItem value="akademik">Akademik</SelectItem>
                    <SelectItem value="non-akademik">Non-Akademik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAchievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold">{achievement.achievementName}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.studentName} • {achievement.class}</p>
                      </div>
                      {getIconForAchievement(achievement.position)}
                    </div>
                    <div className="mt-4">
                      <Badge variant="outline" className="mr-2">{achievement.achievementType}</Badge>
                      <Badge 
                        variant="secondary" 
                        className={`${getLevelBadgeColor(achievement.level)} text-white`}
                      >
                        {achievement.level}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm"><strong>Peringkat:</strong> {achievement.position}</p>
                      <p className="text-sm"><strong>Penyelenggara:</strong> {achievement.organizer}</p>
                      <p className="text-sm"><strong>Tanggal:</strong> {format(achievement.date, 'dd MMMM yyyy', { locale: id })}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AchievementsPage;
