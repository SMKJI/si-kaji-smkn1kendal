
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Calendar, 
  UserCheck, 
  UserX, 
  Users, 
  ClipboardCheck, 
  ChevronDown, 
  Download 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { toast } from 'sonner';
import PageTransition from '@/components/layout/PageTransition';

const ExtracurricularAttendancePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEkskul, setSelectedEkskul] = useState('all');
  
  // Dummy data for attendance records
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      date: '2023-12-10',
      extracurricular: 'Pramuka',
      totalStudents: 30,
      present: 28,
      absent: 2,
      notes: 'Latihan persiapan lomba tingkat kabupaten',
    },
    {
      id: 2,
      date: '2023-12-05',
      extracurricular: 'Basket',
      totalStudents: 15,
      present: 13,
      absent: 2,
      notes: 'Latihan rutin minggu pertama',
    },
    {
      id: 3,
      date: '2023-12-03',
      extracurricular: 'Paduan Suara',
      totalStudents: 20,
      present: 18,
      absent: 2,
      notes: 'Persiapan penampilan hari guru',
    },
    {
      id: 4,
      date: '2023-12-01',
      extracurricular: 'Pramuka',
      totalStudents: 30,
      present: 25,
      absent: 5,
      notes: 'Latihan pioneering',
    },
  ]);

  // New attendance form state
  const [newAttendance, setNewAttendance] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    extracurricular: '',
    totalStudents: '',
    present: '',
    absent: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAttendance({ ...newAttendance, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewAttendance({ ...newAttendance, [name]: value });
  };

  const handleAddAttendance = () => {
    // Basic validation
    if (!newAttendance.extracurricular || !newAttendance.date) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    const totalPresent = parseInt(newAttendance.present) || 0;
    const totalAbsent = parseInt(newAttendance.absent) || 0;
    const totalStudents = totalPresent + totalAbsent;

    const newRecord = {
      id: attendanceRecords.length + 1,
      date: newAttendance.date,
      extracurricular: newAttendance.extracurricular,
      totalStudents: totalStudents,
      present: totalPresent,
      absent: totalAbsent,
      notes: newAttendance.notes,
    };

    setAttendanceRecords([newRecord, ...attendanceRecords]);
    
    // Reset form
    setNewAttendance({
      date: format(new Date(), 'yyyy-MM-dd'),
      extracurricular: '',
      totalStudents: '',
      present: '',
      absent: '',
      notes: '',
    });

    toast.success('Data presensi berhasil ditambahkan');
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.extracurricular.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          record.notes.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedEkskul === 'all') return matchesSearch;
    return matchesSearch && record.extracurricular === selectedEkskul;
  });

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Presensi Ekstrakurikuler</h1>
          <p className="text-muted-foreground">
            Kelola dan monitor kehadiran peserta ekstrakurikuler
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari presensi..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedEkskul} onValueChange={setSelectedEkskul}>
              <SelectTrigger className="w-[180px]">
                <Users className="mr-2 h-4 w-4" />
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
                  <Plus className="mr-2 h-4 w-4" /> Presensi Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Input Presensi Baru</DialogTitle>
                  <DialogDescription>
                    Masukkan data presensi untuk kegiatan ekstrakurikuler
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Tanggal</Label>
                    <Input 
                      id="date" 
                      name="date"
                      type="date" 
                      value={newAttendance.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="extracurricular">Ekstrakurikuler</Label>
                    <Select 
                      name="extracurricular" 
                      value={newAttendance.extracurricular}
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="present">Jumlah Hadir</Label>
                      <Input 
                        id="present" 
                        name="present"
                        type="number"
                        placeholder="0" 
                        value={newAttendance.present}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="absent">Jumlah Tidak Hadir</Label>
                      <Input 
                        id="absent" 
                        name="absent"
                        type="number"
                        placeholder="0" 
                        value={newAttendance.absent}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Catatan</Label>
                    <Input 
                      id="notes" 
                      name="notes"
                      placeholder="Masukkan catatan kegiatan" 
                      value={newAttendance.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddAttendance}>Simpan Presensi</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="text-xl">Rekap Presensi</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredRecords.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Ekstrakurikuler</TableHead>
                    <TableHead>Total Peserta</TableHead>
                    <TableHead>Hadir</TableHead>
                    <TableHead>Tidak Hadir</TableHead>
                    <TableHead>Persentase</TableHead>
                    <TableHead>Catatan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell>{record.extracurricular}</TableCell>
                      <TableCell>{record.totalStudents}</TableCell>
                      <TableCell className="flex items-center">
                        <UserCheck className="mr-1 h-4 w-4 text-green-500" /> {record.present}
                      </TableCell>
                      <TableCell className="flex items-center">
                        <UserX className="mr-1 h-4 w-4 text-red-500" /> {record.absent}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(record.present / record.totalStudents) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">
                            {Math.round((record.present / record.totalStudents) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={record.notes}>
                        {record.notes}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <ClipboardCheck className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <ClipboardCheck className="h-12 w-12 mb-4 text-muted" />
                <h3 className="font-medium text-lg mb-1">Tidak ada data presensi</h3>
                <p className="text-muted-foreground text-center">
                  Data presensi yang Anda cari tidak ditemukan. Coba ubah filter atau tambahkan data baru.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default ExtracurricularAttendancePage;
