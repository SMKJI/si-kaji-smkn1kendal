
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Check, X, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AttendancePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Kehadiran - Si-Kaji';
  }, []);

  // Sample attendance data
  const attendanceData = [
    { date: '1 Agustus 2023', day: 'Senin', status: 'present', info: 'Tepat Waktu' },
    { date: '2 Agustus 2023', day: 'Selasa', status: 'present', info: 'Tepat Waktu' },
    { date: '3 Agustus 2023', day: 'Rabu', status: 'late', info: 'Terlambat 15 menit' },
    { date: '4 Agustus 2023', day: 'Kamis', status: 'present', info: 'Tepat Waktu' },
    { date: '5 Agustus 2023', day: 'Jumat', status: 'absent', info: 'Sakit (Dengan Surat)' },
    { date: '8 Agustus 2023', day: 'Senin', status: 'present', info: 'Tepat Waktu' },
    { date: '9 Agustus 2023', day: 'Selasa', status: 'permission', info: 'Izin Keluarga' },
    { date: '10 Agustus 2023', day: 'Rabu', status: 'present', info: 'Tepat Waktu' },
  ];

  // Summary data
  const summary = {
    present: 5,
    late: 1,
    absent: 1,
    permission: 1,
    total: 8,
    percentage: 87.5, // (present + late + permission) / total * 100
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return <Badge className="bg-green-500 flex items-center"><Check size={14} className="mr-1" /> Hadir</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500 flex items-center"><AlertTriangle size={14} className="mr-1" /> Terlambat</Badge>;
      case 'absent':
        return <Badge className="bg-red-500 flex items-center"><X size={14} className="mr-1" /> Tidak Hadir</Badge>;
      case 'permission':
        return <Badge className="bg-blue-500 flex items-center">Izin</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout 
      title="Kehadiran" 
      description="Pantau rekap kehadiran siswa" 
      showBackButton
      backTo="/dashboard"
    >
      <Tabs defaultValue="history" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="history">Riwayat Kehadiran</TabsTrigger>
          <TabsTrigger value="summary">Ringkasan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <Card>
            <CardHeader className="pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <CardTitle>Riwayat Kehadiran</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari tanggal..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Tanggal</th>
                      <th className="py-3 px-4 text-left font-medium">Hari</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{record.date}</td>
                        <td className="py-3 px-4">{record.day}</td>
                        <td className="py-3 px-4">{getStatusBadge(record.status)}</td>
                        <td className="py-3 px-4">{record.info}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Ringkasan Kehadiran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Total Hari Efektif:</dt>
                    <dd className="font-medium">{summary.total} hari</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Hadir:</dt>
                    <dd className="font-medium text-green-600">{summary.present} hari</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Terlambat:</dt>
                    <dd className="font-medium text-yellow-600">{summary.late} hari</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Izin:</dt>
                    <dd className="font-medium text-blue-600">{summary.permission} hari</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Tidak Hadir:</dt>
                    <dd className="font-medium text-red-600">{summary.absent} hari</dd>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <dt className="font-medium">Persentase Kehadiran:</dt>
                      <dd className="font-bold text-lg text-primary">{summary.percentage}%</dd>
                    </div>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Statistik Kehadiran</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* This would be a Chart component in a real implementation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{summary.percentage}%</span>
                  </div>
                  {/* Placeholder for chart - in a real app, use Recharts or similar */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="10" 
                      strokeDasharray={`${summary.percentage * 2.51} 251`} 
                      strokeDashoffset="0" 
                      transform="rotate(-90 50 50)" 
                    />
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Hadir: {(summary.present / summary.total * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Terlambat: {(summary.late / summary.total * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Izin: {(summary.permission / summary.total * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Absen: {(summary.absent / summary.total * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AttendancePage;
