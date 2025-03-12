
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Filter, Plus, Printer } from 'lucide-react';

const SchedulePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Jadwal Pelajaran - Si-Kaji';
  }, []);

  const [selectedClass, setSelectedClass] = useState<string>('');

  // Sample schedule data
  const scheduleData = {
    'XII RPL 1': {
      monday: [
        { time: '07:00 - 07:45', subject: 'Upacara', teacher: '-' },
        { time: '07:45 - 09:15', subject: 'Bahasa Indonesia', teacher: 'Budi Santoso, S.Pd.' },
        { time: '09:15 - 09:30', subject: 'Istirahat', teacher: '-' },
        { time: '09:30 - 11:00', subject: 'Matematika', teacher: 'Dian Pertiwi, M.Pd.' },
        { time: '11:00 - 11:45', subject: 'Pemrograman Web', teacher: 'Rudi Hermawan, S.Kom.' },
        { time: '11:45 - 12:30', subject: 'Ishoma', teacher: '-' },
        { time: '12:30 - 14:00', subject: 'Pemrograman Web', teacher: 'Rudi Hermawan, S.Kom.' },
      ],
      tuesday: [
        { time: '07:00 - 08:30', subject: 'Bahasa Inggris', teacher: 'Ani Suryani, S.Pd.' },
        { time: '08:30 - 10:00', subject: 'Basis Data', teacher: 'Tono Wijaya, S.T.' },
        { time: '10:00 - 10:15', subject: 'Istirahat', teacher: '-' },
        { time: '10:15 - 11:45', subject: 'Pemrograman Mobile', teacher: 'Siti Rahayu, S.Pd.' },
        { time: '11:45 - 12:30', subject: 'Ishoma', teacher: '-' },
        { time: '12:30 - 14:00', subject: 'Pemrograman Mobile', teacher: 'Siti Rahayu, S.Pd.' },
      ],
      wednesday: [
        { time: '07:00 - 08:30', subject: 'Matematika', teacher: 'Dian Pertiwi, M.Pd.' },
        { time: '08:30 - 10:00', subject: 'PKN', teacher: 'Bambang Sutrisno, S.Pd.' },
        { time: '10:00 - 10:15', subject: 'Istirahat', teacher: '-' },
        { time: '10:15 - 11:45', subject: 'Pemrograman Web', teacher: 'Rudi Hermawan, S.Kom.' },
        { time: '11:45 - 12:30', subject: 'Ishoma', teacher: '-' },
        { time: '12:30 - 14:00', subject: 'Pemrograman Web', teacher: 'Rudi Hermawan, S.Kom.' },
      ],
      thursday: [
        { time: '07:00 - 08:30', subject: 'Bahasa Indonesia', teacher: 'Budi Santoso, S.Pd.' },
        { time: '08:30 - 10:00', subject: 'Bahasa Inggris', teacher: 'Ani Suryani, S.Pd.' },
        { time: '10:00 - 10:15', subject: 'Istirahat', teacher: '-' },
        { time: '10:15 - 11:45', subject: 'Basis Data', teacher: 'Tono Wijaya, S.T.' },
        { time: '11:45 - 12:30', subject: 'Ishoma', teacher: '-' },
        { time: '12:30 - 14:00', subject: 'Basis Data', teacher: 'Tono Wijaya, S.T.' },
      ],
      friday: [
        { time: '07:00 - 07:30', subject: 'Keagamaan', teacher: '-' },
        { time: '07:30 - 09:00', subject: 'Pendidikan Agama', teacher: 'Ahmad Fauzi, S.Ag.' },
        { time: '09:00 - 09:15', subject: 'Istirahat', teacher: '-' },
        { time: '09:15 - 11:45', subject: 'Penjaskes', teacher: 'Dedi Kurniawan, S.Pd.' },
      ],
    },
    'XII RPL 2': {
      monday: [
        { time: '07:00 - 07:45', subject: 'Upacara', teacher: '-' },
        { time: '07:45 - 09:15', subject: 'Matematika', teacher: 'Dian Pertiwi, M.Pd.' },
        { time: '09:15 - 09:30', subject: 'Istirahat', teacher: '-' },
        { time: '09:30 - 11:00', subject: 'Bahasa Indonesia', teacher: 'Budi Santoso, S.Pd.' },
        { time: '11:00 - 11:45', subject: 'Basis Data', teacher: 'Tono Wijaya, S.T.' },
        { time: '11:45 - 12:30', subject: 'Ishoma', teacher: '-' },
        { time: '12:30 - 14:00', subject: 'Basis Data', teacher: 'Tono Wijaya, S.T.' },
      ],
      tuesday: [
        // Similar structure for other days...
        { time: '07:00 - 08:30', subject: 'Pemrograman Web', teacher: 'Rudi Hermawan, S.Kom.' },
        { time: '08:30 - 10:00', subject: 'Pemrograman Web', teacher: 'Rudi Hermawan, S.Kom.' },
        { time: '10:00 - 10:15', subject: 'Istirahat', teacher: '-' },
        { time: '10:15 - 11:45', subject: 'Bahasa Inggris', teacher: 'Ani Suryani, S.Pd.' },
        { time: '11:45 - 12:30', subject: 'Ishoma', teacher: '-' },
        { time: '12:30 - 14:00', subject: 'PKN', teacher: 'Bambang Sutrisno, S.Pd.' },
      ],
      wednesday: [
        // More schedule entries...
        { time: '07:00 - 08:30', subject: 'Pemrograman Mobile', teacher: 'Siti Rahayu, S.Pd.' },
        { time: '08:30 - 10:00', subject: 'Pemrograman Mobile', teacher: 'Siti Rahayu, S.Pd.' },
        { time: '10:00 - 10:15', subject: 'Istirahat', teacher: '-' },
        { time: '10:15 - 11:45', subject: 'Matematika', teacher: 'Dian Pertiwi, M.Pd.' },
        { time: '11:45 - 12:30', subject: 'Ishoma', teacher: '-' },
        { time: '12:30 - 14:00', subject: 'Bahasa Indonesia', teacher: 'Budi Santoso, S.Pd.' },
      ],
      thursday: [
        // Additional schedule entries...
        { time: '07:00 - 08:30', subject: 'Basis Data', teacher: 'Tono Wijaya, S.T.' },
        { time: '08:30 - 10:00', subject: 'Basis Data', teacher: 'Tono Wijaya, S.T.' },
        { time: '10:00 - 10:15', subject: 'Istirahat', teacher: '-' },
        { time: '10:15 - 11:45', subject: 'Bahasa Inggris', teacher: 'Ani Suryani, S.Pd.' },
        { time: '11:45 - 12:30', subject: 'Ishoma', teacher: '-' },
        { time: '12:30 - 14:00', subject: 'Pemrograman Web', teacher: 'Rudi Hermawan, S.Kom.' },
      ],
      friday: [
        { time: '07:00 - 07:30', subject: 'Keagamaan', teacher: '-' },
        { time: '07:30 - 09:00', subject: 'Pendidikan Agama', teacher: 'Ahmad Fauzi, S.Ag.' },
        { time: '09:00 - 09:15', subject: 'Istirahat', teacher: '-' },
        { time: '09:15 - 11:45', subject: 'Penjaskes', teacher: 'Dedi Kurniawan, S.Pd.' },
      ],
    }
  };

  const classOptions = ['XII RPL 1', 'XII RPL 2', 'XII RPL 3', 'XI RPL 1', 'XI RPL 2', 'X RPL 1'];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const dayNames = {
    monday: 'Senin',
    tuesday: 'Selasa',
    wednesday: 'Rabu',
    thursday: 'Kamis',
    friday: 'Jumat'
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Jadwal Pelajaran</h1>
                <p className="text-muted-foreground mt-1">Kelola jadwal pelajaran SMKN 1 Kendal</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Printer size={18} />
                  Cetak Jadwal
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus size={18} />
                  Buat Jadwal
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <CardTitle>Jadwal Pelajaran</CardTitle>
                  <div className="flex gap-2 items-center">
                    <Select onValueChange={setSelectedClass} value={selectedClass}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {classOptions.map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!selectedClass ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">Pilih Kelas</h3>
                    <p>Silahkan pilih kelas untuk melihat jadwal pelajaran</p>
                  </div>
                ) : (
                  <Tabs defaultValue="monday">
                    <TabsList className="mb-4 flex justify-between overflow-x-auto">
                      {days.map((day) => (
                        <TabsTrigger key={day} value={day} className="flex-1">
                          {dayNames[day as keyof typeof dayNames]}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {days.map((day) => (
                      <TabsContent key={day} value={day}>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="py-3 px-4 text-left font-medium">Jam</th>
                                <th className="py-3 px-4 text-left font-medium">Mata Pelajaran</th>
                                <th className="py-3 px-4 text-left font-medium">Guru</th>
                              </tr>
                            </thead>
                            <tbody>
                              {scheduleData[selectedClass as keyof typeof scheduleData]?.[day as keyof typeof scheduleData['XII RPL 1']]?.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-muted/50">
                                  <td className="py-3 px-4 whitespace-nowrap">{item.time}</td>
                                  <td className="py-3 px-4">
                                    <span className={item.subject === 'Istirahat' || item.subject === 'Ishoma' || item.subject === 'Upacara' || item.subject === 'Keagamaan' 
                                      ? 'text-muted-foreground italic' 
                                      : 'font-medium'}>
                                      {item.subject}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">{item.teacher}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
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

export default SchedulePage;
