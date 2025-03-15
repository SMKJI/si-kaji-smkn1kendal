
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, XCircle, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for student attendance
const MOCK_ATTENDANCE = [
  {
    id: 1,
    date: '2023-10-25',
    status: 'present',
    subject: 'Matematika',
    teacher: 'Bu Siti',
    time: '07:30 - 09:00',
    note: ''
  },
  {
    id: 2,
    date: '2023-10-25',
    status: 'present',
    subject: 'Bahasa Indonesia',
    teacher: 'Pak Ahmad',
    time: '09:30 - 11:00',
    note: ''
  },
  {
    id: 3,
    date: '2023-10-24',
    status: 'present',
    subject: 'IPA',
    teacher: 'Bu Dewi',
    time: '07:30 - 09:00',
    note: ''
  },
  {
    id: 4,
    date: '2023-10-24',
    status: 'late',
    subject: 'Bahasa Inggris',
    teacher: 'Bu Sarah',
    time: '09:30 - 11:00',
    note: 'Terlambat 10 menit'
  },
  {
    id: 5,
    date: '2023-10-23',
    status: 'absent',
    subject: 'Matematika',
    teacher: 'Bu Siti',
    time: '07:30 - 09:00',
    note: 'Sakit'
  },
  {
    id: 6,
    date: '2023-10-23',
    status: 'present',
    subject: 'Pendidikan Agama',
    teacher: 'Pak Budi',
    time: '09:30 - 11:00',
    note: ''
  },
  {
    id: 7,
    date: '2023-10-20',
    status: 'present',
    subject: 'Olahraga',
    teacher: 'Pak Joko',
    time: '07:30 - 09:00',
    note: ''
  },
  {
    id: 8,
    date: '2023-10-20',
    status: 'present',
    subject: 'Seni Budaya',
    teacher: 'Bu Dewi',
    time: '09:30 - 11:00',
    note: ''
  }
];

// Mock data for extracurricular attendance
const MOCK_EXTRACURRICULAR_ATTENDANCE = [
  {
    id: 1,
    date: '2023-10-26',
    status: 'present',
    activity: 'Pramuka',
    trainer: 'Pak Agung',
    time: '15:00 - 17:00',
    note: ''
  },
  {
    id: 2,
    date: '2023-10-19',
    status: 'present',
    activity: 'Pramuka',
    trainer: 'Pak Agung',
    time: '15:00 - 17:00',
    note: ''
  },
  {
    id: 3,
    date: '2023-10-24',
    status: 'absent',
    activity: 'Basket',
    trainer: 'Pak Deni',
    time: '15:30 - 17:30',
    note: 'Izin'
  },
  {
    id: 4,
    date: '2023-10-17',
    status: 'present',
    activity: 'Basket',
    trainer: 'Pak Deni',
    time: '15:30 - 17:30',
    note: ''
  }
];

