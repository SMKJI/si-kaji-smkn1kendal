
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Search, UserCheck, UserX, Calendar, Phone, Mail } from 'lucide-react';

const TeacherClassManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('XI-RPL-1');

  // Mock class data
  const classData = {
    'XI-RPL-1': {
      name: 'XI RPL 1',
      total: 32,
      present: 28,
      absent: 4,
      students: [
        { id: 1, name: 'Ahmad Rizki', nis: '20240001', status: 'present', phone: '081234567890', email: 'ahmad@student.sch.id' },
        { id: 2, name: 'Siti Nurhaliza', nis: '20240002', status: 'present', phone: '081234567891', email: 'siti@student.sch.id' },
        { id: 3, name: 'Budi Santoso', nis: '20240003', status: 'absent', phone: '081234567892', email: 'budi@student.sch.id' },
        { id: 4, name: 'Dewi Sartika', nis: '20240004', status: 'present', phone: '081234567893', email: 'dewi@student.sch.id' },
        { id: 5, name: 'Joni Iskandar', nis: '20240005', status: 'absent', phone: '081234567894', email: 'joni@student.sch.id' },
        { id: 6, name: 'Linda Sari', nis: '20240006', status: 'present', phone: '081234567895', email: 'linda@student.sch.id' }
      ]
    },
    'XI-RPL-2': {
      name: 'XI RPL 2',
      total: 30,
      present: 27,
      absent: 3,
      students: [
        { id: 7, name: 'Rahman Hidayat', nis: '20240007', status: 'present', phone: '081234567896', email: 'rahman@student.sch.id' },
        { id: 8, name: 'Maya Sari', nis: '20240008', status: 'present', phone: '081234567897', email: 'maya@student.sch.id' },
        { id: 9, name: 'Fajar Nugroho', nis: '20240009', status: 'absent', phone: '081234567898', email: 'fajar@student.sch.id' }
      ]
    }
  };

  const currentClass = classData[selectedClass as keyof typeof classData];
  
  const filteredStudents = currentClass.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nis.includes(searchTerm)
  );

  return (
    <DashboardLayout
      title="Manajemen Kelas"
      description="Kelola data siswa dan kehadiran kelas"
      userRole="teacher"
    >
      <div className="space-y-6">
        {/* Class Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Pilih Kelas</CardTitle>
            <CardDescription>Pilih kelas yang akan dikelola</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {Object.keys(classData).map((classKey) => (
                <Button
                  key={classKey}
                  variant={selectedClass === classKey ? "default" : "outline"}
                  onClick={() => setSelectedClass(classKey)}
                >
                  {classData[classKey as keyof typeof classData].name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentClass.total}</div>
              <p className="text-sm text-muted-foreground">siswa terdaftar</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hadir Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{currentClass.present}</div>
              <p className="text-sm text-muted-foreground">siswa hadir</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tidak Hadir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{currentClass.absent}</div>
              <p className="text-sm text-muted-foreground">siswa tidak hadir</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Kehadiran</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((currentClass.present / currentClass.total) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">kehadiran hari ini</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Daftar Siswa - {currentClass.name}
            </CardTitle>
            <CardDescription>Kelola data dan kehadiran siswa</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari siswa berdasarkan nama atau NIS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Presensi
              </Button>
            </div>

            {/* Student List */}
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {student.status === 'present' ? (
                          <UserCheck className="h-5 w-5 text-green-600" />
                        ) : (
                          <UserX className="h-5 w-5 text-red-600" />
                        )}
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">NIS: {student.nis}</div>
                        </div>
                      </div>
                      <Badge variant={student.status === 'present' ? 'default' : 'destructive'}>
                        {student.status === 'present' ? 'Hadir' : 'Tidak Hadir'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {student.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {student.email}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada siswa yang ditemukan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherClassManagementPage;
