
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Search, List, Filter, Check, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { id as localeId } from 'date-fns/locale';

const AttendancePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Kehadiran Siswa - Si-Kaji';
  }, []);

  const [selectedClass, setSelectedClass] = useState('XII RPL 1');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tabValue, setTabValue] = useState('daily');

  // Sample student data for attendance
  const students = [
    { id: 1, name: 'Andi Saputra', status: 'hadir', time: '07:15', photo: '' },
    { id: 2, name: 'Budi Santoso', status: 'hadir', time: '07:05', photo: '' },
    { id: 3, name: 'Cindy Permata', status: 'sakit', time: '-', photo: '' },
    { id: 4, name: 'Deni Wijaya', status: 'hadir', time: '07:10', photo: '' },
    { id: 5, name: 'Eka Putri', status: 'izin', time: '-', photo: '' },
    { id: 6, name: 'Farhan Ahmad', status: 'hadir', time: '07:08', photo: '' },
    { id: 7, name: 'Gita Nirmala', status: 'alpha', time: '-', photo: '' },
    { id: 8, name: 'Hendra Kusuma', status: 'hadir', time: '07:25', photo: '' },
  ];

  // Sample weekly attendance data
  const weeklyData = [
    { day: 'Senin', date: '02/10/2023', present: 32, absent: 3, sick: 1, permission: 2 },
    { day: 'Selasa', date: '03/10/2023', present: 35, absent: 1, sick: 2, permission: 0 },
    { day: 'Rabu', date: '04/10/2023', present: 33, absent: 2, sick: 2, permission: 1 },
    { day: 'Kamis', date: '05/10/2023', present: 34, absent: 0, sick: 3, permission: 1 },
    { day: 'Jumat', date: '06/10/2023', present: 36, absent: 1, sick: 1, permission: 0 },
  ];

  // Navigate date functions
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      hadir: { bg: 'bg-green-100', text: 'text-green-800', label: 'Hadir' },
      sakit: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Sakit' },
      izin: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Izin' },
      alpha: { bg: 'bg-red-100', text: 'text-red-800', label: 'Alpha' },
    }[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };

    return (
      <span className={`px-2 py-1 rounded text-xs ${statusConfig.bg} ${statusConfig.text}`}>
        {statusConfig.label}
      </span>
    );
  };

  // Formatted current date
  const formattedDate = format(currentDate, 'EEEE, dd MMMM yyyy', { locale: localeId });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Manajemen Kehadiran Siswa</h1>
                <p className="text-muted-foreground mt-1">Pantau dan kelola kehadiran siswa SMKN 1 Kendal</p>
              </div>
              <Button className="flex items-center gap-2">
                <Calendar size={18} />
                Rekap Kehadiran
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari siswa..."
                        className="pl-10 w-full md:w-80"
                      />
                    </div>
                    <Select defaultValue={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-full md:w-44">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XII RPL 1">XII RPL 1</SelectItem>
                        <SelectItem value="XII RPL 2">XII RPL 2</SelectItem>
                        <SelectItem value="XII RPL 3">XII RPL 3</SelectItem>
                        <SelectItem value="XI RPL 1">XI RPL 1</SelectItem>
                        <SelectItem value="XI RPL 2">XI RPL 2</SelectItem>
                        <SelectItem value="X RPL 1">X RPL 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      Filter
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <List size={16} />
                      Kolom
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily" className="mb-6" onValueChange={setTabValue}>
                  <TabsList>
                    <TabsTrigger value="daily">Harian</TabsTrigger>
                    <TabsTrigger value="weekly">Mingguan</TabsTrigger>
                    <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                  </TabsList>
                </Tabs>

                {tabValue === 'daily' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                      <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <Button variant="outline" size="icon" onClick={goToPreviousDay}>
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-medium text-lg">{formattedDate}</span>
                        <Button variant="outline" size="icon" onClick={goToNextDay}>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Hadir: 32</Badge>
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Alpha: 1</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Sakit: 2</Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Izin: 1</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left font-medium">Nama Siswa</th>
                            <th className="py-3 px-4 text-left font-medium">Status</th>
                            <th className="py-3 px-4 text-left font-medium">Waktu Hadir</th>
                            <th className="py-3 px-4 text-center font-medium">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((student) => (
                            <tr key={student.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={student.photo} alt={student.name} />
                                    <AvatarFallback>
                                      {student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {student.name}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <StatusBadge status={student.status} />
                              </td>
                              <td className="py-3 px-4">{student.time}</td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex justify-center gap-2">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Check className="h-4 w-4 text-green-600" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <X className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {tabValue === 'weekly' && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium">Hari</th>
                          <th className="py-3 px-4 text-left font-medium">Tanggal</th>
                          <th className="py-3 px-4 text-center font-medium">Hadir</th>
                          <th className="py-3 px-4 text-center font-medium">Alpha</th>
                          <th className="py-3 px-4 text-center font-medium">Sakit</th>
                          <th className="py-3 px-4 text-center font-medium">Izin</th>
                          <th className="py-3 px-4 text-right font-medium">Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weeklyData.map((day, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{day.day}</td>
                            <td className="py-3 px-4">{day.date}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">{day.present}</Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">{day.absent}</Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{day.sick}</Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">{day.permission}</Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="link" className="h-auto p-0">Lihat Detail</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {tabValue === 'monthly' && (
                  <div className="flex items-center justify-center py-10">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Laporan kehadiran bulanan akan ditampilkan di sini.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default AttendancePage;
