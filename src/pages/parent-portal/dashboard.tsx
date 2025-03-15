
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, BookOpen, Calendar, CalendarCheck, FileText, LineChart, MessageSquare, User } from 'lucide-react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ParentPortalDashboardPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Portal Orang Tua - Si-Kaji';
  }, []);

  // Mock data for student
  const student = {
    id: "S001",
    name: "Andi Saputra",
    class: "XII RPL 1",
    nisn: "0012345678",
    photo: "https://i.pravatar.cc/150?img=3",
    attendance: {
      present: 87,
      absent: 2,
      sick: 3,
      permission: 1,
      late: 7
    },
    academic: {
      average: 85.7,
      rank: 5,
      totalStudents: 36
    },
    discipline: {
      points: 85,
      violations: 2,
      achievements: 1
    }
  };
  
  // Mock data for attendance
  const attendanceHistory = [
    { date: "2023-11-15", status: "present", time: "06:55:23" },
    { date: "2023-11-14", status: "present", time: "06:48:12" },
    { date: "2023-11-13", status: "late", time: "07:15:05", reason: "Ban motor bocor" },
    { date: "2023-11-12", status: "present", time: "06:52:30" },
    { date: "2023-11-11", status: "present", time: "06:50:18" },
  ];
  
  // Mock data for discipline records
  const disciplineRecords = [
    { 
      id: "D001", 
      date: "2023-10-25", 
      type: "violation", 
      description: "Terlambat masuk kelas selama 3 hari berturut-turut",
      points: -5,
      status: "closed"
    },
    { 
      id: "D002", 
      date: "2023-10-18", 
      type: "violation", 
      description: "Tidak mengenakan atribut lengkap saat upacara",
      points: -5,
      status: "closed"
    },
    { 
      id: "D003", 
      date: "2023-11-05", 
      type: "achievement", 
      description: "Juara 2 Lomba Web Design tingkat kota",
      points: 15,
      status: "active"
    },
  ];
  
  // Mock data for assignments
  const assignments = [
    { 
      id: "A001", 
      subject: "Bahasa Indonesia", 
      title: "Menulis Essai Pendek", 
      dueDate: "2023-11-20",
      status: "pending"
    },
    { 
      id: "A002", 
      subject: "Matematika", 
      title: "Tugas Trigonometri", 
      dueDate: "2023-11-18",
      status: "pending"
    },
    { 
      id: "A003", 
      subject: "Pemrograman Web", 
      title: "Membuat Website Portfolio", 
      dueDate: "2023-11-25",
      status: "pending"
    },
    { 
      id: "A004", 
      subject: "Bahasa Inggris", 
      title: "Presentasi Berbahasa Inggris", 
      dueDate: "2023-11-10",
      status: "completed"
    },
  ];
  
  // Mock data for upcoming events
  const upcomingEvents = [
    { 
      id: "E001", 
      title: "Ujian Tengah Semester", 
      date: "2023-11-20",
      type: "academic"
    },
    { 
      id: "E002", 
      title: "Pertemuan Orang Tua", 
      date: "2023-11-25",
      type: "school"
    },
    { 
      id: "E003", 
      title: "Lomba Keterampilan Siswa", 
      date: "2023-12-05",
      type: "competition"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'sick':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'permission':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'late':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Hadir';
      case 'absent':
        return 'Absen';
      case 'sick':
        return 'Sakit';
      case 'permission':
        return 'Izin';
      case 'late':
        return 'Terlambat';
      default:
        return status;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Portal Orang Tua</h1>
                <p className="text-muted-foreground mt-1">Pantau perkembangan putra/putri Anda secara real-time</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.photo} alt={student.name} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.class}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Kehadiran</CardTitle>
                  <CardDescription>
                    Status kehadiran bulan ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hadir</span>
                      <span className="text-sm font-medium">{student.attendance.present}%</span>
                    </div>
                    <Progress value={student.attendance.present} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs">Absen: {student.attendance.absent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-xs">Sakit: {student.attendance.sick}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs">Izin: {student.attendance.permission}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-xs">Terlambat: {student.attendance.late}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Akademik</CardTitle>
                  <CardDescription>
                    Performa akademik semester ini
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-3xl font-bold">{student.academic.average}</div>
                      <div className="text-sm text-muted-foreground">Rata-rata nilai</div>
                    </div>
                    <div className="text-center px-4 py-2 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{student.academic.rank}</div>
                      <div className="text-xs text-muted-foreground">dari {student.academic.totalStudents} siswa</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/parent-portal/academic')}
                    >
                      <LineChart className="mr-2 h-4 w-4" />
                      Lihat Detail Nilai
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Kedisiplinan</CardTitle>
                  <CardDescription>
                    Status poin kedisiplinan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="text-center mb-2">
                      <div className="text-3xl font-bold">{student.discipline.points}</div>
                      <div className="text-sm text-muted-foreground">Total Poin</div>
                    </div>
                    
                    <Progress value={student.discipline.points} max={100} className="h-2 mb-4" />
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>{student.discipline.violations} Pelanggaran</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <BookOpen className="h-4 w-4" />
                        <span>{student.discipline.achievements} Prestasi</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="attendance" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
                <TabsTrigger value="discipline">Kedisiplinan</TabsTrigger>
                <TabsTrigger value="assignments">Tugas</TabsTrigger>
                <TabsTrigger value="events">Agenda</TabsTrigger>
              </TabsList>
              
              <TabsContent value="attendance" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Riwayat Kehadiran</CardTitle>
                    <CardDescription>
                      Log kehadiran 5 hari terakhir
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Waktu</TableHead>
                            <TableHead>Keterangan</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {attendanceHistory.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{format(new Date(item.date), 'dd MMM yyyy')}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={getStatusColor(item.status)}
                                >
                                  {getStatusLabel(item.status)}
                                </Badge>
                              </TableCell>
                              <TableCell>{item.time}</TableCell>
                              <TableCell>{item.reason || '-'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/parent-portal/attendance')}
                      >
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        Lihat Riwayat Lengkap
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discipline" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Catatan Kedisiplinan</CardTitle>
                    <CardDescription>
                      Pelanggaran dan prestasi siswa
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {disciplineRecords.map((record) => (
                        <div key={record.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className={record.type === 'violation' 
                                    ? 'bg-red-100 text-red-800 border-red-200' 
                                    : 'bg-green-100 text-green-800 border-green-200'}
                                >
                                  {record.type === 'violation' ? 'Pelanggaran' : 'Prestasi'}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  ID: {record.id}
                                </span>
                              </div>
                              <h4 className="font-medium mt-2">{record.description}</h4>
                            </div>
                            <div className={`text-lg font-bold ${record.points < 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {record.points > 0 ? `+${record.points}` : record.points} poin
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {format(new Date(record.date), 'dd MMMM yyyy')}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/parent-portal/discipline')}
                      >
                        Lihat Semua Catatan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="assignments" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tugas & Ujian</CardTitle>
                    <CardDescription>
                      Daftar tugas dan ujian yang akan datang
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.filter(a => a.status === 'pending').map((assignment) => (
                        <div key={assignment.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <div className="text-sm text-muted-foreground">{assignment.subject}</div>
                            <div className="font-medium">{assignment.title}</div>
                            <div className="text-sm mt-1">
                              Tenggat: {format(new Date(assignment.dueDate), 'dd MMM yyyy')}
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                            Belum Selesai
                          </Badge>
                        </div>
                      ))}
                      
                      {assignments.filter(a => a.status === 'pending').length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          Tidak ada tugas yang akan datang saat ini
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Pengingat</AlertTitle>
                        <AlertDescription>
                          Pastikan putra/putri Anda mengerjakan tugas sebelum tenggat waktu untuk mendapatkan nilai maksimal.
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/parent-portal/assignments')}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Lihat Semua Tugas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="events" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Agenda Mendatang</CardTitle>
                    <CardDescription>
                      Kegiatan sekolah yang akan datang
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {format(new Date(event.date), 'EEEE, dd MMMM yyyy')}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className={
                            event.type === 'academic' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            event.type === 'school' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                            'bg-green-100 text-green-800 border-green-200'
                          }>
                            {event.type === 'academic' ? 'Akademik' : 
                             event.type === 'school' ? 'Sekolah' : 'Lomba'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/calendar')}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Lihat Kalender Akademik
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Komunikasi</CardTitle>
                  <CardDescription>
                    Hubungi pihak sekolah
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" onClick={() => navigate('/parent-complaint')}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Buat Pengaduan
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Hubungi Wali Kelas
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Dokumen</CardTitle>
                  <CardDescription>
                    Akses dokumen penting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Laporan Nilai
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Kalender Akademik
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ParentPortalDashboardPage;
