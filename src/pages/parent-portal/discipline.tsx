
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Award, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

const disciplineRecords = [
  { 
    id: "D001", 
    date: "2023-10-25", 
    type: "violation", 
    category: "Keterlambatan",
    description: "Terlambat masuk kelas selama 3 hari berturut-turut",
    points: -5,
    status: "closed",
    handler: "Wali Kelas"
  },
  { 
    id: "D002", 
    date: "2023-10-18", 
    type: "violation", 
    category: "Atribut",
    description: "Tidak mengenakan atribut lengkap saat upacara",
    points: -5,
    status: "closed",
    handler: "Guru Piket"
  },
  { 
    id: "D003", 
    date: "2023-11-05", 
    type: "achievement", 
    category: "Prestasi Akademik",
    description: "Juara 2 Lomba Web Design tingkat kota",
    points: 15,
    status: "active",
    handler: "Kepala Sekolah"
  },
  { 
    id: "D004", 
    date: "2023-11-12", 
    type: "achievement", 
    category: "Prestasi Non-Akademik",
    description: "Membantu dalam kegiatan bakti sosial sekolah",
    points: 10,
    status: "active",
    handler: "Waka Kesiswaan"
  },
];

const disciplineStats = {
  totalPoints: 85,
  violations: 2,
  achievements: 2,
  targetPoints: 100,
  monthlyTrend: [
    { month: "Agustus", points: 75 },
    { month: "September", points: 80 },
    { month: "Oktober", points: 75 },
    { month: "November", points: 85 },
  ]
};

const ParentPortalDisciplinePage = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getRecordColor = (type: string) => {
    return type === 'violation' 
      ? 'bg-red-100 text-red-800 border-red-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Keterlambatan": "bg-orange-100 text-orange-800",
      "Atribut": "bg-blue-100 text-blue-800",
      "Prestasi Akademik": "bg-purple-100 text-purple-800",
      "Prestasi Non-Akademik": "bg-green-100 text-green-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Kedisiplinan & Prestasi</h1>
            <p className="text-muted-foreground">
              Monitor perkembangan karakter dan prestasi anak
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Total Poin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{disciplineStats.totalPoints}</div>
              <p className="text-xs text-muted-foreground">dari {disciplineStats.targetPoints} target</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Pelanggaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{disciplineStats.violations}</div>
              <p className="text-xs text-muted-foreground">bulan ini</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4" />
                Prestasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{disciplineStats.achievements}</div>
              <p className="text-xs text-muted-foreground">bulan ini</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Tren
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">+10</div>
              <p className="text-xs text-muted-foreground">poin bulan ini</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Progress Kedisiplinan</CardTitle>
            <CardDescription>
              Pencapaian poin kedisiplinan: {disciplineStats.totalPoints}/{disciplineStats.targetPoints}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(disciplineStats.totalPoints / disciplineStats.targetPoints) * 100} className="h-4 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-green-600">Baik (80-100)</div>
                <div className="text-xs text-muted-foreground">Target tercapai</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-amber-600">Cukup (60-79)</div>
                <div className="text-xs text-muted-foreground">Perlu perbaikan</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-red-600">Kurang (40-59)</div>
                <div className="text-xs text-muted-foreground">Bimbingan intensif</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-600">Sangat Kurang (<40)</div>
                <div className="text-xs text-muted-foreground">Pemanggilan orang tua</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="records">Catatan Detail</TabsTrigger>
            <TabsTrigger value="trends">Tren & Analisis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pelanggaran Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {disciplineRecords.filter(r => r.type === 'violation').slice(0, 3).map((record) => (
                      <div key={record.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className={getCategoryColor(record.category)}>
                            {record.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(record.date), 'dd MMM')}
                          </span>
                        </div>
                        <p className="text-sm">{record.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground">Ditangani: {record.handler}</span>
                          <span className="text-sm font-bold text-red-600">{record.points} poin</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prestasi Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {disciplineRecords.filter(r => r.type === 'achievement').slice(0, 3).map((record) => (
                      <div key={record.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className={getCategoryColor(record.category)}>
                            {record.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(record.date), 'dd MMM')}
                          </span>
                        </div>
                        <p className="text-sm">{record.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground">Diberi: {record.handler}</span>
                          <span className="text-sm font-bold text-green-600">+{record.points} poin</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="records" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Semua Catatan Kedisiplinan</CardTitle>
                <CardDescription>
                  Riwayat lengkap pelanggaran dan prestasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disciplineRecords.map((record) => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={getRecordColor(record.type)}
                          >
                            {record.type === 'violation' ? 'Pelanggaran' : 'Prestasi'}
                          </Badge>
                          <Badge variant="outline" className={getCategoryColor(record.category)}>
                            {record.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            ID: {record.id}
                          </span>
                        </div>
                        <div className={`text-lg font-bold ${record.points < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {record.points > 0 ? `+${record.points}` : record.points} poin
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">{record.description}</h4>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(record.date), 'dd MMMM yyyy')}
                        </div>
                        <span>Ditangani oleh: {record.handler}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tren Poin Bulanan</CardTitle>
                  <CardDescription>
                    Perkembangan poin kedisiplinan 4 bulan terakhir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {disciplineStats.monthlyTrend.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.month}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={item.points} max={100} className="w-24 h-2" />
                          <span className="text-sm font-medium w-12">{item.points}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rekomendasi</CardTitle>
                  <CardDescription>
                    Saran untuk meningkatkan kedisiplinan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Kelebihan</p>
                      <p className="text-xs text-green-600">Prestasi akademik yang konsisten dan partisipasi aktif dalam kegiatan sekolah</p>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">Area Perbaikan</p>
                      <p className="text-xs text-amber-600">Perlu lebih memperhatikan ketepatan waktu dan kelengkapan atribut sekolah</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Saran</p>
                      <p className="text-xs text-blue-600">Tetap pertahankan prestasi dan tingkatkan kedisiplinan harian</p>
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

export default ParentPortalDisciplinePage;
