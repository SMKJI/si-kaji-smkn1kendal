
import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Download, Calendar, Clock, UserCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const AuditPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock audit log data
  const auditLogs = [
    { id: 1, action: 'Login', user: 'admin@smkn1kendal.sch.id', timestamp: '2023-06-25 14:32:45', ip: '192.168.1.1', status: 'success' },
    { id: 2, action: 'Tambah Pengguna', user: 'admin@smkn1kendal.sch.id', timestamp: '2023-06-25 14:12:33', ip: '192.168.1.1', status: 'success' },
    { id: 3, action: 'Update Pengaturan', user: 'admin@smkn1kendal.sch.id', timestamp: '2023-06-25 13:45:12', ip: '192.168.1.1', status: 'success' },
    { id: 4, action: 'Login Gagal', user: 'kepsek@smkn1kendal.sch.id', timestamp: '2023-06-25 13:32:45', ip: '192.168.1.2', status: 'failed' },
    { id: 5, action: 'Reset Password', user: 'kesiswaan@smkn1kendal.sch.id', timestamp: '2023-06-25 12:22:11', ip: '192.168.1.3', status: 'success' },
    { id: 6, action: 'Backup Database', user: 'sistem', timestamp: '2023-06-25 00:05:00', ip: '127.0.0.1', status: 'success' },
    { id: 7, action: 'Hapus Pengguna', user: 'admin@smkn1kendal.sch.id', timestamp: '2023-06-24 16:18:22', ip: '192.168.1.1', status: 'success' },
    { id: 8, action: 'Tambah Role', user: 'admin@smkn1kendal.sch.id', timestamp: '2023-06-24 15:42:10', ip: '192.168.1.1', status: 'success' },
  ];

  const filteredLogs = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportReport = () => {
    toast({
      title: "Ekspor laporan",
      description: "Laporan audit log berhasil diekspor",
    });
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'success' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/admin" className="text-muted-foreground hover:text-primary inline-flex items-center mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Kembali ke Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold">Audit Log & Laporan</h1>
            <p className="text-muted-foreground mt-1">Lihat histori aktivitas dan ekspor laporan</p>
          </div>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" /> Ekspor Laporan
          </Button>
        </div>

        {/* Filters and Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="col-span-1 lg:col-span-4">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari aktivitas..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Tanggal Mulai</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Tanggal Akhir</label>
                    <Input type="date" />
                  </div>
                  <Button className="self-end w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Aktivitas
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription className="text-2xl font-bold mt-2">
                {auditLogs.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-3 pt-0">
              <div className="text-xs text-muted-foreground">
                Seluruh log aktivitas sistem
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Aktivitas Hari Ini
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription className="text-2xl font-bold mt-2">
                6
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-3 pt-0">
              <div className="text-xs text-muted-foreground">
                Log aktivitas hari ini
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pengguna Aktif
                </CardTitle>
                <UserCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription className="text-2xl font-bold mt-2">
                3
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-3 pt-0">
              <div className="text-xs text-muted-foreground">
                Berbeda pengguna aktif hari ini
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Aktivitas Terakhir
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription className="text-2xl font-bold mt-2">
                14:32:45
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-3 pt-0">
              <div className="text-xs text-muted-foreground">
                Waktu aktivitas terakhir
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Log Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Log Aktivitas Sistem</CardTitle>
            <CardDescription>
              Catatan lengkap aktivitas sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">ID</th>
                      <th className="px-4 py-3 text-left font-medium">Waktu</th>
                      <th className="px-4 py-3 text-left font-medium">Aktivitas</th>
                      <th className="px-4 py-3 text-left font-medium">Pengguna</th>
                      <th className="px-4 py-3 text-left font-medium">IP Address</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3">{log.id}</td>
                        <td className="px-4 py-3">{log.timestamp}</td>
                        <td className="px-4 py-3 font-medium">{log.action}</td>
                        <td className="px-4 py-3">{log.user}</td>
                        <td className="px-4 py-3">{log.ip}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLogs.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  Tidak ada log aktivitas yang ditemukan
                </div>
              )}
            </div>

            {/* Simple Pagination */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Menampilkan 1-8 dari 24 entri
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AuditPage;
