
import React from 'react';
import { ArrowLeft, Save, RefreshCw, Bell, Shield, Database, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const SystemConfig = () => {
  const { toast } = useToast();

  const handleSaveConfig = () => {
    toast({
      title: "Konfigurasi disimpan",
      description: "Perubahan konfigurasi berhasil disimpan",
    });
  };

  const handleBackupNow = () => {
    toast({
      title: "Backup dimulai",
      description: "Proses backup database sedang berjalan",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Link to="/admin" className="text-muted-foreground hover:text-primary inline-flex items-center mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span className="text-sm">Kembali ke Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold">Konfigurasi Sistem</h1>
          <p className="text-muted-foreground mt-1">Atur notifikasi, backup, dan parameter sistem</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Pengaturan Notifikasi</CardTitle>
              </div>
              <CardDescription>
                Konfigurasi bagaimana notifikasi dikirim dan ditampilkan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-notifications">Email Notifikasi</Label>
                <Input
                  id="email-notifications"
                  type="email"
                  placeholder="admin@smkn1kendal.sch.id"
                  defaultValue="admin@smkn1kendal.sch.id"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Frekuensi Notifikasi</Label>
                  <select
                    id="notification-frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="realtime"
                  >
                    <option value="realtime">Realtime</option>
                    <option value="hourly">Per Jam</option>
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-type">Jenis Notifikasi</Label>
                  <select
                    id="notification-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="all"
                  >
                    <option value="all">Semua</option>
                    <option value="security">Keamanan</option>
                    <option value="system">Sistem</option>
                    <option value="users">Pengguna</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig}>
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Pengaturan Keamanan</CardTitle>
              </div>
              <CardDescription>
                Konfigurasi parameter keamanan sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Batas Waktu Sesi (menit)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  min="1"
                  max="1440"
                  defaultValue="60"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Masa Berlaku Password (hari)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    min="0"
                    max="365"
                    defaultValue="90"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="failed-attempts">Batas Percobaan Login</Label>
                  <Input
                    id="failed-attempts"
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="5"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="security-level">Tingkat Keamanan</Label>
                <select
                  id="security-level"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue="high"
                >
                  <option value="standard">Standar</option>
                  <option value="high">Tinggi</option>
                  <option value="maximum">Maksimum</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig}>
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>

          {/* Backup & Recovery */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Backup & Pemulihan</CardTitle>
              </div>
              <CardDescription>
                Konfigurasi jadwal backup dan pengaturan pemulihan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Frekuensi Backup</Label>
                <select
                  id="backup-frequency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue="daily"
                >
                  <option value="hourly">Per Jam</option>
                  <option value="daily">Harian</option>
                  <option value="weekly">Mingguan</option>
                  <option value="monthly">Bulanan</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-time">Waktu Backup</Label>
                <Input
                  id="backup-time"
                  type="time"
                  defaultValue="00:00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Retensi Backup (hari)</Label>
                <Input
                  id="backup-retention"
                  type="number"
                  min="1"
                  max="365"
                  defaultValue="30"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Backup Terakhir</Label>
                <div className="text-sm text-muted-foreground">
                  24 Juni 2023, 00:05:12
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleSaveConfig}>
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan
              </Button>
              <Button variant="outline" onClick={handleBackupNow}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Backup Sekarang
              </Button>
            </CardFooter>
          </Card>

          {/* System Parameters */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Parameter Sistem</CardTitle>
              </div>
              <CardDescription>
                Konfigurasi parameter umum sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-timezone">Zona Waktu</Label>
                <select
                  id="system-timezone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue="Asia/Jakarta"
                >
                  <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                  <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                  <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system-language">Bahasa Sistem</Label>
                <select
                  id="system-language"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue="id"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pagination-size">Ukuran Pagination</Label>
                <select
                  id="pagination-size"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue="10"
                >
                  <option value="5">5 per halaman</option>
                  <option value="10">10 per halaman</option>
                  <option value="20">20 per halaman</option>
                  <option value="50">50 per halaman</option>
                  <option value="100">100 per halaman</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system-maintenance">Mode Pemeliharaan</Label>
                <div className="flex items-center space-x-2">
                  <input 
                    id="system-maintenance"
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="system-maintenance" className="text-sm text-muted-foreground">
                    Aktifkan mode pemeliharaan sistem
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveConfig}>
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemConfig;
