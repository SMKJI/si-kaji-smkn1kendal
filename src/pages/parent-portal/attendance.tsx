
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Calendar, ArrowRight, Clock, FileText } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

const attendanceData = [
  { name: 'Hadir', value: 58, color: '#4CAF50' },
  { name: 'Izin', value: 3, color: '#2196F3' },
  { name: 'Sakit', value: 5, color: '#FFC107' },
  { name: 'Terlambat', value: 8, color: '#FF9800' },
  { name: 'Alpha', value: 2, color: '#F44336' },
];

const monthlyAttendance = [
  { month: 'Jul', hadir: 18, izin: 0, sakit: 2, alpha: 0, terlambat: 2 },
  { month: 'Agt', hadir: 20, izin: 1, sakit: 1, alpha: 0, terlambat: 2 },
  { month: 'Sep', hadir: 20, izin: 2, sakit: 2, alpha: 2, terlambat: 4 },
];

const attendanceHistory = [
  { date: '2023-11-27', status: 'Hadir', time: '06:55:23', note: '-' },
  { date: '2023-11-24', status: 'Hadir', time: '06:48:37', note: '-' },
  { date: '2023-11-23', status: 'Terlambat', time: '07:16:42', note: 'Bangun kesiangan' },
  { date: '2023-11-22', status: 'Hadir', time: '06:51:15', note: '-' },
  { date: '2023-11-21', status: 'Hadir', time: '06:49:03', note: '-' },
  { date: '2023-11-20', status: 'Sakit', time: '-', note: 'Demam, surat dokter terlampir' },
  { date: '2023-11-17', status: 'Hadir', time: '06:53:11', note: '-' },
  { date: '2023-11-16', status: 'Izin', time: '-', note: 'Acara keluarga' },
  { date: '2023-11-15', status: 'Hadir', time: '06:58:40', note: '-' },
  { date: '2023-11-14', status: 'Hadir', time: '06:47:22', note: '-' },
];

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF9800', '#F44336'];

const ParentPortalAttendancePage = () => {
  const [searchDate, setSearchDate] = useState(format(new Date(), 'yyyy-MM'));
  
  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Hadir':
        return 'bg-green-100 text-green-800';
      case 'Izin':
        return 'bg-blue-100 text-blue-800';
      case 'Sakit':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terlambat':
        return 'bg-orange-100 text-orange-800';
      case 'Alpha':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Kehadiran Anak</h1>
            <p className="text-muted-foreground">
              Pantau riwayat kehadiran anak di sekolah
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Input
              type="month"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-[180px]"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Cari
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4 w-full md:w-auto">
              <TabsTrigger value="overview">Ringkasan</TabsTrigger>
              <TabsTrigger value="history">Riwayat Kehadiran</TabsTrigger>
              <TabsTrigger value="report">Laporan Kehadiran</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ringkasan Kehadiran</CardTitle>
                    <CardDescription>
                      Semester 1 - Tahun Ajaran 2023/2024
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={attendanceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {attendanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value} hari`, name]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                      {attendanceData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm">{item.name}: {item.value} hari</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tren Kehadiran Bulanan</CardTitle>
                    <CardDescription>
                      3 bulan terakhir
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={monthlyAttendance}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="hadir" name="Hadir" stackId="a" fill="#4CAF50" />
                          <Bar dataKey="izin" name="Izin" stackId="a" fill="#2196F3" />
                          <Bar dataKey="sakit" name="Sakit" stackId="a" fill="#FFC107" />
                          <Bar dataKey="terlambat" name="Terlambat" stackId="a" fill="#FF9800" />
                          <Bar dataKey="alpha" name="Alpha" stackId="a" fill="#F44336" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Kehadiran
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">76</span>
                      <span className="text-sm text-muted-foreground">Dari 90 hari</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Keterlambatan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">8</span>
                      <span className="text-sm text-muted-foreground">Keterlambatan</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Izin
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">3</span>
                      <span className="text-sm text-muted-foreground">Perizinan</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center text-red-600">
                      Alpha
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold">2</span>
                      <span className="text-sm text-muted-foreground">Tanpa keterangan</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Riwayat Kehadiran November 2023</CardTitle>
                  <CardDescription>
                    Detail kehadiran harian
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Tanggal</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Waktu Hadir</th>
                          <th className="text-left py-3 px-4">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceHistory.map((item, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              {format(new Date(item.date), 'EEEE, dd MMM yyyy')}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">{item.time}</td>
                            <td className="py-3 px-4">{item.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="report" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Kehadiran</CardTitle>
                  <CardDescription>
                    Unduh laporan periode tertentu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium mb-2">Laporan Semester 1</h3>
                      <p className="text-sm text-muted-foreground mb-4">Tahun Ajaran 2023/2024</p>
                      <Button variant="outline" className="w-full">
                        Unduh PDF <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium mb-2">Laporan Bulan Oktober</h3>
                      <p className="text-sm text-muted-foreground mb-4">1 - 31 Oktober 2023</p>
                      <Button variant="outline" className="w-full">
                        Unduh PDF <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium mb-2">Laporan Bulan November</h3>
                      <p className="text-sm text-muted-foreground mb-4">1 - 30 November 2023</p>
                      <Button variant="outline" className="w-full">
                        Unduh PDF <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default ParentPortalAttendancePage;
