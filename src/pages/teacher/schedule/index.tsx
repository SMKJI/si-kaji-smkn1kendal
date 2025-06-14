
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar, Book, Users, MapPin } from 'lucide-react';

const TeacherSchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState('senin');

  // Mock schedule data
  const scheduleData = {
    senin: [
      { time: "07:00-08:30", subject: "Pemrograman Web", class: "XII RPL 1", room: "Lab Komputer 1", students: 32 },
      { time: "08:30-10:00", subject: "Basis Data", class: "XI RPL 2", room: "Lab Komputer 2", students: 30 },
      { time: "10:15-11:45", subject: "Pemrograman Berorientasi Objek", class: "XI RPL 1", room: "Lab Komputer 1", students: 28 },
      { time: "13:00-14:30", subject: "Prakerin Bimbingan", class: "XII RPL 2", room: "Ruang Guru", students: 15 }
    ],
    selasa: [
      { time: "07:00-08:30", subject: "Basis Data", class: "XI RPL 1", room: "Lab Komputer 2", students: 28 },
      { time: "08:30-10:00", subject: "Pemrograman Web", class: "XII RPL 2", room: "Lab Komputer 1", students: 31 },
      { time: "10:15-11:45", subject: "Sistem Operasi", class: "XI RPL 2", room: "Lab Komputer 3", students: 30 }
    ],
    rabu: [
      { time: "07:00-08:30", subject: "Pemrograman Berorientasi Objek", class: "XI RPL 2", room: "Lab Komputer 1", students: 30 },
      { time: "08:30-10:00", subject: "Pemrograman Web", class: "XII RPL 1", room: "Lab Komputer 2", students: 32 },
      { time: "13:00-14:30", subject: "Ekstrakurikuler Programming", class: "Mixed", room: "Lab Komputer 1", students: 20 }
    ],
    kamis: [
      { time: "07:00-08:30", subject: "Basis Data", class: "XI RPL 2", room: "Lab Komputer 2", students: 30 },
      { time: "08:30-10:00", subject: "Sistem Operasi", class: "XI RPL 1", room: "Lab Komputer 3", students: 28 },
      { time: "10:15-11:45", subject: "Pemrograman Web", class: "XII RPL 2", room: "Lab Komputer 1", students: 31 }
    ],
    jumat: [
      { time: "07:00-08:30", subject: "Pemrograman Berorientasi Objek", class: "XI RPL 1", room: "Lab Komputer 1", students: 28 },
      { time: "08:30-10:00", subject: "Konsultasi Siswa", class: "Individual", room: "Ruang Guru", students: 5 }
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
      title="Jadwal Mengajar"
      description="Kelola jadwal mengajar dan aktivitas harian"
      userRole="teacher"
    >
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
                      <Badge variant="secondary">{schedule.class}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {schedule.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {schedule.students} siswa
                        </span>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Presensi
                        </Button>
                        <Button variant="outline" size="sm">
                          Materi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {scheduleData[day.key as keyof typeof scheduleData].length === 0 && (
                <Card className="p-8 text-center">
                  <CardContent>
                    <p className="text-muted-foreground">Tidak ada jadwal mengajar pada hari {day.label}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
};

export default TeacherSchedulePage;
