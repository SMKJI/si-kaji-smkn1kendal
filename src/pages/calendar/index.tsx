
import React, { useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Users, BookOpen } from 'lucide-react';

const CalendarPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Kalender Akademik - Si-Kaji';
  }, []);

  // Sample calendar events
  const academicEvents = [
    { 
      id: 1, 
      title: 'Ujian Tengah Semester', 
      startDate: '15 Oktober 2023',
      endDate: '20 Oktober 2023',
      type: 'exam',
      description: 'Ujian tengah semester untuk semua mata pelajaran'
    },
    { 
      id: 2, 
      title: 'Libur Hari Kemerdekaan', 
      startDate: '17 Agustus 2023',
      endDate: '17 Agustus 2023',
      type: 'holiday',
      description: 'Libur nasional memperingati Hari Kemerdekaan RI'
    },
    { 
      id: 3, 
      title: 'Penerimaan Rapor', 
      startDate: '23 Desember 2023',
      endDate: '23 Desember 2023',
      type: 'academic',
      description: 'Pembagian rapor semester ganjil'
    },
    { 
      id: 4, 
      title: 'Libur Semester Ganjil', 
      startDate: '24 Desember 2023',
      endDate: '7 Januari 2024',
      type: 'holiday',
      description: 'Libur akhir semester ganjil'
    },
  ];

  const schoolEvents = [
    { 
      id: 1, 
      title: 'Peringatan Hari Guru', 
      date: '25 November 2023',
      time: '08:00 - 11:00',
      location: 'Aula Sekolah',
      type: 'ceremony'
    },
    { 
      id: 2, 
      title: 'Lomba Kebersihan Kelas', 
      date: '10 Agustus 2023',
      time: '08:00 - 12:00',
      location: 'Seluruh Kelas',
      type: 'competition'
    },
    { 
      id: 3, 
      title: 'Pentas Seni Akhir Tahun', 
      date: '20 Desember 2023',
      time: '13:00 - 17:00',
      location: 'Aula Sekolah',
      type: 'performance'
    },
    { 
      id: 4, 
      title: 'Rapat Guru dan Orang Tua', 
      date: '5 September 2023',
      time: '14:00 - 16:00',
      location: 'Ruang Pertemuan',
      type: 'meeting'
    },
  ];

  // Class schedules (only shown for student/teacher roles)
  const classSchedules = [
    { day: 'Senin', subjects: [
      { name: 'Matematika', time: '07:00 - 08:30', teacher: 'Ibu Ani', room: 'R101' },
      { name: 'Bahasa Indonesia', time: '08:45 - 10:15', teacher: 'Bapak Budi', room: 'R101' },
      { name: 'Fisika', time: '10:30 - 12:00', teacher: 'Ibu Cindy', room: 'Lab Fisika' },
    ]},
    { day: 'Selasa', subjects: [
      { name: 'Kimia', time: '07:00 - 08:30', teacher: 'Bapak Deni', room: 'Lab Kimia' },
      { name: 'Biologi', time: '08:45 - 10:15', teacher: 'Ibu Eka', room: 'R101' },
      { name: 'Bahasa Inggris', time: '10:30 - 12:00', teacher: 'Ibu Fina', room: 'R101' },
    ]},
    { day: 'Rabu', subjects: [
      { name: 'Sejarah', time: '07:00 - 08:30', teacher: 'Bapak Gani', room: 'R101' },
      { name: 'Geografi', time: '08:45 - 10:15', teacher: 'Bapak Hadi', room: 'R101' },
      { name: 'Seni Budaya', time: '10:30 - 12:00', teacher: 'Ibu Ina', room: 'R. Seni' },
    ]},
  ];

  const getEventTypeBadge = (type: string) => {
    switch(type) {
      case 'exam':
        return <Badge className="bg-red-500">Ujian</Badge>;
      case 'holiday':
        return <Badge className="bg-green-500">Libur</Badge>;
      case 'academic':
        return <Badge className="bg-blue-500">Akademik</Badge>;
      case 'ceremony':
        return <Badge className="bg-purple-500">Upacara</Badge>;
      case 'competition':
        return <Badge className="bg-yellow-500">Lomba</Badge>;
      case 'performance':
        return <Badge className="bg-pink-500">Pentas</Badge>;
      case 'meeting':
        return <Badge className="bg-gray-500">Rapat</Badge>;
      default:
        return <Badge>Lainnya</Badge>;
    }
  };

  return (
    <DashboardLayout 
      title="Kalender Akademik" 
      description="Jadwal penting dan agenda sekolah" 
      showBackButton
      backTo="/dashboard"
      userRole="student"
      userName="Ahmad Siswa"
    >
      <Tabs defaultValue="academic" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="academic">Akademik</TabsTrigger>
          <TabsTrigger value="events">Acara Sekolah</TabsTrigger>
          <TabsTrigger value="schedule">Jadwal Kelas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                Kalender Akademik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {academicEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      {getEventTypeBadge(event.type)}
                    </div>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>
                        {event.startDate === event.endDate 
                          ? event.startDate 
                          : `${event.startDate} - ${event.endDate}`}
                      </span>
                    </div>
                    <p className="text-sm">{event.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Acara Sekolah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {schoolEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      {getEventTypeBadge(event.type)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center md:col-span-2">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Jadwal Kelas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {classSchedules.map((day, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-3">
                      <h3 className="font-semibold">{day.day}</h3>
                    </div>
                    <div className="p-0">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr className="border-b">
                            <th className="py-2 px-4 text-left font-medium">Waktu</th>
                            <th className="py-2 px-4 text-left font-medium">Mata Pelajaran</th>
                            <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Guru</th>
                            <th className="py-2 px-4 text-left font-medium hidden md:table-cell">Ruang</th>
                          </tr>
                        </thead>
                        <tbody>
                          {day.subjects.map((subject, idx) => (
                            <tr key={idx} className="border-b last:border-b-0 hover:bg-muted/30">
                              <td className="py-3 px-4">{subject.time}</td>
                              <td className="py-3 px-4">
                                <div className="font-medium">{subject.name}</div>
                                <div className="text-xs text-muted-foreground md:hidden">
                                  {subject.teacher} • {subject.room}
                                </div>
                              </td>
                              <td className="py-3 px-4 hidden md:table-cell">{subject.teacher}</td>
                              <td className="py-3 px-4 hidden md:table-cell">{subject.room}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CalendarPage;
