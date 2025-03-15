
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CalendarCheck, FileText, Users, Shield, Award, FileEdit, Search, Book, Bell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TeacherDashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard Guru - Si-Kaji';
  }, []);

  const [classFilter, setClassFilter] = useState('all');
  
  // Mock data for teacher
  const teacherData = {
    name: "Budi Santoso, S.Pd.",
    subject: "Bahasa Indonesia",
    nip: "198705132008011003",
    classes: [
      { id: 1, name: "X RPL 1", students: 36, absent: 2 },
      { id: 2, name: "X RPL 2", students: 35, absent: 0 },
      { id: 3, name: "XI RPL 1", students: 32, absent: 1 }
    ],
    scheduleToday: [
      { id: 1, class: "X RPL 1", time: "07:00 - 08:30", room: "R.31" },
      { id: 2, class: "XI RPL 1", time: "10:15 - 11:45", room: "R.25" }
    ]
  };

  return (
    <DashboardLayout
      title={`Selamat Datang, ${teacherData.name}`}
      description={`${teacherData.subject} | NIP: ${teacherData.nip}`}
      userRole="teacher"
      userName={teacherData.name}
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <Link to="/attendance">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-1 text-xs">
              <CalendarCheck className="h-6 w-6" />
              <span>Presensi</span>
            </Button>
          </Link>
          
          <Link to="/class-journal/create">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-1 text-xs">
              <FileEdit className="h-6 w-6" />
              <span>Jurnal Kelas</span>
            </Button>
          </Link>
          
          <Link to="/discipline/record">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-1 text-xs">
              <Shield className="h-6 w-6" />
              <span>Pelanggaran</span>
            </Button>
          </Link>
          
          <Link to="/achievements/create">
            <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-1 text-xs">
              <Award className="h-6 w-6" />
              <span>Prestasi</span>
            </Button>
          </Link>
        </div>

        {/* Schedule and Classes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Jadwal Hari Ini</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {teacherData.scheduleToday.length > 0 ? (
                <div className="space-y-4">
                  {teacherData.scheduleToday.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h3 className="font-medium">{schedule.class}</h3>
                        <p className="text-sm text-muted-foreground">{schedule.time}</p>
                        <p className="text-sm text-muted-foreground">Ruang {schedule.room}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/attendance?class=${schedule.class}`}>
                          <Button size="sm" variant="outline">Presensi</Button>
                        </Link>
                        <Link to={`/class-journal/create?class=${schedule.class}`}>
                          <Button size="sm" variant="outline">Jurnal</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Tidak ada jadwal mengajar hari ini</p>
              )}
            </CardContent>
          </Card>
          
          {/* My Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Kelas Saya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherData.classes.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{cls.name}</h3>
                      <p className="text-sm text-muted-foreground">{cls.students} siswa</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {cls.absent > 0 && (
                        <Badge variant="destructive">{cls.absent} tidak hadir</Badge>
                      )}
                      <Link to={`/class/${cls.id}`}>
                        <Button size="sm">Detail</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Student Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Manajemen Siswa</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari siswa..." className="pl-10" />
              </div>
              <div className="w-full md:w-48">
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kelas</SelectItem>
                    <SelectItem value="X RPL 1">X RPL 1</SelectItem>
                    <SelectItem value="X RPL 2">X RPL 2</SelectItem>
                    <SelectItem value="XI RPL 1">XI RPL 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Student list would go here */}
            <div className="text-center py-8 text-muted-foreground">
              <p>Pilih kelas untuk melihat daftar siswa</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboardPage;
