
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, PieChart, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const StudentDataPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Data Siswa - Si-Kaji';
  }, []);

  const [selectedStudent, setSelectedStudent] = useState('1');
  const [selectedPeriod, setSelectedPeriod] = useState('semester1');

  // Sample academic data
  const academicData = [
    { subject: 'Matematika', midterm: 85, final: 88, average: 86.5 },
    { subject: 'B. Indonesia', midterm: 90, final: 92, average: 91 },
    { subject: 'B. Inggris', midterm: 78, final: 82, average: 80 },
    { subject: 'Fisika', midterm: 75, final: 80, average: 77.5 },
    { subject: 'Kimia', midterm: 82, final: 85, average: 83.5 },
    { subject: 'Biologi', midterm: 88, final: 85, average: 86.5 },
  ];

  // Sample attendance data
  const attendanceData = [
    { month: 'Jan', present: 20, late: 2, absent: 0 },
    { month: 'Feb', present: 18, late: 3, absent: 1 },
    { month: 'Mar', present: 21, late: 1, absent: 0 },
    { month: 'Apr', present: 19, late: 2, absent: 1 },
    { month: 'Mei', present: 22, late: 0, absent: 0 },
    { month: 'Jun', present: 16, late: 2, absent: 2 },
  ];

  // Sample discipline record data
  const disciplineData = [
    { id: 1, date: '2023-09-10', type: 'Pelanggaran', description: 'Terlambat masuk kelas', points: -5, status: 'Sudah Diberi Sanksi' },
    { id: 2, date: '2023-09-25', type: 'Prestasi', description: 'Juara 2 Lomba Debat', points: 20, status: 'Tercatat' },
    { id: 3, date: '2023-10-05', type: 'Pelanggaran', description: 'Tidak mengerjakan PR', points: -3, status: 'Sudah Diberi Sanksi' },
    { id: 4, date: '2023-10-15', type: 'Prestasi', description: 'Membantu guru membersihkan lab', points: 5, status: 'Tercatat' },
    { id: 5, date: '2023-11-02', type: 'Prestasi', description: 'Mewakili sekolah di olimpiade matematika', points: 15, status: 'Tercatat' },
  ];

  // Sample grade trend data
  const gradeTrendData = [
    { period: 'Semester 1-2022', average: 82 },
    { period: 'Semester 2-2022', average: 84 },
    { period: 'Semester 1-2023', average: 86 },
    { period: 'Semester 2-2023', average: 87 },
  ];

  // Sample students
  const students = [
    { id: '1', name: 'Andi Saputra', class: 'XII RPL 1' },
    { id: '2', name: 'Budi Santoso', class: 'XII RPL 1' },
    { id: '3', name: 'Cindy Permata', class: 'XII RPL 2' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Data Prestasi dan Presensi Siswa</h1>
              <p className="text-muted-foreground mt-1">Akses data akademik, kehadiran, dan catatan kedisiplinan siswa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Pilih Siswa</label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Siswa" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - {student.class}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Periode</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester1">Semester 1 - 2023/2024</SelectItem>
                    <SelectItem value="semester2">Semester 2 - 2022/2023</SelectItem>
                    <SelectItem value="semester3">Semester 1 - 2022/2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="academic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="academic">Akademik</TabsTrigger>
                <TabsTrigger value="attendance">Presensi</TabsTrigger>
                <TabsTrigger value="discipline">Kedisiplinan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="academic">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Nilai Rata-rata</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">86.5</div>
                      <p className="text-xs text-muted-foreground">
                        +2.5% dari semester sebelumnya
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Ranking Kelas</CardTitle>
                      <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        Dari 36 siswa
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Mata Pelajaran Terlemah</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Fisika</div>
                      <p className="text-xs text-muted-foreground">
                        Rata-rata: 77.5
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nilai Akademik</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left font-medium p-2">Mata Pelajaran</th>
                              <th className="text-center font-medium p-2">UTS</th>
                              <th className="text-center font-medium p-2">UAS</th>
                              <th className="text-center font-medium p-2">Rata-rata</th>
                            </tr>
                          </thead>
                          <tbody>
                            {academicData.map((item, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2">{item.subject}</td>
                                <td className="text-center p-2">{item.midterm}</td>
                                <td className="text-center p-2">{item.final}</td>
                                <td className="text-center p-2 font-medium">{item.average}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tren Nilai</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={gradeTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="period" />
                          <YAxis domain={[75, 90]} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="average" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="attendance">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Hadir</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">116</div>
                      <p className="text-xs text-muted-foreground">
                        Dari 124 hari efektif
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
                      <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">10</div>
                      <p className="text-xs text-muted-foreground">
                        8% dari total kehadiran
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tidak Hadir</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4</div>
                      <p className="text-xs text-muted-foreground">
                        3.2% dari total hari efektif
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Grafik Kehadiran</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={attendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="present" name="Hadir" fill="#4ade80" />
                        <Bar dataKey="late" name="Terlambat" fill="#facc15" />
                        <Bar dataKey="absent" name="Tidak Hadir" fill="#f87171" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discipline">
                <Card>
                  <CardHeader>
                    <CardTitle>Catatan Kedisiplinan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2">Tanggal</th>
                            <th className="text-left font-medium p-2">Jenis</th>
                            <th className="text-left font-medium p-2">Keterangan</th>
                            <th className="text-center font-medium p-2">Poin</th>
                            <th className="text-left font-medium p-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {disciplineData.map((item) => (
                            <tr key={item.id} className="border-b">
                              <td className="p-2">{item.date}</td>
                              <td className="p-2">
                                <Badge variant={item.type === 'Pelanggaran' ? 'destructive' : 'default'}>
                                  {item.type}
                                </Badge>
                              </td>
                              <td className="p-2">{item.description}</td>
                              <td className="text-center p-2 font-medium">
                                <span className={item.points < 0 ? 'text-destructive' : 'text-green-500'}>
                                  {item.points > 0 ? `+${item.points}` : item.points}
                                </span>
                              </td>
                              <td className="p-2">{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default StudentDataPage;
