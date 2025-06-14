
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CalendarCheck, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageTransition from '@/components/layout/PageTransition';

const attendanceData = [
  { date: "2023-11-15", status: "present", time: "06:55:23", subject: "Matematika" },
  { date: "2023-11-14", status: "present", time: "06:48:12", subject: "B. Indonesia" },
  { date: "2023-11-13", status: "late", time: "07:15:05", subject: "B. Inggris", reason: "Ban motor bocor" },
  { date: "2023-11-12", status: "present", time: "06:52:30", subject: "IPA" },
  { date: "2023-11-11", status: "present", time: "06:50:18", subject: "IPS" },
  { date: "2023-11-10", status: "absent", time: "-", subject: "PKN", reason: "Sakit demam" },
  { date: "2023-11-09", status: "present", time: "06:45:12", subject: "Agama" },
  { date: "2023-11-08", status: "present", time: "06:58:30", subject: "Matematika" },
];

const monthlyStats = {
  present: 22,
  absent: 2,
  sick: 1,
  permission: 1,
  late: 4,
  totalDays: 30
};

const ParentPortalAttendancePage = () => {
  const [selectedMonth, setSelectedMonth] = useState("november");
  const [selectedYear, setSelectedYear] = useState("2023");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'sick':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'permission':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'late':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present':
        return 'Hadir';
      case 'absent':
        return 'Absen';
      case 'sick':
        return 'Sakit';
      case 'permission':
        return 'Izin';
      case 'late':
        return 'Terlambat';
      default:
        return status;
    }
  };

  const attendancePercentage = Math.round((monthlyStats.present / monthlyStats.totalDays) * 100);

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Kehadiran Anak</h1>
            <p className="text-muted-foreground">
              Pantau kehadiran dan kedisiplinan anak di sekolah
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pilih Bulan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="november">November</SelectItem>
                <SelectItem value="oktober">Oktober</SelectItem>
                <SelectItem value="september">September</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Hadir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{monthlyStats.present}</div>
              <p className="text-xs text-muted-foreground">hari</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{monthlyStats.absent}</div>
              <p className="text-xs text-muted-foreground">hari</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sakit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{monthlyStats.sick}</div>
              <p className="text-xs text-muted-foreground">hari</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Izin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{monthlyStats.permission}</div>
              <p className="text-xs text-muted-foreground">hari</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Terlambat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{monthlyStats.late}</div>
              <p className="text-xs text-muted-foreground">kali</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Persentase Kehadiran
            </CardTitle>
            <CardDescription>
              Tingkat kehadiran bulan ini: {attendancePercentage}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={attendancePercentage} className="h-4 mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Kehadiran Harian</TabsTrigger>
            <TabsTrigger value="summary">Ringkasan Bulanan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Log Kehadiran Harian</CardTitle>
                <CardDescription>
                  Riwayat kehadiran anak per hari
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Waktu Masuk</TableHead>
                        <TableHead>Mata Pelajaran</TableHead>
                        <TableHead>Keterangan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {format(new Date(item.date), 'dd MMM yyyy')}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={getStatusColor(item.status)}
                            >
                              {getStatusLabel(item.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {item.time}
                            </div>
                          </TableCell>
                          <TableCell>{item.subject}</TableCell>
                          <TableCell>
                            {item.reason && (
                              <div className="flex items-center gap-1 text-amber-600">
                                <AlertCircle className="h-4 w-4" />
                                {item.reason}
                              </div>
                            )}
                            {!item.reason && '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tren Kehadiran</CardTitle>
                  <CardDescription>
                    Perbandingan 3 bulan terakhir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>November 2023</span>
                      <div className="flex items-center gap-2">
                        <Progress value={87} className="w-20 h-2" />
                        <span className="text-sm font-medium">87%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Oktober 2023</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20 h-2" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>September 2023</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-20 h-2" />
                        <span className="text-sm font-medium">95%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Catatan Penting</CardTitle>
                  <CardDescription>
                    Informasi tambahan tentang kehadiran
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Pencapaian Bagus</p>
                      <p className="text-xs text-green-600">Tidak pernah terlambat dalam 2 minggu terakhir</p>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">Perhatian</p>
                      <p className="text-xs text-amber-600">4 kali terlambat bulan ini, mohon perhatikan waktu keberangkatan</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Info</p>
                      <p className="text-xs text-blue-600">Target kehadiran minimal 85% untuk semester ini</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ParentPortalAttendancePage;
