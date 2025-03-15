
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  Award, Users, Calendar, Clock, FilePlus, FileText, CheckSquare,
  Plus, Edit, Trash, Eye
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/components/ui/use-toast';

// Mock data for extracurricular activities
const MOCK_ACTIVITIES = [
  {
    id: 'EXT001',
    name: 'Basket',
    totalStudents: 24,
    schedule: 'Selasa & Kamis, 15:00-17:00',
    location: 'Lapangan Basket',
    trainer: 'Pak Ahmad',
    lastMeeting: '2023-10-17',
    status: 'active'
  },
  {
    id: 'EXT002',
    name: 'Pramuka',
    totalStudents: 45,
    schedule: 'Jumat, 14:00-16:30',
    location: 'Lapangan Utama',
    trainer: 'Bu Siti',
    lastMeeting: '2023-10-20',
    status: 'active'
  },
  {
    id: 'EXT003',
    name: 'Robotik',
    totalStudents: 18,
    schedule: 'Senin & Rabu, 15:30-17:30',
    location: 'Lab Komputer',
    trainer: 'Pak Budi',
    lastMeeting: '2023-10-18',
    status: 'active'
  },
  {
    id: 'EXT004',
    name: 'Paduan Suara',
    totalStudents: 30,
    schedule: 'Selasa & Jumat, 15:00-17:00',
    location: 'Ruang Musik',
    trainer: 'Bu Dewi',
    lastMeeting: '2023-10-17',
    status: 'active'
  },
  {
    id: 'EXT005',
    name: 'English Club',
    totalStudents: 22,
    schedule: 'Rabu, 15:00-16:30',
    location: 'Ruang Bahasa',
    trainer: 'Bu Sarah',
    lastMeeting: '2023-10-18',
    status: 'inactive'
  }
];

// Mock data for attendance
const MOCK_ATTENDANCE = [
  {
    id: 'ATT001',
    activityId: 'EXT001',
    date: '2023-10-17',
    totalPresent: 20,
    totalAbsent: 4,
    notes: 'Latihan persiapan lomba antar sekolah'
  },
  {
    id: 'ATT002',
    activityId: 'EXT001',
    date: '2023-10-12',
    totalPresent: 22,
    totalAbsent: 2,
    notes: 'Latihan rutin'
  },
  {
    id: 'ATT003',
    activityId: 'EXT002',
    date: '2023-10-20',
    totalPresent: 40,
    totalAbsent: 5,
    notes: 'Persiapan kemah tahunan'
  },
  {
    id: 'ATT004',
    activityId: 'EXT003',
    date: '2023-10-18',
    totalPresent: 16,
    totalAbsent: 2,
    notes: 'Workshop pemrograman Arduino'
  }
];

// Form schema for new attendance
const attendanceFormSchema = z.object({
  date: z.string().min(1, { message: 'Tanggal wajib diisi' }),
  activityId: z.string().min(1, { message: 'Pilih kegiatan' }),
  totalPresent: z.coerce.number().min(0, { message: 'Jumlah hadir tidak valid' }),
  totalAbsent: z.coerce.number().min(0, { message: 'Jumlah tidak hadir tidak valid' }),
  notes: z.string().optional()
});

// Form schema for journal entry
const journalFormSchema = z.object({
  activityId: z.string().min(1, { message: 'Pilih kegiatan' }),
  date: z.string().min(1, { message: 'Tanggal wajib diisi' }),
  title: z.string().min(3, { message: 'Judul minimal 3 karakter' }),
  description: z.string().min(10, { message: 'Deskripsi minimal 10 karakter' }),
  achievements: z.string().optional(),
  nextPlan: z.string().min(5, { message: 'Rencana berikutnya minimal 5 karakter' })
});

