
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, Printer } from 'lucide-react';

// Mock data for charts
const attendanceData = [
  { month: 'Jan', present: 92, absent: 8, late: 4 },
  { month: 'Feb', present: 88, absent: 12, late: 7 },
  { month: 'Mar', present: 95, absent: 5, late: 3 },
  { month: 'Apr', present: 90, absent: 10, late: 6 },
  { month: 'May', present: 93, absent: 7, late: 4 },
  { month: 'Jun', present: 91, absent: 9, late: 5 },
];

const disciplineData = [
  { month: 'Jan', violations: 12, achievements: 18 },
  { month: 'Feb', violations: 15, achievements: 22 },
  { month: 'Mar', violations: 8, achievements: 25 },
  { month: 'Apr', violations: 10, achievements: 20 },
  { month: 'May', violations: 6, achievements: 30 },
  { month: 'Jun', violations: 7, achievements: 28 },
];

const counselingData = [
  { name: 'Akademik', value: 35 },
  { name: 'Pribadi', value: 25 },
  { name: 'Sosial', value: 20 },
  { name: 'Karir', value: 15 },
  { name: 'Lainnya', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ReportsPage: React.FC = () => {
  const [period, setPeriod] = useState('semester1');
  const [academicYear, setAcademicYear] = useState('2023-2024');
  const [classFilter, setClassFilter] = useState('all');

  return (
    <DashboardLayout 
      title="Laporan & Statistik"
      description="Analisis data dan laporan statistik sekolah"
      userRole="admin"
      userName="Administrator"
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Filter Laporan</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Printer size={16} />
                  <span>Cetak</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download size={16} />
                  <span>Ekspor</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-auto">
                <label className="text-sm font-medium mb-1 block">Tahun Ajaran</label>
                <Select value={academicYear} onValueChange={setAcademicYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Tahun Ajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022-2023">2022/2023</SelectItem>
                    <SelectItem value="2023-2024">2023/2024</SelectItem>
                    <SelectItem value="2024-2025">2024/2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto">
                <label className="text-sm font-medium mb-1 block">Periode</label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester1">Semester 1</SelectItem>
                    <SelectItem value="semester2">Semester 2</SelectItem>
                    <SelectItem value="full-year">Setahun Penuh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto">
                <label className="text-sm font-medium mb-1 block">Kelas</label>
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pilih Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kelas</SelectItem>
                    <SelectItem value="X-RPL-1">X RPL 1</SelectItem>
                    <SelectItem value="X-RPL-2">X RPL 2</SelectItem>
                    <SelectItem value="XI-RPL-1">XI RPL 1</SelectItem>
                    <SelectItem value="XI-RPL-2">XI RPL 2</SelectItem>
                    <SelectItem value="XII-RPL-1">XII RPL 1</SelectItem>
                    <SelectItem value="XII-RPL-2">XII RPL 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-auto self-end">
                <Button className="gap-1">
                  <Filter size={16} />
                  <span>Terapkan Filter</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for different reports */}
        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 lg:w-[800px]">
            <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
            <TabsTrigger value="discipline">Pelanggaran & Prestasi</TabsTrigger>
            <TabsTrigger value="counseling">Konseling</TabsTrigger>
            <TabsTrigger value="summary">Ringkasan</TabsTrigger>
          </TabsList>
          
          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Kehadiran Siswa</CardTitle>
                <CardDescription>
                  Persentase kehadiran, ketidakhadiran, dan keterlambatan siswa
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="present" name="Hadir" fill="#4ade80" />
                      <Bar dataKey="absent" name="Tidak Hadir" fill="#f87171" />
                      <Bar dataKey="late" name="Terlambat" fill="#facc15" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rata-rata Kehadiran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">91.5%</div>
                  <p className="text-sm text-muted-foreground mt-1">+2.5% dari semester sebelumnya</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rata-rata Ketidakhadiran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">8.5%</div>
                  <p className="text-sm text-muted-foreground mt-1">-2.5% dari semester sebelumnya</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rata-rata Keterlambatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-500">4.8%</div>
                  <p className="text-sm text-muted-foreground mt-1">-1.2% dari semester sebelumnya</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Discipline Tab */}
          <TabsContent value="discipline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Pelanggaran & Prestasi</CardTitle>
                <CardDescription>
                  Jumlah pelanggaran dan prestasi siswa per bulan
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={disciplineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="violations" name="Pelanggaran" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="achievements" name="Prestasi" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Pelanggaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">58</div>
                  <p className="text-sm text-muted-foreground mt-1">-15% dari semester sebelumnya</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Prestasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500">143</div>
                  <p className="text-sm text-muted-foreground mt-1">+22% dari semester sebelumnya</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Counseling Tab */}
          <TabsContent value="counseling" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Konseling</CardTitle>
                <CardDescription>
                  Kategori konseling yang diakses oleh siswa
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[400px] w-full flex justify-center">
                  <ResponsiveContainer width="80%" height="100%">
                    <PieChart>
                      <Pie
                        data={counselingData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {counselingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} sesi`, 'Jumlah']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Sesi Konseling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">100</div>
                  <p className="text-sm text-muted-foreground mt-1">+15% dari semester sebelumnya</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Kategori Terbanyak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-500">Akademik</div>
                  <p className="text-sm text-muted-foreground mt-1">35% dari total sesi</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rata-rata Sesi per Siswa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2.5</div>
                  <p className="text-sm text-muted-foreground mt-1">+0.5 dari semester sebelumnya</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Statistik Sekolah</CardTitle>
                <CardDescription>
                  Laporan komprehensif kinerja sekolah
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">Statistik Siswa</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Total Siswa</span>
                        <span className="text-2xl font-bold">1,245</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Rasio Kelulusan</span>
                        <span className="text-2xl font-bold text-green-500">98.5%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Kehadiran Rata-rata</span>
                        <span className="text-2xl font-bold text-green-500">92.3%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Prestasi Akademik</span>
                        <span className="text-2xl font-bold text-blue-500">86</span>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-lg mt-4">Statistik Guru</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Total Guru</span>
                        <span className="text-2xl font-bold">78</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Rasio Guru:Siswa</span>
                        <span className="text-2xl font-bold">1:16</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Kehadiran Guru</span>
                        <span className="text-2xl font-bold text-green-500">98.1%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Sertifikasi</span>
                        <span className="text-2xl font-bold text-blue-500">92%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg">Statistik Akademik</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Rata-rata Nilai</span>
                        <span className="text-2xl font-bold text-blue-500">82.6</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Tingkat Kelulusan</span>
                        <span className="text-2xl font-bold text-green-500">99.8%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Prestasi Non-Akademik</span>
                        <span className="text-2xl font-bold text-blue-500">57</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Siswa Berprestasi</span>
                        <span className="text-2xl font-bold">245</span>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-lg mt-4">Statistik Kedisiplinan</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Total Pelanggaran</span>
                        <span className="text-2xl font-bold text-red-500">58</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Kasus Selesai</span>
                        <span className="text-2xl font-bold text-green-500">53</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Pengaduan Masuk</span>
                        <span className="text-2xl font-bold">42</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Tingkat Resolusi</span>
                        <span className="text-2xl font-bold text-green-500">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