const StudentAttendancePage = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState('all');
  const [status, setStatus] = useState('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Kehadiran Saya - Si-Kaji';
  }, []);
  
  // Calculate attendance statistics
  const totalClasses = MOCK_ATTENDANCE.length;
  const presentCount = MOCK_ATTENDANCE.filter(a => a.status === 'present').length;
  const lateCount = MOCK_ATTENDANCE.filter(a => a.status === 'late').length;
  const absentCount = MOCK_ATTENDANCE.filter(a => a.status === 'absent').length;
  
  const presentPercentage = Math.round((presentCount / totalClasses) * 100);
  const latePercentage = Math.round((lateCount / totalClasses) * 100);
  const absentPercentage = Math.round((absentCount / totalClasses) * 100);
  
  // Calculate extracurricular attendance statistics
  const totalExtracurricular = MOCK_EXTRACURRICULAR_ATTENDANCE.length;
  const extracurricularPresentCount = MOCK_EXTRACURRICULAR_ATTENDANCE.filter(a => a.status === 'present').length;
  const extracurricularAbsentCount = MOCK_EXTRACURRICULAR_ATTENDANCE.filter(a => a.status === 'absent').length;
  
  const extracurricularPresentPercentage = Math.round((extracurricularPresentCount / totalExtracurricular) * 100);
  const extracurricularAbsentPercentage = Math.round((extracurricularAbsentCount / totalExtracurricular) * 100);
  
  // Filter attendance data
  const filterAttendance = (data) => {
    return data.filter(item => {
      // Filter by month
      if (month !== 'all') {
        const itemMonth = new Date(item.date).getMonth() + 1;
        if (itemMonth.toString() !== month) return false;
      }
      
      // Filter by status
      if (status !== 'all' && item.status !== status) return false;
      
      return true;
    });
  };
  
  const filteredClassAttendance = filterAttendance(MOCK_ATTENDANCE);
  const filteredExtracurricularAttendance = filterAttendance(MOCK_EXTRACURRICULAR_ATTENDANCE);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, dd MMMM yyyy', { locale: id });
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'present':
        return <Badge className="bg-green-500">Hadir</Badge>;
      case 'late':
        return <Badge className="bg-amber-500">Terlambat</Badge>;
      case 'absent':
        return <Badge className="bg-red-500">Tidak Hadir</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Kehadiran Saya"
      description="Lihat riwayat kehadiran di kelas dan ekstrakurikuler"
      userRole="student"
      userName="Alex Kurniawan"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                Tingkat Kehadiran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{presentPercentage}%</div>
              <Progress value={presentPercentage} className="h-2 mt-2 mb-1" />
              <p className="text-sm text-muted-foreground">Kehadiran di kelas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-amber-500" />
                Keterlambatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{latePercentage}%</div>
              <Progress value={latePercentage} className="h-2 mt-2 mb-1" color="amber" />
              <p className="text-sm text-muted-foreground">{lateCount} kali terlambat</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <XCircle className="mr-2 h-5 w-5 text-red-500" />
                Ketidakhadiran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{absentPercentage}%</div>
              <Progress value={absentPercentage} className="h-2 mt-2 mb-1" color="red" />
              <p className="text-sm text-muted-foreground">{absentCount} kali tidak hadir</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="class">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="class">Kelas</TabsTrigger>
              <TabsTrigger value="extracurricular">Ekstrakurikuler</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Pilih Bulan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Bulan</SelectItem>
                    <SelectItem value="1">Januari</SelectItem>
                    <SelectItem value="2">Februari</SelectItem>
                    <SelectItem value="3">Maret</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">Mei</SelectItem>
                    <SelectItem value="6">Juni</SelectItem>
                    <SelectItem value="7">Juli</SelectItem>
                    <SelectItem value="8">Agustus</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">Oktober</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">Desember</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="present">Hadir</SelectItem>
                    <SelectItem value="late">Terlambat</SelectItem>
                    <SelectItem value="absent">Tidak Hadir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <TabsContent value="class">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Kehadiran Kelas</CardTitle>
                <CardDescription>
                  Rekap kehadiran di kelas selama semester ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Mata Pelajaran</TableHead>
                      <TableHead>Pengajar</TableHead>
                      <TableHead>Jam</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Keterangan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClassAttendance.length > 0 ? (
                      filteredClassAttendance.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>{item.teacher}</TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>{item.note || '-'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Tidak ada data kehadiran yang sesuai dengan filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Menampilkan {filteredClassAttendance.length} dari {MOCK_ATTENDANCE.length} data
                </div>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Kembali ke Dashboard
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="extracurricular">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Kehadiran Ekstrakurikuler</CardTitle>
                <CardDescription>
                  Rekap kehadiran di kegiatan ekstrakurikuler selama semester ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Kehadiran</h3>
                        <span className="text-2xl font-bold text-green-500">{extracurricularPresentPercentage}%</span>
                      </div>
                      <Progress value={extracurricularPresentPercentage} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">{extracurricularPresentCount} kali hadir dari {totalExtracurricular} pertemuan</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Ketidakhadiran</h3>
                        <span className="text-2xl font-bold text-red-500">{extracurricularAbsentPercentage}%</span>
                      </div>
                      <Progress value={extracurricularAbsentPercentage} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">{extracurricularAbsentCount} kali tidak hadir dari {totalExtracurricular} pertemuan</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Kegiatan</TableHead>
                      <TableHead>Pelatih</TableHead>
                      <TableHead>Jam</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Keterangan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExtracurricularAttendance.length > 0 ? (
                      filteredExtracurricularAttendance.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{formatDate(item.date)}</TableCell>
                          <TableCell>{item.activity}</TableCell>
                          <TableCell>{item.trainer}</TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>{item.note || '-'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Tidak ada data kehadiran yang sesuai dengan filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Menampilkan {filteredExtracurricularAttendance.length} dari {MOCK_EXTRACURRICULAR_ATTENDANCE.length} data
                </div>
                <Button variant="outline" onClick={() => navigate('/extracurricular')}>
                  Lihat Kegiatan Ekstrakurikuler
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendancePage;
