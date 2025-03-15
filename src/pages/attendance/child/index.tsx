
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Check, X, AlertTriangle, Filter, Download, ArrowUpDown, UserRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChildAttendancePage = () => {
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentChild, setCurrentChild] = useState<string>('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Kehadiran Anak - Si-Kaji';
  }, []);

  // Sample children data
  const children = [
    { id: '1', name: 'Ahmad Fauzi', class: 'XI IPA 2', photoUrl: '' },
    { id: '2', name: 'Putri Ananda', class: 'IX A', photoUrl: '' },
  ];

  // Sample attendance data for each child
  const attendanceData = {
    '1': [
      { date: '1 Agustus 2023', day: 'Senin', status: 'present', info: 'Tepat Waktu' },
      { date: '2 Agustus 2023', day: 'Selasa', status: 'present', info: 'Tepat Waktu' },
      { date: '3 Agustus 2023', day: 'Rabu', status: 'late', info: 'Terlambat 15 menit' },
      { date: '4 Agustus 2023', day: 'Kamis', status: 'present', info: 'Tepat Waktu' },
      { date: '5 Agustus 2023', day: 'Jumat', status: 'absent', info: 'Sakit (Dengan Surat)' },
      { date: '8 Agustus 2023', day: 'Senin', status: 'present', info: 'Tepat Waktu' },
      { date: '9 Agustus 2023', day: 'Selasa', status: 'permission', info: 'Izin Keluarga' },
      { date: '10 Agustus 2023', day: 'Rabu', status: 'present', info: 'Tepat Waktu' },
    ],
    '2': [
      { date: '1 Agustus 2023', day: 'Senin', status: 'present', info: 'Tepat Waktu' },
      { date: '2 Agustus 2023', day: 'Selasa', status: 'present', info: 'Tepat Waktu' },
      { date: '3 Agustus 2023', day: 'Rabu', status: 'present', info: 'Tepat Waktu' },
      { date: '4 Agustus 2023', day: 'Kamis', status: 'absent', info: 'Tanpa Keterangan' },
      { date: '5 Agustus 2023', day: 'Jumat', status: 'present', info: 'Tepat Waktu' },
      { date: '8 Agustus 2023', day: 'Senin', status: 'late', info: 'Terlambat 10 menit' },
      { date: '9 Agustus 2023', day: 'Selasa', status: 'late', info: 'Terlambat 5 menit' },
      { date: '10 Agustus 2023', day: 'Rabu', status: 'present', info: 'Tepat Waktu' },
    ],
    'all': []
  };

  // Combine all attendance data when 'all' is selected
  useEffect(() => {
    if (currentChild === 'all') {
      const allAttendance = children.flatMap((child) => 
        attendanceData[child.id].map(record => ({
          ...record,
          childName: child.name,
          childClass: child.class
        }))
      );
      attendanceData.all = allAttendance;
    }
  }, [currentChild]);

  // Filtered data based on search and child selection
  const currentAttendanceData = currentChild === 'all' ? attendanceData.all : attendanceData[currentChild] || [];
  
  const filteredData = currentAttendanceData.filter(record => 
    record.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.info.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (currentChild === 'all' && 'childName' in record && record.childName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Generate summary data for current child
  const generateSummary = (childId: string) => {
    const data = childId === 'all' 
      ? Object.values(attendanceData).flat().filter(item => Array.isArray(item)) 
      : attendanceData[childId];
    
    if (!data || data.length === 0) return null;
    
    const present = data.filter(item => item.status === 'present').length;
    const late = data.filter(item => item.status === 'late').length;
    const absent = data.filter(item => item.status === 'absent').length;
    const permission = data.filter(item => item.status === 'permission').length;
    const total = data.length;
    const percentage = ((present + late + permission) / total * 100).toFixed(1);
    
    return {
      present,
      late,
      absent,
      permission,
      total,
      percentage: parseFloat(percentage)
    };
  };

  const summary = generateSummary(currentChild) || {
    present: 0,
    late: 0,
    absent: 0,
    permission: 0,
    total: 0,
    percentage: 0
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
    <PageTransition>
      <DashboardLayout 
        title="Kehadiran Anak" 
        description="Pantau rekap kehadiran anak Anda" 
        showBackButton
        backTo="/parent-portal/dashboard"
        userRole="parent"
        userName="Orang Tua"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Pilih Anak:</h2>
          </div>
          
          <Select 
            value={currentChild} 
            onValueChange={setCurrentChild}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Pilih anak" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Anak</SelectItem>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name} - {child.class}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="history" className="w-full mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-2 mb-0">
              <TabsTrigger value="history">Riwayat Kehadiran</TabsTrigger>
              <TabsTrigger value="summary">Ringkasan</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="gap-1">
                <Download size={14} />
                <span className="hidden sm:inline">Unduh Laporan</span>
              </Button>
            </div>
          </div>
          
          <TabsContent value="history">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <CardTitle>Riwayat Kehadiran</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Cari tanggal..." 
                        className="pl-8" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="w-full sm:w-auto">
                      <Select 
                        value={filterMonth} 
                        onValueChange={setFilterMonth}
                      >
                        <SelectTrigger className="w-full sm:w-[120px]">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Bulan</SelectItem>
                          <SelectItem value="january">Januari</SelectItem>
                          <SelectItem value="february">Februari</SelectItem>
                          <SelectItem value="march">Maret</SelectItem>
                          <SelectItem value="april">April</SelectItem>
                          <SelectItem value="may">Mei</SelectItem>
                          <SelectItem value="june">Juni</SelectItem>
                          <SelectItem value="july">Juli</SelectItem>
                          <SelectItem value="august">Agustus</SelectItem>
                          <SelectItem value="september">September</SelectItem>
                          <SelectItem value="october">Oktober</SelectItem>
                          <SelectItem value="november">November</SelectItem>
                          <SelectItem value="december">Desember</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {currentChild === 'all' && <TableHead>Nama</TableHead>}
                        {currentChild === 'all' && <TableHead>Kelas</TableHead>}
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Hari</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Keterangan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((record, index) => (
                          <TableRow key={index}>
                            {currentChild === 'all' && <TableCell>{'childName' in record ? record.childName : ''}</TableCell>}
                            {currentChild === 'all' && <TableCell>{'childClass' in record ? record.childClass : ''}</TableCell>}
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.day}</TableCell>
                            <TableCell>{getStatusBadge(record.status)}</TableCell>
                            <TableCell>{record.info}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={currentChild === 'all' ? 6 : 4} className="py-6 text-center text-muted-foreground">
                            Tidak ada data kehadiran yang sesuai dengan pencarian
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
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
                  {currentChild !== 'all' ? (
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
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center py-3 bg-muted/20 rounded-md">
                        <p className="text-muted-foreground">Silakan pilih salah satu anak untuk melihat ringkasan kehadiran.</p>
                      </div>
                      
                      <div className="space-y-4 mt-4">
                        {children.map(child => {
                          const childSummary = generateSummary(child.id);
                          if (!childSummary) return null;
                          
                          return (
                            <div key={child.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{child.name}</p>
                                  <p className="text-sm text-muted-foreground">{child.class}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-primary">{childSummary.percentage}%</p>
                                <p className="text-sm text-muted-foreground">kehadiran</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {currentChild !== 'all' && (
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
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DashboardLayout>
    </PageTransition>
  );
};

export default ChildAttendancePage;
