
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Search, 
  Plus, 
  Medal, 
  Award, 
  Star, 
  Settings, 
  Users, 
  BarChart, 
  ArrowUp, 
  ArrowDown,
  Download
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import PageTransition from '@/components/layout/PageTransition';

const GamificationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  
  // Dummy data for student points
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Ahmad Rizky',
      class: 'XI IPA 1',
      nisn: '123456789',
      points: 85,
      awards: ['Siswa Teladan', 'Petugas Upacara Terbaik'],
      positivePoints: 90,
      negativePoints: 5,
      history: [
        { id: 1, date: '2023-12-10', description: 'Menjadi petugas upacara', points: 15, type: 'positive' },
        { id: 2, date: '2023-11-20', description: 'Membantu guru membawa buku', points: 10, type: 'positive' },
        { id: 3, date: '2023-11-15', description: 'Terlambat masuk kelas', points: -5, type: 'negative' },
      ]
    },
    {
      id: 2,
      name: 'Budi Santoso',
      class: 'XI IPA 2',
      nisn: '987654321',
      points: 65,
      awards: ['Juara Kelas'],
      positivePoints: 75,
      negativePoints: 10,
      history: [
        { id: 1, date: '2023-12-05', description: 'Juara lomba matematika', points: 25, type: 'positive' },
        { id: 2, date: '2023-11-25', description: 'Tidak mengerjakan PR', points: -10, type: 'negative' },
      ]
    },
    {
      id: 3,
      name: 'Citra Dewi',
      class: 'XI IPA 1',
      nisn: '456789123',
      points: 95,
      awards: ['Siswa Teladan', 'Duta Sekolah', 'Juara Kelas'],
      positivePoints: 100,
      negativePoints: 5,
      history: [
        { id: 1, date: '2023-12-12', description: 'Menjadi duta sekolah', points: 30, type: 'positive' },
        { id: 2, date: '2023-12-01', description: 'Membantu teman yang kesulitan', points: 15, type: 'positive' },
        { id: 3, date: '2023-11-10', description: 'Terlambat mengumpulkan tugas', points: -5, type: 'negative' },
      ]
    },
    {
      id: 4,
      name: 'Dani Setiawan',
      class: 'XI IPA 2',
      nisn: '789123456',
      points: 50,
      awards: [],
      positivePoints: 60,
      negativePoints: 10,
      history: [
        { id: 1, date: '2023-12-08', description: 'Menjadi petugas kebersihan kelas', points: 10, type: 'positive' },
        { id: 2, date: '2023-11-28', description: 'Tidak memakai seragam lengkap', points: -10, type: 'negative' },
      ]
    },
  ]);

  // Reward configuration
  const [rewards, setRewards] = useState([
    { id: 1, name: 'Sertifikat Prestasi', pointsRequired: 50, description: 'Sertifikat khusus untuk siswa berprestasi' },
    { id: 2, name: 'Pin Penghargaan', pointsRequired: 75, description: 'Pin khusus penghargaan untuk siswa teladan' },
    { id: 3, name: 'Buku Prestasi', pointsRequired: 100, description: 'Buku penghargaan prestasi siswa' },
    { id: 4, name: 'Dispensasi UTS', pointsRequired: 150, description: 'Dispensasi mengikuti UTS tanpa syarat' },
    { id: 5, name: 'Beasiswa Prestasi', pointsRequired: 200, description: 'Beasiswa prestasi untuk semester berikutnya' },
  ]);

  // New point form
  const [newPoint, setNewPoint] = useState({
    studentId: '',
    description: '',
    points: '',
    type: 'positive',
    date: new Date().toISOString().split('T')[0],
  });

  // New reward form
  const [newReward, setNewReward] = useState({
    name: '',
    pointsRequired: '',
    description: '',
  });

  const handlePointInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPoint({ ...newPoint, [name]: value });
  };

  const handlePointSelectChange = (name: string, value: string) => {
    setNewPoint({ ...newPoint, [name]: value });
  };

  const handleRewardInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReward({ ...newReward, [name]: value });
  };

  const handleAddPoint = () => {
    // Basic validation
    if (!newPoint.studentId || !newPoint.description || !newPoint.points) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const student = students.find(s => s.id.toString() === newPoint.studentId);
    if (!student) {
      toast.error('Siswa tidak ditemukan');
      return;
    }

    const pointValue = parseInt(newPoint.points);
    const pointType = newPoint.type === 'positive' ? 'positivePoints' : 'negativePoints';
    const pointHistory = {
      id: Math.max(0, ...student.history.map(h => h.id)) + 1,
      date: newPoint.date,
      description: newPoint.description,
      points: newPoint.type === 'positive' ? pointValue : -pointValue,
      type: newPoint.type
    };

    // Update student
    const updatedStudents = students.map(s => {
      if (s.id.toString() === newPoint.studentId) {
        return {
          ...s,
          points: newPoint.type === 'positive' ? s.points + pointValue : s.points - pointValue,
          [pointType]: s[pointType] + pointValue,
          history: [pointHistory, ...s.history]
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    
    toast.success(`${pointValue} poin ${newPoint.type === 'positive' ? 'ditambahkan' : 'dikurangi'} untuk siswa ${student.name}`);
    
    // Reset form
    setNewPoint({
      studentId: '',
      description: '',
      points: '',
      type: 'positive',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleAddReward = () => {
    // Basic validation
    if (!newReward.name || !newReward.pointsRequired || !newReward.description) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const newRewardItem = {
      id: rewards.length + 1,
      name: newReward.name,
      pointsRequired: parseInt(newReward.pointsRequired),
      description: newReward.description,
    };

    setRewards([...rewards, newRewardItem]);
    
    toast.success(`Reward baru "${newReward.name}" berhasil ditambahkan`);
    
    // Reset form
    setNewReward({
      name: '',
      pointsRequired: '',
      description: '',
    });
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.nisn.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedClass === 'all') return matchesSearch;
    return matchesSearch && student.class === selectedClass;
  });
  
  // Sort students by points (highest first)
  const sortedStudents = [...filteredStudents].sort((a, b) => b.points - a.points);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Sistem Gamifikasi</h1>
          <p className="text-muted-foreground">
            Kelola poin penghargaan dan pelanggaran siswa
          </p>
        </div>

        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leaderboard">
              <Trophy className="mr-2 h-4 w-4" /> Peringkat
            </TabsTrigger>
            <TabsTrigger value="points">
              <Star className="mr-2 h-4 w-4" /> Manajemen Poin
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Medal className="mr-2 h-4 w-4" /> Rewards
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" /> Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Peringkat Siswa</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Daftar peringkat siswa berdasarkan total poin yang dimiliki
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                  <div className="w-full md:w-1/3">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Cari siswa..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-[180px]">
                        <Users className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter Kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kelas</SelectItem>
                        <SelectItem value="XI IPA 1">XI IPA 1</SelectItem>
                        <SelectItem value="XI IPA 2">XI IPA 2</SelectItem>
                        <SelectItem value="XI IPS 1">XI IPS 1</SelectItem>
                        <SelectItem value="XI IPS 2">XI IPS 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {sortedStudents.length > 0 ? (
                  <>
                    {/* Top 3 students */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {sortedStudents.slice(0, 3).map((student, index) => (
                        <Card key={student.id} className={`border-t-4 ${
                          index === 0 ? 'border-t-yellow-400' : 
                          index === 1 ? 'border-t-gray-400' : 
                          'border-t-amber-700'
                        }`}>
                          <CardContent className="pt-6">
                            <div className="flex flex-col items-center">
                              <div className={`rounded-full p-3 mb-3 ${
                                index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                                index === 1 ? 'bg-gray-100 text-gray-600' : 
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {index === 0 ? 
                                  <Trophy className="h-8 w-8" /> : 
                                  <Medal className="h-8 w-8" />
                                }
                              </div>
                              <h3 className="font-bold text-center">{student.name}</h3>
                              <p className="text-sm text-muted-foreground text-center">{student.class}</p>
                              <div className="mt-2 flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                                <span className="font-bold text-xl">{student.points}</span>
                                <span className="text-sm text-muted-foreground">poin</span>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1 justify-center">
                                {student.awards.map((award, i) => (
                                  <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    {award}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Rest of students */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Peringkat</TableHead>
                          <TableHead>Nama Siswa</TableHead>
                          <TableHead>Kelas</TableHead>
                          <TableHead>NISN</TableHead>
                          <TableHead className="text-right">Poin Positif</TableHead>
                          <TableHead className="text-right">Poin Negatif</TableHead>
                          <TableHead className="text-right">Total Poin</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedStudents.slice(3).map((student, index) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{index + 4}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>{student.nisn}</TableCell>
                            <TableCell className="text-right text-green-600">+{student.positivePoints}</TableCell>
                            <TableCell className="text-right text-red-600">-{student.negativePoints}</TableCell>
                            <TableCell className="text-right font-bold">{student.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Trophy className="h-12 w-12 mb-4 text-muted" />
                    <h3 className="font-medium text-lg mb-1">Tidak ada data siswa</h3>
                    <p className="text-muted-foreground text-center">
                      Data siswa yang Anda cari tidak ditemukan. Coba ubah filter pencarian.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="points" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Riwayat Poin Siswa</CardTitle>
                    <CardDescription>
                      Histori penambahan dan pengurangan poin siswa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                      <div className="w-full">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Cari siswa..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {filteredStudents.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Siswa</TableHead>
                            <TableHead>Kelas</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead className="text-right">Poin</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudents.flatMap(student => 
                            student.history.map(history => (
                              <TableRow key={`${student.id}-${history.id}`}>
                                <TableCell>{formatDate(history.date)}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.class}</TableCell>
                                <TableCell>{history.description}</TableCell>
                                <TableCell className={`text-right font-medium ${
                                  history.points > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  <div className="flex items-center justify-end gap-1">
                                    {history.points > 0 ? 
                                      <ArrowUp className="h-4 w-4" /> : 
                                      <ArrowDown className="h-4 w-4" />
                                    }
                                    {history.points > 0 ? '+' : ''}{history.points}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <BarChart className="h-12 w-12 mb-4 text-muted" />
                        <h3 className="font-medium text-lg mb-1">Tidak ada riwayat poin</h3>
                        <p className="text-muted-foreground text-center">
                          Tidak ada riwayat poin untuk siswa yang dipilih.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Tambah Poin</CardTitle>
                    <CardDescription>
                      Tambah atau kurangi poin siswa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Pilih Siswa</Label>
                        <Select 
                          value={newPoint.studentId} 
                          onValueChange={(value) => handlePointSelectChange('studentId', value)}
                        >
                          <SelectTrigger id="studentId">
                            <SelectValue placeholder="Pilih siswa" />
                          </SelectTrigger>
                          <SelectContent>
                            {students.map(student => (
                              <SelectItem key={student.id} value={student.id.toString()}>
                                {student.name} - {student.class}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea 
                          id="description"
                          name="description"
                          placeholder="Masukkan alasan penambahan/pengurangan poin"
                          value={newPoint.description}
                          onChange={handlePointInputChange}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="points">Jumlah Poin</Label>
                          <Input 
                            id="points"
                            name="points"
                            type="number"
                            placeholder="0"
                            value={newPoint.points}
                            onChange={handlePointInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Jenis</Label>
                          <Select 
                            value={newPoint.type} 
                            onValueChange={(value) => handlePointSelectChange('type', value)}
                          >
                            <SelectTrigger id="type">
                              <SelectValue placeholder="Pilih jenis" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="positive">Positif (Tambah)</SelectItem>
                              <SelectItem value="negative">Negatif (Kurang)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Tanggal</Label>
                        <Input 
                          id="date"
                          name="date"
                          type="date"
                          value={newPoint.date}
                          onChange={handlePointInputChange}
                        />
                      </div>

                      <Button className="w-full" onClick={handleAddPoint}>
                        Simpan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Reward</CardTitle>
                    <CardDescription>
                      Penghargaan yang dapat ditukarkan dengan poin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rewards.map(reward => (
                        <Card key={reward.id} className="border border-dashed hover:border-solid hover:border-primary/50 transition-all">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                              <div className="bg-primary/10 p-3 rounded-full">
                                <Award className="h-8 w-8 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold">{reward.name}</h3>
                                <p className="text-sm text-muted-foreground">{reward.description}</p>
                                <div className="mt-2 flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                                  <span className="font-bold">{reward.pointsRequired}</span>
                                  <span className="text-sm text-muted-foreground ml-1">poin</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Tambah Reward Baru</CardTitle>
                    <CardDescription>
                      Buat penghargaan baru untuk sistem gamifikasi
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Reward</Label>
                        <Input 
                          id="name"
                          name="name"
                          placeholder="Masukkan nama reward"
                          value={newReward.name}
                          onChange={handleRewardInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pointsRequired">Poin yang Dibutuhkan</Label>
                        <Input 
                          id="pointsRequired"
                          name="pointsRequired"
                          type="number"
                          placeholder="0"
                          value={newReward.pointsRequired}
                          onChange={handleRewardInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rewardDescription">Deskripsi</Label>
                        <Textarea 
                          id="rewardDescription"
                          name="description"
                          placeholder="Jelaskan detail reward"
                          value={newReward.description}
                          onChange={handleRewardInputChange}
                        />
                      </div>

                      <Button className="w-full" onClick={handleAddReward}>
                        Simpan Reward
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Sistem Gamifikasi</CardTitle>
                <CardDescription>
                  Konfigurasi sistem gamifikasi dan aturan poin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Aturan Poin Positif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Aktivitas</TableHead>
                            <TableHead className="text-right">Poin</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Menjadi petugas upacara</TableCell>
                            <TableCell className="text-right">+15</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Juara kompetisi tingkat kelas</TableCell>
                            <TableCell className="text-right">+10</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Juara kompetisi tingkat sekolah</TableCell>
                            <TableCell className="text-right">+20</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Juara kompetisi tingkat kabupaten</TableCell>
                            <TableCell className="text-right">+30</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Membantu guru/staf</TableCell>
                            <TableCell className="text-right">+10</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Aturan Poin Negatif</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Pelanggaran</TableHead>
                            <TableHead className="text-right">Poin</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Terlambat masuk kelas</TableCell>
                            <TableCell className="text-right">-5</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Tidak mengerjakan PR</TableCell>
                            <TableCell className="text-right">-10</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Tidak memakai seragam lengkap</TableCell>
                            <TableCell className="text-right">-10</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Bolos kelas</TableCell>
                            <TableCell className="text-right">-20</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Merusak fasilitas sekolah</TableCell>
                            <TableCell className="text-right">-30</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default GamificationPage;
