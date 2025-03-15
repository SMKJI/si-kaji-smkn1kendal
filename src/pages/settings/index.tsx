
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Lock, Bell, Shield, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { APP_NAME, APP_SCHOOL } from '@/lib/constants';

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('account');

  // User profile settings
  const [profileSettings, setProfileSettings] = useState({
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@gmail.com',
    phone: '08123456789',
    role: 'Waka Kesiswaan',
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    complaintNotifications: true,
    attendanceNotifications: true,
    disciplineNotifications: true,
    achievementNotifications: true,
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordLastChanged: '2 bulan yang lalu',
  });

  // System settings
  const [systemSettings, setSystemSettings] = useState({
    language: 'id',
    timezone: 'Asia/Jakarta',
    theme: 'light',
    dataRetention: '1 year',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil berhasil diperbarui",
      description: "Perubahan profil Anda telah disimpan",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Kata sandi berhasil diperbarui",
      description: "Kata sandi Anda telah diubah",
    });
  };

  const handleToggle = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings],
    });

    toast({
      title: "Pengaturan berhasil diperbarui",
      description: `Pengaturan ${setting} telah diubah`,
    });
  };

  const handleSecurityToggle = (setting: string) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting as keyof typeof securitySettings],
    });

    toast({
      title: "Pengaturan keamanan diperbarui",
      description: `Pengaturan ${setting} telah diubah`,
    });
  };

  const handleSystemUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pengaturan sistem diperbarui",
      description: "Perubahan pengaturan sistem telah disimpan",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Pengaturan</h1>
          <p className="text-muted-foreground">
            Kelola pengaturan akun dan aplikasi {APP_NAME} di {APP_SCHOOL}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Akun</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Keamanan</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Sistem</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profil</CardTitle>
                <CardDescription>
                  Kelola informasi profil Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input 
                        id="name" 
                        value={profileSettings.name} 
                        onChange={(e) => setProfileSettings({...profileSettings, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileSettings.email} 
                        onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input 
                        id="phone" 
                        value={profileSettings.phone}
                        onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Peran</Label>
                      <Input id="role" value={profileSettings.role} disabled />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Simpan Perubahan</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kata Sandi</CardTitle>
                <CardDescription>
                  Perbarui kata sandi Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Kata Sandi Baru</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Perbarui Kata Sandi</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Autentikasi</CardTitle>
                <CardDescription>
                  Kelola pengaturan autentikasi dan keamanan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autentikasi Dua Faktor</Label>
                    <p className="text-sm text-muted-foreground">
                      Tambahkan lapisan keamanan ekstra untuk akun Anda
                    </p>
                  </div>
                  <Switch 
                    checked={securitySettings.twoFactorAuth} 
                    onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                  />
                </div>
                <Separator />
                <div>
                  <div className="space-y-0.5">
                    <Label>Perubahan Kata Sandi Terakhir</Label>
                    <p className="text-sm">{securitySettings.passwordLastChanged}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>
                  Kelola preferensi notifikasi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi melalui email
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications} 
                    onCheckedChange={() => handleToggle('emailNotifications')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi melalui SMS
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications} 
                    onCheckedChange={() => handleToggle('smsNotifications')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pengaduan</Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi tentang pengaduan baru dan perubahan status
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.complaintNotifications} 
                    onCheckedChange={() => handleToggle('complaintNotifications')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Kehadiran</Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi tentang ketidakhadiran siswa
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.attendanceNotifications} 
                    onCheckedChange={() => handleToggle('attendanceNotifications')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Kedisiplinan</Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi tentang pelanggaran kedisiplinan
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.disciplineNotifications} 
                    onCheckedChange={() => handleToggle('disciplineNotifications')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Prestasi</Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi tentang prestasi baru siswa
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.achievementNotifications} 
                    onCheckedChange={() => handleToggle('achievementNotifications')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Sistem</CardTitle>
                <CardDescription>
                  Kelola preferensi sistem aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSystemUpdate} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="language">Bahasa</Label>
                      <Select 
                        value={systemSettings.language}
                        onValueChange={(value) => setSystemSettings({...systemSettings, language: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih bahasa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Zona Waktu</Label>
                      <Select 
                        value={systemSettings.timezone}
                        onValueChange={(value) => setSystemSettings({...systemSettings, timezone: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih zona waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Jakarta">WIB (GMT+7)</SelectItem>
                          <SelectItem value="Asia/Makassar">WITA (GMT+8)</SelectItem>
                          <SelectItem value="Asia/Jayapura">WIT (GMT+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Tema</Label>
                      <Select 
                        value={systemSettings.theme}
                        onValueChange={(value) => setSystemSettings({...systemSettings, theme: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tema" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Terang</SelectItem>
                          <SelectItem value="dark">Gelap</SelectItem>
                          <SelectItem value="system">Ikuti Sistem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="data-retention">Retensi Data</Label>
                      <Select 
                        value={systemSettings.dataRetention}
                        onValueChange={(value) => setSystemSettings({...systemSettings, dataRetention: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jangka waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6 months">6 Bulan</SelectItem>
                          <SelectItem value="1 year">1 Tahun</SelectItem>
                          <SelectItem value="2 years">2 Tahun</SelectItem>
                          <SelectItem value="3 years">3 Tahun</SelectItem>
                          <SelectItem value="forever">Selamanya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Simpan Pengaturan</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ekspor Data</CardTitle>
                <CardDescription>
                  Ekspor data dari sistem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Ekspor Data Siswa</h3>
                    <p className="text-sm text-muted-foreground">
                      Unduh data siswa dalam format Excel atau CSV
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ekspor
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Ekspor Data Kedisiplinan</h3>
                    <p className="text-sm text-muted-foreground">
                      Unduh data pelanggaran dan prestasi dalam format Excel atau CSV
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ekspor
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Ekspor Data Kehadiran</h3>
                    <p className="text-sm text-muted-foreground">
                      Unduh data kehadiran siswa dalam format Excel atau CSV
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ekspor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
