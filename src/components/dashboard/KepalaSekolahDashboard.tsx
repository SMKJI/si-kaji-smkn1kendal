
import React from 'react';
import { Users, Award, BarChart3, ChevronRight, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const KepalaSekolahDashboard = () => {
  const stats = [
    { 
      title: 'Total Siswa', 
      value: '2,843', 
      change: '+12%', 
      icon: Users, 
      trend: 'up',
      description: 'Tahun ajaran saat ini'
    },
    { 
      title: 'Prestasi', 
      value: '48', 
      change: '+15%', 
      icon: Award, 
      trend: 'up',
      description: 'Dari tahun lalu'
    },
    { 
      title: 'Tingkat Kelulusan', 
      value: '98.7%', 
      change: '+1.2%', 
      icon: BarChart3, 
      trend: 'up',
      description: 'Dari tahun lalu'
    },
    { 
      title: 'Pelanggaran', 
      value: '138', 
      change: '-5%', 
      icon: ClipboardList, 
      trend: 'down',
      description: 'Dari semester lalu'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard Kepala Sekolah</h1>
        <p className="text-muted-foreground mt-1">Ringkasan data sekolah dan performa akademik</p>
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

      {/* Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Laporan Akademik</CardTitle>
              <CardDescription>
                Laporan performa akademik terkini
              </CardDescription>
            </div>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Laporan Ujian Semester', 'Performa Akademik Per Jurusan', 'Tingkat Kehadiran Siswa'].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{item}</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {i === 0 ? 'Diperbarui hari ini' : i === 1 ? 'Diperbarui kemarin' : 'Diperbarui 3 hari lalu'}
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Laporan Non-Akademik</CardTitle>
              <CardDescription>
                Kegiatan ekstrakurikuler dan prestasi
              </CardDescription>
            </div>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Prestasi Lomba Eksternal', 'Kegiatan OSIS Terkini', 'Program Pengembangan Karakter'].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{item}</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {i === 0 ? 'Diperbarui 2 hari lalu' : i === 1 ? 'Diperbarui 3 hari lalu' : 'Diperbarui minggu lalu'}
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

export default KepalaSekolahDashboard;
