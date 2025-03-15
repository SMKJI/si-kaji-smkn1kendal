
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Kalender Akademik - Si-Kaji';
  }, []);

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Ujian Tengah Semester',
      date: new Date(2023, 9, 15), // October 15, 2023
      time: '07:30 - 12:30',
      location: 'Semua Ruang Kelas',
      category: 'Akademik',
      participants: 'Semua Siswa',
      description: 'Pelaksanaan Ujian Tengah Semester Ganjil Tahun Ajaran 2023/2024'
    },
    {
      id: 2,
      title: 'Rapat Guru dan Staf',
      date: new Date(2023, 9, 18), // October 18, 2023
      time: '14:00 - 16:00',
      location: 'Ruang Rapat Utama',
      category: 'Rapat',
      participants: 'Semua Guru dan Staf',
      description: 'Rapat evaluasi pelaksanaan Ujian Tengah Semester'
    },
    {
      id: 3,
      title: 'Peringatan Hari Sumpah Pemuda',
      date: new Date(2023, 9, 28), // October 28, 2023
      time: '07:30 - 09:30',
      location: 'Lapangan Utama',
      category: 'Peringatan',
      participants: 'Semua Warga Sekolah',
      description: 'Upacara peringatan Hari Sumpah Pemuda dan pentas seni'
    },
    {
      id: 4,
      title: 'Lomba Kebersihan Kelas',
      date: new Date(2023, 10, 5), // November 5, 2023
      time: '09:00 - 12:00',
      location: 'Seluruh Ruang Kelas',
      category: 'Lomba',
      participants: 'Semua Kelas',
      description: 'Penilaian kebersihan dan kerapian kelas dalam rangka Jumat Bersih'
    },
    {
      id: 5,
      title: 'Pelatihan Guru',
      date: new Date(2023, 10, 10), // November 10, 2023
      time: '08:00 - 16:00',
      location: 'Aula Sekolah',
      category: 'Pelatihan',
      participants: 'Semua Guru',
      description: 'Pelatihan implementasi kurikulum merdeka'
    }
  ];

  const todayEvents = events.filter(event => {
    return date && event.date.toDateString() === date.toDateString();
  });

  const getCategoryBadge = (category) => {
    switch(category) {
      case 'Akademik':
        return <Badge className="bg-blue-500">Akademik</Badge>;
      case 'Rapat':
        return <Badge className="bg-amber-500">Rapat</Badge>;
      case 'Peringatan':
        return <Badge className="bg-red-500">Peringatan</Badge>;
      case 'Lomba':
        return <Badge className="bg-green-500">Lomba</Badge>;
      case 'Pelatihan':
        return <Badge className="bg-purple-500">Pelatihan</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  // Custom calendar day rendering - highlight days with events
  const dayWithEvents = (day: Date) => {
    const hasEvent = events.some(event => 
      event.date.toDateString() === day.toDateString()
    );
    
    return hasEvent ? (
      <div className="relative">
        {day.getDate()}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
      </div>
    ) : day.getDate();
  };

  return (
    <DashboardLayout
      title="Kalender Akademik"
      description="Jadwal kegiatan dan agenda sekolah"
      userRole="admin"
      userName="Administrator"
      showBackButton
      backTo="/dashboard"
    >
      <div className="mb-4 flex justify-end">
        <Button className="gap-2">
          <Plus size={16} />
          Tambah Kegiatan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 order-2 md:order-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Kegiatan {date ? format(date, "EEEE, d MMMM yyyy", { locale: id }) : ''}</CardTitle>
            </CardHeader>
            <CardContent>
              {todayEvents.length > 0 ? (
                <div className="space-y-4">
                  {todayEvents.map(event => (
                    <div key={event.id} className="p-4 border rounded-lg shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon size={16} className="text-primary" />
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            {getCategoryBadge(event.category)}
                          </div>
                          <div className="grid grid-cols-1 gap-2 mt-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock size={14} />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin size={14} />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users size={14} />
                              {event.participants}
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm">{event.description}</p>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-2 ml-auto md:ml-0 mt-4 md:mt-0">
                          <Button variant="outline" size="sm">Detail</Button>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Tidak Ada Kegiatan</h3>
                  <p className="text-muted-foreground">Tidak ada kegiatan terjadwal pada tanggal ini.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="order-1 md:order-2">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const prevMonth = new Date(currentMonth);
                    prevMonth.setMonth(prevMonth.getMonth() - 1);
                    setCurrentMonth(prevMonth);
                  }}
                >
                  <ChevronLeft size={16} />
                </Button>
                <h3 className="font-medium">
                  {format(currentMonth, 'MMMM yyyy', { locale: id })}
                </h3>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const nextMonth = new Date(currentMonth);
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    setCurrentMonth(nextMonth);
                  }}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                locale={id}
                className="rounded-md border"
                components={{
                  DayContent: props => dayWithEvents(props.date)
                }}
              />
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Kategori Kegiatan</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-500">Akademik</Badge>
                  <Badge className="bg-amber-500">Rapat</Badge>
                  <Badge className="bg-red-500">Peringatan</Badge>
                  <Badge className="bg-green-500">Lomba</Badge>
                  <Badge className="bg-purple-500">Pelatihan</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
