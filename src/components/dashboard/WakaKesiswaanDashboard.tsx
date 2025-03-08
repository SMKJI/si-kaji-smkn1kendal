
import React from 'react';
import { Users, Bell, ClipboardList, UserCheck, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WakaKesiswaanDashboard = () => {
  const stats = [
    { 
      title: 'Total Siswa', 
      value: '2,843', 
      icon: Users, 
      description: 'Terdaftar saat ini'
    },
    { 
      title: 'Pengaduan', 
      value: '24', 
      icon: Bell, 
      description: 'Perlu tindak lanjut'
    },
    { 
      title: 'Pelanggaran', 
      value: '18', 
      icon: ClipboardList, 
      description: 'Minggu ini'
    },
    { 
      title: 'Kehadiran', 
      value: '95.7%', 
      icon: UserCheck, 
      description: 'Rata-rata harian'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard Waka Kesiswaan</h1>
        <p className="text-muted-foreground mt-1">Monitoring kegiatan dan kedisiplinan siswa</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription className="text-2xl font-bold mt-2">
                {stat.value}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-3 pt-0">
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Pengaduan Siswa</CardTitle>
              <CardDescription>
                Daftar pengaduan yang memerlukan tindak lanjut
              </CardDescription>
            </div>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {title: 'Laporan Perundungan', category: 'Tinggi', time: 'Baru saja'}, 
                {title: 'Kerusakan Fasilitas', category: 'Sedang', time: '2 jam lalu'}, 
                {title: 'Keluhan Pembelajaran', category: 'Rendah', time: '5 jam lalu'}
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        item.category === 'Tinggi' ? 'bg-red-500' :
                        item.category === 'Sedang' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                      <p className="text-muted-foreground text-xs">
                        Prioritas {item.category} · {item.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Aktivitas Kedisiplinan</CardTitle>
              <CardDescription>
                Pelanggaran tata tertib terbaru
              </CardDescription>
            </div>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {title: 'Terlambat Masuk', kelas: 'XI RPL 2', time: 'Hari ini', point: '-5'}, 
                {title: 'Atribut Tidak Lengkap', kelas: 'X TKJ 1', time: 'Kemarin', point: '-3'}, 
                {title: 'Alpha', kelas: 'XII MM 3', time: '2 hari lalu', point: '-10'}
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {item.kelas} · {item.time}
                    </p>
                  </div>
                  <span className="text-red-500 text-xs font-medium">{item.point}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base font-medium">Jadwal Kegiatan Kesiswaan</CardTitle>
            <CardDescription>
              Agenda kesiswaan mendatang
            </CardDescription>
          </div>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {title: 'Rapat OSIS', location: 'Ruang OSIS', date: 'Senin, 9 Mei 2023', time: '14:00 - 16:00'}, 
              {title: 'Pembinaan Karakter', location: 'Aula Utama', date: 'Rabu, 11 Mei 2023', time: '08:00 - 10:00'}, 
              {title: 'Lomba Kebersihan Kelas', location: 'Seluruh Ruang Kelas', date: 'Jumat, 13 Mei 2023', time: 'Sepanjang hari'}
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {item.location}
                  </p>
                  <p className="text-xs mt-1">
                    {item.date} · {item.time}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <ChevronRight size={16} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add Button component to avoid errors since it's used in the component
const Button = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}: any) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default WakaKesiswaanDashboard;
