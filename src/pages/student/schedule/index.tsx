
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Book, User, MapPin, Calendar } from 'lucide-react';

const StudentSchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState('senin');

  // Mock schedule data
  const scheduleData = {
    senin: [
      { time: "07:00-08:30", subject: "Pemrograman Web", teacher: "Pak Budi Santoso", room: "Lab Komputer 1" },
      { time: "08:30-10:00", subject: "Basis Data", teacher: "Ibu Siti Rahayu", room: "Lab Komputer 2" },
      { time: "10:15-11:45", subject: "Matematika", teacher: "Pak Ahmad Fauzi", room: "Kelas XI RPL 1" },
      { time: "13:00-14:30", subject: "Bahasa Indonesia", teacher: "Ibu Dewi Sartika", room: "Kelas XI RPL 1" }
    ],
    selasa: [
      { time: "07:00-08:30", subject: "Pemrograman Berorientasi Objek", teacher: "Pak Budi Santoso", room: "Lab Komputer 1" },
      { time: "08:30-10:00", subject: "Sistem Operasi", teacher: "Pak Joni Iskandar", room: "Lab Komputer 3" },
      { time: "10:15-11:45", subject: "Bahasa Inggris", teacher: "Ibu Linda Sari", room: "Kelas XI RPL 1" },
      { time: "13:00-14:30", subject: "Pendidikan Agama", teacher: "Pak Imam Ghozali", room: "Kelas XI RPL 1" }
    ],
    rabu: [
      { time: "07:00-08:30", subject: "Basis Data", teacher: "Ibu Siti Rahayu", room: "Lab Komputer 2" },
      { time: "08:30-10:00", subject: "Pemrograman Web", teacher: "Pak Budi Santoso", room: "Lab Komputer 1" },
      { time: "10:15-11:45", subject: "PKn", teacher: "Ibu Ratna Sari", room: "Kelas XI RPL 1" },
      { time: "13:00-14:30", subject: "Ekstrakurikuler Programming", teacher: "Pak Budi Santoso", room: "Lab Komputer 1" }
    ],
    kamis: [
      { time: "07:00-08:30", subject: "Matematika", teacher: "Pak Ahmad Fauzi", room: "Kelas XI RPL 1" },
      { time: "08:30-10:00", subject: "Sistem Operasi", teacher: "Pak Joni Iskandar", room: "Lab Komputer 3" },
      { time: "10:15-11:45", subject: "Pemrograman Berorientasi Objek", teacher: "Pak Budi Santoso", room: "Lab Komputer 1" },
      { time: "13:00-14:30", subject: "Olahraga", teacher: "Pak Rudi Hartono", room: "Lapangan Olahraga" }
    ],
    jumat: [
      { time: "07:00-08:30", subject: "Bahasa Indonesia", teacher: "Ibu Dewi Sartika", room: "Kelas XI RPL 1" },
      { time: "08:30-10:00", subject: "Bahasa Inggris", teacher: "Ibu Linda Sari", room: "Kelas XI RPL 1" },
      { time: "10:15-11:45", subject: "Konseling", teacher: "Ibu Psikolog", room: "Ruang BK" }
    ]
  };

  const days = [
    { key: 'senin', label: 'Senin' },
    { key: 'selasa', label: 'Selasa' },
    { key: 'rabu', label: 'Rabu' },
    { key: 'kamis', label: 'Kamis' },
    { key: 'jumat', label: 'Jumat' }
  ];

  return (
    <DashboardLayout
      title="Jadwal Pelajaran"
      description="Lihat jadwal pelajaran harian dan mingguan"
      userRole="student"
    >
      <div className="space-y-6">
        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Senin</div>
              <p className="text-sm text-muted-foreground">4 mata pelajaran</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jam Pelajaran Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">07:00-08:30</div>
              <p className="text-sm text-muted-foreground">Pemrograman Web</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Kelas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">XI RPL 1</div>
              <p className="text-sm text-muted-foreground">Rekayasa Perangkat Lunak</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {days.map((day) => (
              <TabsTrigger key={day.key} value={day.key}>{day.label}</TabsTrigger>
            ))}
          </TabsList>
          
          {days.map((day) => (
            <TabsContent key={day.key} value={day.key} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Jadwal {day.label}</h3>
                <Badge variant="outline">
                  {scheduleData[day.key as keyof typeof scheduleData].length} Jam Pelajaran
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {scheduleData[day.key as keyof typeof scheduleData].map((schedule, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Book className="h-5 w-5 text-primary" />
                            {schedule.subject}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Clock className="h-4 w-4" />
                            {schedule.time}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">Jam {index + 1}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.room}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {scheduleData[day.key as keyof typeof scheduleData].length === 0 && (
                  <Card className="p-8 text-center">
                    <CardContent>
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Tidak ada jadwal pelajaran pada hari {day.label}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentSchedulePage;