const ExtracurricularManagePage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [attendance, setAttendance] = useState(MOCK_ATTENDANCE);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('activities');

  const attendanceForm = useForm<z.infer<typeof attendanceFormSchema>>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      activityId: '',
      totalPresent: 0,
      totalAbsent: 0,
      notes: ''
    }
  });

  const journalForm = useForm<z.infer<typeof journalFormSchema>>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      activityId: '',
      date: new Date().toISOString().split('T')[0],
      title: '',
      description: '',
      achievements: '',
      nextPlan: ''
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Ekstrakurikuler - Si-Kaji';
  }, []);

  const handleAttendanceSubmit = (values: z.infer<typeof attendanceFormSchema>) => {
    console.log('Submitting attendance:', values);
    
    // In a real app, this would be an API call
    const newAttendance = {
      id: `ATT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...values
    };
    
    setAttendance([newAttendance, ...attendance]);
    
    toast({
      title: "Presensi berhasil dicatat",
      description: `Presensi untuk kegiatan ${activities.find(a => a.id === values.activityId)?.name} tanggal ${values.date} telah disimpan`,
    });
    
    attendanceForm.reset();
  };

  const handleJournalSubmit = (values: z.infer<typeof journalFormSchema>) => {
    console.log('Submitting journal:', values);
    
    // In a real app, this would be an API call
    toast({
      title: "Jurnal berhasil dicatat",
      description: `Jurnal kegiatan ${activities.find(a => a.id === values.activityId)?.name} tanggal ${values.date} telah disimpan`,
    });
    
    journalForm.reset();
  };

  const filteredAttendance = selectedActivity 
    ? attendance.filter(a => a.activityId === selectedActivity)
    : attendance;

  return (
    <DashboardLayout
      title="Manajemen Ekstrakurikuler"
      description="Kelola kegiatan ekstrakurikuler, presensi, dan jurnal kegiatan"
      userRole="trainer"
      userName="Pelatih Ekstrakurikuler"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="activities">Kegiatan</TabsTrigger>
          <TabsTrigger value="attendance">Presensi</TabsTrigger>
          <TabsTrigger value="journal">Jurnal</TabsTrigger>
        </TabsList>
        
        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Kegiatan Ekstrakurikuler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nama Kegiatan</TableHead>
                      <TableHead>Jadwal</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Jumlah Siswa</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map(activity => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.id}</TableCell>
                        <TableCell>{activity.name}</TableCell>
                        <TableCell>{activity.schedule}</TableCell>
                        <TableCell>{activity.location}</TableCell>
                        <TableCell>{activity.totalStudents}</TableCell>
                        <TableCell>
                          <Badge className={activity.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                            {activity.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/extracurricular/${activity.id}`)}>
                              <Eye size={16} className="mr-1" /> Detail
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setSelectedActivity(activity.id);
                                setActiveTab('attendance');
                              }}
                            >
                              <CheckSquare size={16} className="mr-1" /> Presensi
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  Total Kegiatan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activities.length}</div>
                <p className="text-sm text-muted-foreground">Kegiatan ekstrakurikuler</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Total Peserta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {activities.reduce((sum, act) => sum + act.totalStudents, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Siswa aktif di ekstrakurikuler</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Pertemuan Terakhir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium">
                  {new Date(Math.max(...activities.map(a => new Date(a.lastMeeting).getTime()))).toLocaleDateString('id-ID')}
                </div>
                <p className="text-sm text-muted-foreground">Tanggal pertemuan terakhir</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Catat Presensi Baru</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...attendanceForm}>
                  <form onSubmit={attendanceForm.handleSubmit(handleAttendanceSubmit)} className="space-y-4">
                    <FormField
                      control={attendanceForm.control}
                      name="activityId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kegiatan Ekstrakurikuler</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="">Pilih Kegiatan</option>
                              {activities.map(activity => (
                                <option key={activity.id} value={activity.id}>
                                  {activity.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={attendanceForm.control}
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
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={attendanceForm.control}
                        name="totalPresent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jumlah Hadir</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={attendanceForm.control}
                        name="totalAbsent"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jumlah Tidak Hadir</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={attendanceForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Catatan</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Masukkan catatan kegiatan hari ini"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Simpan Presensi</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card className="flex-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Riwayat Presensi</CardTitle>
                <div className="flex items-center">
                  <select 
                    className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedActivity || ''}
                    onChange={(e) => setSelectedActivity(e.target.value || null)}
                  >
                    <option value="">Semua Kegiatan</option>
                    {activities.map(activity => (
                      <option key={activity.id} value={activity.id}>
                        {activity.name}
                      </option>
                    ))}
                  </select>
                  {selectedActivity && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedActivity(null)}
                      className="ml-2"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Kegiatan</TableHead>
                        <TableHead>Hadir</TableHead>
                        <TableHead>Tidak Hadir</TableHead>
                        <TableHead>Catatan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAttendance.length > 0 ? (
                        filteredAttendance.map(record => {
                          const activity = activities.find(a => a.id === record.activityId);
                          return (
                            <TableRow key={record.id}>
                              <TableCell>{record.date}</TableCell>
                              <TableCell>{activity?.name || 'Unknown'}</TableCell>
                              <TableCell>{record.totalPresent}</TableCell>
                              <TableCell>{record.totalAbsent}</TableCell>
                              <TableCell className="max-w-xs truncate">{record.notes}</TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            Tidak ada data presensi
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Journal Tab */}
        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Catat Jurnal Kegiatan</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...journalForm}>
                <form onSubmit={journalForm.handleSubmit(handleJournalSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={journalForm.control}
                      name="activityId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kegiatan Ekstrakurikuler</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="">Pilih Kegiatan</option>
                              {activities.map(activity => (
                                <option key={activity.id} value={activity.id}>
                                  {activity.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={journalForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Kegiatan</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={journalForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Judul Kegiatan</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Latihan Rutin / Persiapan Lomba" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={journalForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Kegiatan</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Jelaskan kegiatan yang dilakukan hari ini"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={journalForm.control}
                    name="achievements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capaian / Prestasi</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Capaian atau prestasi yang diraih (jika ada)"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={journalForm.control}
                    name="nextPlan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rencana Kegiatan Berikutnya</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Rencana untuk pertemuan berikutnya"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="mt-4">Simpan Jurnal</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ExtracurricularManagePage;
