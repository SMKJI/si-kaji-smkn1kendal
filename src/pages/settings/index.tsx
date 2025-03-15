
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Lock, 
  User, 
  Settings, 
  Shield, 
  Eye, 
  EyeOff, 
  Save,
  Upload,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const SettingsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Pengaturan - Si-Kaji';
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    attendance: true,
    announcement: true,
    grades: true,
    discipline: false
  });

  const handleToggleChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  return (
    <DashboardLayout 
      title="Pengaturan" 
      description="Kelola pengaturan akun dan aplikasi"
      showBackButton
      backTo="/dashboard"
      userRole="waka"
      userName="Ahmad Fauzi"
    >
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Pengaturan</h1>
          <p className="text-muted-foreground">Kelola pengaturan akun dan preferensi aplikasi</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-3 sm:flex sm:flex-row">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="appearance">Tampilan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
                <CardDescription>
                  Kelola informasi profil dan pengaturan akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                    <div className="flex flex-col items-center gap-3">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-2xl">AF</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload size={14} />
                        Unggah Foto
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-4 mt-4 md:mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input id="name" defaultValue="Ahmad Fauzi, S.Pd." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nip">NIP</Label>
                          <Input id="nip" defaultValue="198705132008011003" readOnly className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="flex gap-2 items-center">
                            <Mail size={14} className="text-muted-foreground" />
                            <Input id="email" type="email" defaultValue="ahmad.fauzi@example.com" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          <div className="flex gap-2 items-center">
                            <Phone size={14} className="text-muted-foreground" />
                            <Input id="phone" defaultValue="08123456789" />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Alamat</Label>
                          <div className="flex gap-2 items-center">
                            <MapPin size={14} className="text-muted-foreground mt-3" />
                            <Input id="address" defaultValue="Jl. Pahlawan No. 123, Kendal" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Save size={16} />
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Keamanan</CardTitle>
                <CardDescription>
                  Kelola kata sandi dan pengaturan keamanan akun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Ubah Kata Sandi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan kata sandi saat ini"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Kata Sandi Baru</Label>
                          <div className="relative">
                            <Input
                              id="new-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Masukkan kata sandi baru"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Konfirmasi Kata Sandi</Label>
                          <div className="relative">
                            <Input
                              id="confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Konfirmasi kata sandi baru"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Pengaturan Keamanan Lainnya</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Verifikasi Dua Faktor</Label>
                          <p className="text-sm text-muted-foreground">
                            Aktifkan verifikasi dua faktor untuk keamanan tambahan
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Login Perangkat Aktif</Label>
                          <p className="text-sm text-muted-foreground">
                            Kelola perangkat yang saat ini masuk ke akun Anda
                          </p>
                        </div>
                        <Button variant="outline">Kelola</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Save size={16} />
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifikasi</CardTitle>
                <CardDescription>
                  Kelola preferensi notifikasi dan pemberitahuan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Metode Notifikasi</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Email</Label>
                          <p className="text-sm text-muted-foreground">
                            Terima notifikasi melalui email
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.email}
                          onCheckedChange={() => handleToggleChange('email')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Notifikasi Browser</Label>
                          <p className="text-sm text-muted-foreground">
                            Terima notifikasi saat menggunakan aplikasi
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.browser}
                          onCheckedChange={() => handleToggleChange('browser')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Jenis Notifikasi</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Kehadiran</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifikasi tentang presensi dan ketidakhadiran
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.attendance}
                          onCheckedChange={() => handleToggleChange('attendance')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Pengumuman</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifikasi tentang pengumuman penting sekolah
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.announcement}
                          onCheckedChange={() => handleToggleChange('announcement')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Nilai</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifikasi tentang pembaruan nilai dan rapor
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.grades}
                          onCheckedChange={() => handleToggleChange('grades')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Pelanggaran</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifikasi tentang pelanggaran tata tertib
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.discipline}
                          onCheckedChange={() => handleToggleChange('discipline')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Save size={16} />
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Tampilan</CardTitle>
                <CardDescription>
                  Sesuaikan tampilan dan pengalaman aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tema</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border p-4 rounded-lg cursor-pointer hover:border-primary">
                        <div className="bg-white dark:bg-gray-950 h-20 mb-2 rounded border"></div>
                        <p className="font-medium">Sistem (Default)</p>
                        <p className="text-sm text-muted-foreground">Sesuai tema sistem</p>
                      </div>
                      <div className="border p-4 rounded-lg cursor-pointer hover:border-primary">
                        <div className="bg-white h-20 mb-2 rounded border"></div>
                        <p className="font-medium">Terang</p>
                        <p className="text-sm text-muted-foreground">Tema terang</p>
                      </div>
                      <div className="border p-4 rounded-lg cursor-pointer hover:border-primary">
                        <div className="bg-gray-950 h-20 mb-2 rounded border"></div>
                        <p className="font-medium">Gelap</p>
                        <p className="text-sm text-muted-foreground">Tema gelap</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Pengaturan Tampilan Lainnya</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Tampilan Kompak</Label>
                          <p className="text-sm text-muted-foreground">
                            Tampilkan elemen UI dalam ukuran yang lebih padat
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Animasi</Label>
                          <p className="text-sm text-muted-foreground">
                            Aktifkan animasi UI untuk pengalaman yang lebih baik
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Kontras Tinggi</Label>
                          <p className="text-sm text-muted-foreground">
                            Tingkatkan kontras warna untuk aksesibilitas
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Save size={16} />
                      Simpan Perubahan
                    </Button>
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

export default SettingsPage;
