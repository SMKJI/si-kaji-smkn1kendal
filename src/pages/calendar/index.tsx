
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, getDay, getMonth, getYear, isToday, parse } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CalendarPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Kalender Akademik - Si-Kaji';
  }, []);

  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState('month');

  // Sample calendar events
  const events = [
    { id: 1, title: 'Ujian Tengah Semester', date: '2023-10-10', type: 'exam', description: 'Ujian untuk semua mata pelajaran' },
    { id: 2, title: 'Rapat Wali Murid', date: '2023-10-15', type: 'meeting', description: 'Pembahasan kemajuan akademik siswa' },
    { id: 3, title: 'Libur Hari Pahlawan', date: '2023-11-10', type: 'holiday', description: 'Libur nasional' },
    { id: 4, title: 'Praktikum Komputer', date: '2023-10-05', type: 'activity', description: 'Praktikum untuk kelas XII RPL' },
    { id: 5, title: 'Perayaan Hari Guru', date: '2023-11-25', type: 'celebration', description: 'Acara penghargaan untuk guru' },
    { id: 6, title: 'Workshop Coding', date: '2023-11-05', type: 'workshop', description: 'Workshop programming untuk semua siswa RPL' },
    { id: 7, title: 'Karya Wisata', date: '2023-12-20', type: 'trip', description: 'Kunjungan ke museum teknologi' },
    { id: 8, title: 'Ujian Akhir Semester', date: '2023-12-05', type: 'exam', description: 'Ujian akhir semester ganjil' },
  ];

  // Filter events for the selected date
  const getEventsForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return events.filter(event => event.date === dateString);
  };

  const selectedDateEvents = getEventsForDate(date);

  // Get event type badge color
  const getEventTypeColor = (type: string) => {
    const typeColors = {
      'exam': 'bg-red-100 text-red-800',
      'meeting': 'bg-blue-100 text-blue-800',
      'holiday': 'bg-green-100 text-green-800',
      'activity': 'bg-purple-100 text-purple-800',
      'celebration': 'bg-yellow-100 text-yellow-800',
      'workshop': 'bg-orange-100 text-orange-800',
      'trip': 'bg-indigo-100 text-indigo-800',
    };
    return typeColors[type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800';
  };

  // Current month events for monthly view
  const currentMonthEvents = events.filter(event => {
    const eventDate = parse(event.date, 'yyyy-MM-dd', new Date());
    return getMonth(eventDate) === getMonth(date) && getYear(eventDate) === getYear(date);
  });

  // Upcoming events for list view
  const upcomingEvents = [...events]
    .filter(event => {
      const eventDate = parse(event.date, 'yyyy-MM-dd', new Date());
      return eventDate >= new Date();
    })
    .sort((a, b) => {
      const dateA = parse(a.date, 'yyyy-MM-dd', new Date());
      const dateB = parse(b.date, 'yyyy-MM-dd', new Date());
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Kalender Akademik</h1>
                <p className="text-muted-foreground mt-1">Jadwal kegiatan dan acara sekolah SMKN 1 Kendal</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                Tambah Kegiatan
              </Button>
            </div>

            <Tabs defaultValue="month" onValueChange={setView}>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <TabsList>
                  <TabsTrigger value="month">Bulan</TabsTrigger>
                  <TabsTrigger value="list">Daftar</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari kegiatan..."
                      className="pl-10"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua</SelectItem>
                      <SelectItem value="exam">Ujian</SelectItem>
                      <SelectItem value="meeting">Rapat</SelectItem>
                      <SelectItem value="holiday">Libur</SelectItem>
                      <SelectItem value="activity">Kegiatan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value="month" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Kalender {format(date, 'MMMM yyyy', { locale: localeId })}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                            <span className="sr-only">Hari Ini</span>
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => {
                            const newDate = new Date(date);
                            newDate.setMonth(newDate.getMonth() - 1);
                            setDate(newDate);
                          }}>
                            <span className="sr-only">Bulan Sebelumnya</span>
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => {
                            const newDate = new Date(date);
                            newDate.setMonth(newDate.getMonth() + 1);
                            setDate(newDate);
                          }}>
                            <span className="sr-only">Bulan Berikutnya</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => newDate && setDate(newDate)}
                        className="rounded-md border"
                        modifiersClassNames={{
                          today: 'bg-primary text-primary-foreground',
                        }}
                        components={{
                          Day: ({ day, ...props }) => {
                            const dateString = format(day, 'yyyy-MM-dd');
                            const dayEvents = events.filter(event => event.date === dateString);
                            return (
                              <div {...props}>
                                <div className={`w-full h-full flex flex-col items-center justify-center rounded-md ${isToday(day) ? 'bg-primary text-primary-foreground' : ''}`}>
                                  <span>{format(day, 'd')}</span>
                                  {dayEvents.length > 0 && (
                                    <div className="flex gap-0.5 mt-1">
                                      {dayEvents.length <= 3 ? (
                                        dayEvents.map((event, i) => (
                                          <div
                                            key={i}
                                            className={`w-1.5 h-1.5 rounded-full ${event.type === 'exam' ? 'bg-red-500' : 
                                                        event.type === 'meeting' ? 'bg-blue-500' : 
                                                        event.type === 'holiday' ? 'bg-green-500' : 
                                                        'bg-yellow-500'}`}
                                          ></div>
                                        ))
                                      ) : (
                                        <>
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          },
                        }}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Agenda {format(date, 'dd MMMM yyyy', { locale: localeId })}</CardTitle>
                      <CardDescription>
                        {selectedDateEvents.length > 0 
                          ? `${selectedDateEvents.length} kegiatan pada tanggal ini` 
                          : 'Tidak ada kegiatan pada tanggal ini'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedDateEvents.length > 0 ? (
                        <div className="space-y-4">
                          {selectedDateEvents.map((event) => (
                            <div key={event.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge className={getEventTypeColor(event.type)}>
                                  {event.type === 'exam' ? 'Ujian' : 
                                    event.type === 'meeting' ? 'Rapat' : 
                                    event.type === 'holiday' ? 'Libur' : 
                                    event.type === 'activity' ? 'Kegiatan' :
                                    event.type === 'celebration' ? 'Perayaan' :
                                    event.type === 'workshop' ? 'Workshop' :
                                    event.type === 'trip' ? 'Wisata' : 
                                    event.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                          <CalendarIcon className="h-12 w-12 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Tidak ada kegiatan terjadwal</p>
                          <Button variant="outline" className="mt-4">
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Kegiatan
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Acara Bulan {format(date, 'MMMM yyyy', { locale: localeId })}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentMonthEvents.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-3 px-4 text-left font-medium">Tanggal</th>
                              <th className="py-3 px-4 text-left font-medium">Acara</th>
                              <th className="py-3 px-4 text-left font-medium">Tipe</th>
                              <th className="py-3 px-4 text-left font-medium">Deskripsi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMonthEvents.map((event) => {
                              const eventDate = parse(event.date, 'yyyy-MM-dd', new Date());
                              return (
                                <tr key={event.id} className="border-b hover:bg-muted/50">
                                  <td className="py-3 px-4">{format(eventDate, 'EEEE, dd MMMM', { locale: localeId })}</td>
                                  <td className="py-3 px-4 font-medium">{event.title}</td>
                                  <td className="py-3 px-4">
                                    <Badge className={getEventTypeColor(event.type)}>
                                      {event.type === 'exam' ? 'Ujian' : 
                                        event.type === 'meeting' ? 'Rapat' : 
                                        event.type === 'holiday' ? 'Libur' : 
                                        event.type === 'activity' ? 'Kegiatan' :
                                        event.type === 'celebration' ? 'Perayaan' :
                                        event.type === 'workshop' ? 'Workshop' :
                                        event.type === 'trip' ? 'Wisata' : 
                                        event.type}
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4">{event.description}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">
                        Tidak ada acara terjadwal untuk bulan ini.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="list" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Acara Mendatang</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingEvents.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-3 px-4 text-left font-medium">Tanggal</th>
                              <th className="py-3 px-4 text-left font-medium">Acara</th>
                              <th className="py-3 px-4 text-left font-medium">Tipe</th>
                              <th className="py-3 px-4 text-left font-medium">Deskripsi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {upcomingEvents.map((event) => {
                              const eventDate = parse(event.date, 'yyyy-MM-dd', new Date());
                              return (
                                <tr key={event.id} className="border-b hover:bg-muted/50">
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                      <div className="flex flex-col items-center justify-center bg-primary/10 rounded p-1 w-10 h-10 text-primary">
                                        <span className="text-xs font-medium">
                                          {format(eventDate, 'dd')}
                                        </span>
                                        <span className="text-xs">
                                          {format(eventDate, 'MMM', { locale: localeId })}
                                        </span>
                                      </div>
                                      <span className="text-sm">
                                        {format(eventDate, 'EEEE', { locale: localeId })}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 font-medium">{event.title}</td>
                                  <td className="py-3 px-4">
                                    <Badge className={getEventTypeColor(event.type)}>
                                      {event.type === 'exam' ? 'Ujian' : 
                                        event.type === 'meeting' ? 'Rapat' : 
                                        event.type === 'holiday' ? 'Libur' : 
                                        event.type === 'activity' ? 'Kegiatan' :
                                        event.type === 'celebration' ? 'Perayaan' :
                                        event.type === 'workshop' ? 'Workshop' :
                                        event.type === 'trip' ? 'Wisata' : 
                                        event.type}
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4">{event.description}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">
                        Tidak ada acara terjadwal untuk bulan ini.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CalendarPage;
