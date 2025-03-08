
import React from 'react';
import { Users, Bell, ClipboardList, Calendar, ChevronRight, AreaChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const stats = [
    { 
      title: 'Total Siswa', 
      value: '2,843', 
      change: '+12%', 
      icon: Users, 
      trend: 'up',
      description: 'Dari bulan lalu'
    },
    { 
      title: 'Pengaduan', 
      value: '24', 
      change: '+8%', 
      icon: Bell, 
      trend: 'up',
      description: 'Belum diproses'
    },
    { 
      title: 'Pelanggaran', 
      value: '138', 
      change: '-5%', 
      icon: ClipboardList, 
      trend: 'down',
      description: 'Dari semester lalu'
    },
    { 
      title: 'Kegiatan', 
      value: '12', 
      change: 'Minggu ini', 
      icon: Calendar, 
      trend: 'neutral',
      description: 'Jadwal aktif'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-1">Selamat datang kembali, Admin</p>
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
              <div className="text-xs flex items-center">
                <span className={`mr-1 ${
                  stat.trend === 'up' ? 'text-green-500' : 
                  stat.trend === 'down' ? 'text-red-500' : 
                  'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Pengaduan Terbaru</CardTitle>
              <CardDescription>
                Daftar pengaduan yang baru masuk
              </CardDescription>
            </div>
            <AreaChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">Pengaduan Fasilitas</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {i === 0 ? 'Baru saja' : i === 1 ? '1 jam yang lalu' : '3 jam yang lalu'}
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

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Pelanggaran Terbaru</CardTitle>
              <CardDescription>
                Daftar pelanggaran yang tercatat
              </CardDescription>
            </div>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">Terlambat Masuk</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Siswa Kelas {10 + i}
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

export default AdminDashboard;
