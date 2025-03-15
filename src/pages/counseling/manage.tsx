
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { 
  MessageSquare, Calendar, Users, Clock, FilePlus, FileText,
  Plus, Edit, Trash, Eye, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';

// Mock data for counseling sessions
const MOCK_SESSIONS = [
  {
    id: 'CS001',
    studentName: 'Ahmad Rizki',
    studentId: 'S12345',
    class: 'XII TKJ 1',
    date: '2023-10-25',
    time: '09:00',
    type: 'Akademik',
    status: 'scheduled',
    teacher: 'Bu Siti Nurhaliza',
    issue: 'Kesulitan mengikuti pelajaran Matematika',
    notes: '',
    followUp: ''
  },
  {
    id: 'CS002',
    studentName: 'Dewi Safitri',
    studentId: 'S12346',
    class: 'XI AKL 2',
    date: '2023-10-24',
    time: '10:30',
    type: 'Pribadi',
    status: 'completed',
    teacher: 'Bu Siti Nurhaliza',
    issue: 'Kesulitan bersosialisasi dengan teman sekelas',
    notes: 'Siswa memiliki kecenderungan introvert yang tinggi. Perlu pendampingan untuk meningkatkan kemampuan sosial.',
    followUp: 'Disarankan untuk ikut kegiatan ekstrakurikuler yang melibatkan kerja tim.'
  },
  {
    id: 'CS003',
    studentName: 'Budi Santoso',
    studentId: 'S12347',
    class: 'X RPL 1',
    date: '2023-10-23',
    time: '13:00',
    type: 'Karir',
    status: 'completed',
    teacher: 'Pak Ahmad',
    issue: 'Kebingungan mengenai jalur karir setelah lulus SMK',
    notes: 'Siswa memiliki minat di bidang programming tapi masih ragu dengan kemampuannya.',
    followUp: 'Direkomendasikan mengikuti program magang di perusahaan IT lokal.'
  },
  {
    id: 'CS004',
    studentName: 'Rini Wulandari',
    studentId: 'S12348',
    class: 'XII MM 1',
    date: '2023-10-26',
    time: '11:00',
    type: 'Pribadi',
    status: 'cancelled',
    teacher: 'Bu Siti Nurhaliza',
    issue: 'Konflik dengan teman sekelas',
    notes: 'Sesi dibatalkan oleh siswa',
    followUp: ''
  },
  {
    id: 'CS005',
    studentName: 'Eko Prasetyo',
    studentId: 'S12349',
    class: 'XI TKJ 2',
    date: '2023-10-27',
    time: '14:00',
    type: 'Akademik',
    status: 'scheduled',
    teacher: 'Pak Ahmad',
    issue: 'Nilai menurun drastis pada semester ini',
    notes: '',
    followUp: ''
  }
];

// Mock data for students
const MOCK_STUDENTS = [
  { id: 'S12345', name: 'Ahmad Rizki', class: 'XII TKJ 1' },
  { id: 'S12346', name: 'Dewi Safitri', class: 'XI AKL 2' },
  { id: 'S12347', name: 'Budi Santoso', class: 'X RPL 1' },
  { id: 'S12348', name: 'Rini Wulandari', class: 'XII MM 1' },
  { id: 'S12349', name: 'Eko Prasetyo', class: 'XI TKJ 2' },
  { id: 'S12350', name: 'Siti Nuraini', class: 'X AKL 1' },
  { id: 'S12351', name: 'Joko Widodo', class: 'XII RPL 2' },
  { id: 'S12352', name: 'Putri Handayani', class: 'XI MM 1' },
  { id: 'S12353', name: 'Hadi Purnomo', class: 'X TKJ 2' },
  { id: 'S12354', name: 'Rina Marlina', class: 'XII AKL 1' }
];

// Form schema for new counseling session
const sessionFormSchema = z.object({
  studentId: z.string().min(1, { message: 'Pilih siswa' }),
  date: z.string().min(1, { message: 'Tanggal wajib diisi' }),
  time: z.string().min(1, { message: 'Waktu wajib diisi' }),
  type: z.string().min(1, { message: 'Pilih tipe konseling' }),
  issue: z.string().min(5, { message: 'Permasalahan minimal 5 karakter' }),
});

// Form schema for session notes
const notesFormSchema = z.object({
  sessionId: z.string().min(1, { message: 'ID sesi tidak valid' }),
  notes: z.string().min(5, { message: 'Catatan minimal 5 karakter' }),
  followUp: z.string().min(5, { message: 'Tindak lanjut minimal 5 karakter' }),
});

const CounselingManagePage = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [students] = useState(MOCK_STUDENTS);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  const sessionForm = useForm<z.infer<typeof sessionFormSchema>>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      studentId: '',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      type: '',
      issue: '',
    }
  });

  const notesForm = useForm<z.infer<typeof notesFormSchema>>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: {
      sessionId: '',
      notes: '',
      followUp: ''
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Konseling - Si-Kaji';
  }, []);

  useEffect(() => {
    if (selectedSession) {
      notesForm.setValue('sessionId', selectedSession.id);
      notesForm.setValue('notes', selectedSession.notes || '');
      notesForm.setValue('followUp', selectedSession.followUp || '');
    }
  }, [selectedSession, notesForm]);

  const handleSessionSubmit = (values: z.infer<typeof sessionFormSchema>) => {
    console.log('New session:', values);
    
    // Get student details
    const student = students.find(s => s.id === values.studentId);
    
    // In a real app, this would be an API call
    const newSession = {
      id: `CS${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      studentName: student?.name || 'Unknown',
      studentId: values.studentId,
      class: student?.class || 'Unknown',
      date: values.date,
      time: values.time,
      type: values.type,
      status: 'scheduled',
      teacher: 'Bu Siti Nurhaliza', // Current user in a real app
      issue: values.issue,
      notes: '',
      followUp: ''
    };
    
    setSessions([newSession, ...sessions]);
    
    toast({
      title: "Sesi konseling berhasil dibuat",
      description: `Sesi konseling dengan ${student?.name} telah dijadwalkan pada ${values.date} pukul ${values.time}`,
    });
    
    sessionForm.reset();
  };

  const handleNotesSubmit = (values: z.infer<typeof notesFormSchema>) => {
    console.log('Session notes:', values);
    
    // Update the session with notes and follow-up
    setSessions(sessions.map(session => 
      session.id === values.sessionId 
        ? { 
            ...session, 
            notes: values.notes, 
            followUp: values.followUp,
            status: 'completed'
          } 
        : session
    ));
    
    toast({
      title: "Catatan konseling disimpan",
      description: "Catatan dan tindak lanjut konseling telah berhasil disimpan",
    });
    
    setSelectedSession(null);
  };

  const handleCancelSession = (id: string) => {
    setSessions(sessions.map(session => 
      session.id === id 
        ? { ...session, status: 'cancelled' } 
        : session
    ));
    
    toast({
      title: "Sesi konseling dibatalkan",
      description: `Sesi konseling ${id} telah dibatalkan`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Terjadwal</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Selesai</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'Akademik':
        return <Badge className="bg-blue-500">Akademik</Badge>;
      case 'Pribadi':
        return <Badge className="bg-purple-500">Pribadi</Badge>;
      case 'Karir':
        return <Badge className="bg-green-500">Karir</Badge>;
      case 'Sosial':
        return <Badge className="bg-orange-500">Sosial</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Filter sessions based on current tab
  const filteredSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter by status if a filter is set
    if (filterStatus && session.status !== filterStatus) {
      return false;
    }
    
    if (activeTab === 'upcoming') {
      return sessionDate >= today && session.status === 'scheduled';
    } else if (activeTab === 'past') {
      return sessionDate < today || session.status === 'completed' || session.status === 'cancelled';
    }
    
    return true;
  });

  return (
    <DashboardLayout
      title="Manajemen Konseling"
      description="Kelola sesi konseling siswa, jadwal, dan rekam jejak konseling"
      userRole="counselor"
      userName="Guru BK"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Mendatang</TabsTrigger>
          <TabsTrigger value="past">Riwayat</TabsTrigger>
          <TabsTrigger value="new">Buat Sesi Baru</TabsTrigger>
        </TabsList>
        
        {/* Upcoming Sessions Tab */}
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sesi Konseling yang Akan Datang</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-end">
                <select 
                  className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={filterStatus || ''}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                >
                  <option value="">Semua Status</option>
                  <option value="scheduled">Terjadwal</option>
                  <option value="completed">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Siswa</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Waktu</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.length > 0 ? (
                      filteredSessions.map(session => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.id}</TableCell>
                          <TableCell>{session.studentName}</TableCell>
                          <TableCell>{session.class}</TableCell>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{session.time}</TableCell>
                          <TableCell>{getTypeBadge(session.type)}</TableCell>
                          <TableCell>{getStatusBadge(session.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedSession(session)}
                                  >
                                    <Eye size={16} className="mr-1" /> Detail
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  {selectedSession && (
                                    <>
                                      <DialogHeader>
                                        <DialogTitle className="flex items-center justify-between">
                                          <span>Detail Sesi Konseling - {selectedSession.id}</span>
                                          {getStatusBadge(selectedSession.status)}
                                        </DialogTitle>
                                        <DialogDescription>
                                          {selectedSession.date} pukul {selectedSession.time}
                                        </DialogDescription>
                                      </DialogHeader>
                                      
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Siswa</h4>
                                          <p>{selectedSession.studentName}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Kelas</h4>
                                          <p>{selectedSession.class}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Tipe Konseling</h4>
                                          <p>{getTypeBadge(selectedSession.type)}</p>
                                        </div>
                                        <div>
                                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Guru BK</h4>
                                          <p>{selectedSession.teacher}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="mb-4">
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Permasalahan</h4>
                                        <p className="text-sm p-2 border rounded-md bg-muted/50">{selectedSession.issue}</p>
                                      </div>
                                      
                                      {selectedSession.status === 'scheduled' ? (
                                        <Form {...notesForm}>
                                          <form onSubmit={notesForm.handleSubmit(handleNotesSubmit)} className="space-y-4">
                                            <FormField
                                              control={notesForm.control}
                                              name="notes"
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormLabel>Catatan Konseling</FormLabel>
                                                  <FormControl>
                                                    <Textarea 
                                                      placeholder="Masukkan catatan hasil konseling"
                                                      className="min-h-24"
                                                      {...field} 
                                                    />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            
                                            <FormField
                                              control={notesForm.control}
                                              name="followUp"
                                              render={({ field }) => (
                                                <FormItem>
                                                  <FormLabel>Tindak Lanjut</FormLabel>
                                                  <FormControl>
                                                    <Textarea 
                                                      placeholder="Masukkan rencana tindak lanjut"
                                                      className="min-h-24"
                                                      {...field} 
                                                    />
                                                  </FormControl>
                                                  <FormMessage />
                                                </FormItem>
                                              )}
                                            />
                                            
                                            <DialogFooter className="gap-2">
                                              <Button 
                                                type="button"
                                                variant="destructive"
                                                onClick={() => handleCancelSession(selectedSession.id)}
                                              >
                                                Batalkan Sesi
                                              </Button>
                                              <Button type="submit">
                                                Simpan & Selesaikan
                                              </Button>
                                            </DialogFooter>
                                          </form>
                                        </Form>
                                      ) : (
                                        <>
                                          <div className="mb-4">
                                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Catatan Konseling</h4>
                                            <p className="text-sm p-2 border rounded-md bg-muted/50">{selectedSession.notes || 'Tidak ada catatan'}</p>
                                          </div>
                                          
                                          <div className="mb-4">
                                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Tindak Lanjut</h4>
                                            <p className="text-sm p-2 border rounded-md bg-muted/50">{selectedSession.followUp || 'Tidak ada tindak lanjut'}</p>
                                          </div>
                                          
                                          <DialogFooter>
                                            <DialogClose asChild>
                                              <Button>Tutup</Button>
                                            </DialogClose>
                                          </DialogFooter>
                                        </>
                                      )}
                                    </>
                                  )}
                                </DialogContent>
                              </Dialog>
                              
                              {session.status === 'scheduled' && (
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleCancelSession(session.id)}
                                >
                                  <XCircle size={16} />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4">
                          Tidak ada sesi konseling yang akan datang
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={() => setActiveTab('new')}
                  className="gap-1"
                >
                  <Plus size={16} /> Buat Sesi Baru
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Sesi Terjadwal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {sessions.filter(s => s.status === 'scheduled').length}
                </div>
                <p className="text-sm text-muted-foreground">Sesi konseling yang akan datang</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Sesi Selesai
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {sessions.filter(s => s.status === 'completed').length}
                </div>
                <p className="text-sm text-muted-foreground">Sesi konseling yang telah selesai</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Total Siswa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {new Set(sessions.map(s => s.studentId)).size}
                </div>
                <p className="text-sm text-muted-foreground">Siswa yang mendapat konseling</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Past Sessions Tab */}
        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Sesi Konseling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-end">
                <select 
                  className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={filterStatus || ''}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                >
                  <option value="">Semua Status</option>
                  <option value="completed">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Siswa</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.length > 0 ? (
                      filteredSessions.map(session => (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">{session.id}</TableCell>
                          <TableCell>{session.studentName}</TableCell>
                          <TableCell>{session.class}</TableCell>
                          <TableCell>{session.date}</TableCell>
                          <TableCell>{getTypeBadge(session.type)}</TableCell>
                          <TableCell>{getStatusBadge(session.status)}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedSession(session)}
                                >
                                  <Eye size={16} className="mr-1" /> Detail
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                {selectedSession && (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center justify-between">
                                        <span>Detail Sesi Konseling - {selectedSession.id}</span>
                                        {getStatusBadge(selectedSession.status)}
                                      </DialogTitle>
                                      <DialogDescription>
                                        {selectedSession.date} pukul {selectedSession.time}
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Siswa</h4>
                                        <p>{selectedSession.studentName}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Kelas</h4>
                                        <p>{selectedSession.class}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Tipe Konseling</h4>
                                        <p>{getTypeBadge(selectedSession.type)}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Guru BK</h4>
                                        <p>{selectedSession.teacher}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Permasalahan</h4>
                                      <p className="text-sm p-2 border rounded-md bg-muted/50">{selectedSession.issue}</p>
                                    </div>
                                    
                                    <div className="mb-4">
                                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Catatan Konseling</h4>
                                      <p className="text-sm p-2 border rounded-md bg-muted/50">{selectedSession.notes || 'Tidak ada catatan'}</p>
                                    </div>
                                    
                                    <div className="mb-4">
                                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Tindak Lanjut</h4>
                                      <p className="text-sm p-2 border rounded-md bg-muted/50">{selectedSession.followUp || 'Tidak ada tindak lanjut'}</p>
                                    </div>
                                    
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button>Tutup</Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Tidak ada riwayat sesi konseling
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* New Session Tab */}
        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Buat Sesi Konseling Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...sessionForm}>
                <form onSubmit={sessionForm.handleSubmit(handleSessionSubmit)} className="space-y-4">
                  <FormField
                    control={sessionForm.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Siswa</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Pilih Siswa</option>
                            {students.map(student => (
                              <option key={student.id} value={student.id}>
                                {student.name} - {student.class}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={sessionForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={sessionForm.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waktu</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={sessionForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipe Konseling</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Pilih Tipe</option>
                            <option value="Akademik">Akademik</option>
                            <option value="Pribadi">Pribadi</option>
                            <option value="Karir">Karir</option>
                            <option value="Sosial">Sosial</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={sessionForm.control}
                    name="issue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permasalahan</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Jelaskan permasalahan siswa"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="mt-4">Jadwalkan Sesi</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CounselingManagePage;
