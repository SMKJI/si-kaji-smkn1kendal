
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, AlertCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

// Sample data
const violationsData = [
  { month: 'Jul', poin: 0 },
  { month: 'Aug', poin: 5 },
  { month: 'Sep', poin: 2 },
  { month: 'Oct', poin: 0 },
  { month: 'Nov', poin: 8 },
  { month: 'Dec', poin: 0 },
];

const disciplinaryRecords = [
  {
    id: 1,
    date: '2023-11-15',
    type: 'violation',
    category: 'Tata Tertib',
    description: 'Terlambat masuk kelas setelah istirahat',
    points: 5,
    status: 'Ditegur',
    reporter: 'Ibu Dina (Guru Piket)',
    followUp: 'Teguran lisan dan pencatatan',
  },
  {
    id: 2,
    date: '2023-11-08',
    type: 'violation',
    category: 'Seragam',
    description: 'Tidak memakai atribut seragam lengkap (dasi)',
    points: 3,
    status: 'Ditegur',
    reporter: 'Bpk. Ahmad (Wali Kelas)',
    followUp: 'Teguran lisan dan pencatatan',
  },
  {
    id: 3,
    date: '2023-09-22',
    type: 'achievement',
    category: 'Akademik',
    description: 'Juara 2 Lomba Cerdas Cermat tingkat Kecamatan',
    points: 25,
    status: 'Diakui',
    reporter: 'Ibu Sri (Pembina)',
    followUp: 'Pemberian sertifikat dan penghargaan',
  },
  {
    id: 4,
    date: '2023-09-10',
    type: 'violation',
    category: 'Kehadiran',
    description: 'Tidak masuk tanpa keterangan',
    points: 10,
    status: 'Ditindaklanjuti',
    reporter: 'Sistem',
    followUp: 'Panggilan orang tua',
  },
  {
    id: 5,
    date: '2023-08-27',
    type: 'achievement',
    category: 'Non-Akademik',
    description: 'Mewakili sekolah dalam pertandingan basket antar sekolah',
    points: 15,
    status: 'Diakui',
    reporter: 'Bpk. Rudi (Pelatih)',
    followUp: 'Pemberian poin penghargaan',
  },
];

const ParentPortalDisciplinePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("semester1");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter records based on selected category
  const filteredRecords = selectedCategory === 'all' 
    ? disciplinaryRecords 
    : selectedCategory === 'violations'
      ? disciplinaryRecords.filter(record => record.type === 'violation')
      : disciplinaryRecords.filter(record => record.type === 'achievement');

  // Get status badge style
  const getRecordBadge = (type: string) => {
    return type === 'violation'
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';
  };

  // Calculate total points
  const totalViolationPoints = disciplinaryRecords
    .filter(record => record.type === 'violation')
    .reduce((sum, record) => sum + record.points, 0);
    
  const totalAchievementPoints = disciplinaryRecords
    .filter(record => record.type === 'achievement')
    .reduce((sum, record) => sum + record.points, 0);
    
  const netPoints = totalAchievementPoints - totalViolationPoints;

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Kedisiplinan Anak</h1>
            <p className="text-muted-foreground">
              Pantau catatan kedisiplinan dan prestasi anak Anda
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semester1">Semester 1</SelectItem>
                <SelectItem value="semester2">Semester 2</SelectItem>
                <SelectItem value="all">Semua</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className={netPoints >= 0 ? "border-green-200" : "border-red-200"}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Poin Bersih
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className={`text-2xl font-bold ${netPoints >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {netPoints}
                </span>
                <span className="text-sm text-muted-foreground">Total poin (prestasi - pelanggaran)</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                Poin Pelanggaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-red-600">{totalViolationPoints}</span>
                <span className="text-sm text-muted-foreground">Akumulasi poin pelanggaran</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Poin Prestasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-600">{totalAchievementPoints}</span>
                <span className="text-sm text-muted-foreground">Akumulasi poin prestasi</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="records" className="w-full">
            <TabsList className="mb-4 w-full md:w-auto">
              <TabsTrigger value="records">Catatan Kedisiplinan</TabsTrigger>
              <TabsTrigger value="chart">Grafik Poin</TabsTrigger>
              <TabsTrigger value="messages">Pesan dari Wali Kelas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="records" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Daftar Catatan</h2>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Catatan</SelectItem>
                    <SelectItem value="violations">Pelanggaran</SelectItem>
                    <SelectItem value="achievements">Prestasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                {filteredRecords.map((record) => (
                  <Card key={record.id} className={record.type === 'violation' ? "border-red-100" : "border-green-100"}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs ${getRecordBadge(record.type)}`}>
                              {record.type === 'violation' ? 'Pelanggaran' : 'Prestasi'}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(record.date), 'EEEE, dd MMM yyyy')}
                            </span>
                          </div>
                          <h3 className="font-medium">{record.description}</h3>
                          <div className="mt-2 text-sm">
                            <p><span className="text-muted-foreground">Kategori:</span> {record.category}</p>
                            <p><span className="text-muted-foreground">Dilaporkan oleh:</span> {record.reporter}</p>
                            <p><span className="text-muted-foreground">Tindak lanjut:</span> {record.followUp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-bold ${record.type === 'violation' ? 'text-red-600' : 'text-green-600'}`}>
                            {record.type === 'violation' ? '-' : '+'}{record.points}
                          </span>
                          <p className="text-xs text-muted-foreground">poin</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="chart" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tren Poin Pelanggaran</CardTitle>
                  <CardDescription>
                    Grafik perolehan poin pelanggaran per bulan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={violationsData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="poin" name="Poin Pelanggaran" fill="#f87171" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pesan dari Wali Kelas</CardTitle>
                  <CardDescription>
                    Komunikasi mengenai perkembangan kedisiplinan anak
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Bpk. Ahmad Junaedi (Wali Kelas)
                        </h3>
                        <span className="text-sm text-muted-foreground">15/11/2023</span>
                      </div>
                      <p className="text-sm mb-4">
                        Selamat siang Bapak/Ibu, anak Bapak/Ibu hari ini tercatat terlambat masuk kelas setelah 
                        jam istirahat. Kami telah memberikan teguran dan pencatatan. Mohon untuk diingatkan kembali 
                        di rumah agar selalu disiplin waktu. Terima kasih atas perhatiannya.
                      </p>
                      <Button variant="outline" size="sm">Balas</Button>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Bpk. Ahmad Junaedi (Wali Kelas)
                        </h3>
                        <span className="text-sm text-muted-foreground">10/09/2023</span>
                      </div>
                      <p className="text-sm mb-4">
                        Selamat siang Bapak/Ibu, hari ini anak Bapak/Ibu tidak masuk sekolah tanpa keterangan.
                        Kami mohon konfirmasi apakah ada kendala. Jika sakit, mohon dapat mengirimkan surat keterangan
                        atau informasi melalui pesan ini. Terima kasih.
                      </p>
                      <Button variant="outline" size="sm">Balas</Button>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Bpk. Ahmad Junaedi (Wali Kelas)
                        </h3>
                        <span className="text-sm text-muted-foreground">27/08/2023</span>
                      </div>
                      <p className="text-sm mb-4">
                        Selamat sore Bapak/Ibu, dengan bangga kami informasikan bahwa anak Bapak/Ibu telah 
                        mewakili sekolah dalam pertandingan basket antar sekolah dan berkontribusi dengan baik 
                        bagi tim. Kami memberikan poin penghargaan untuk prestasinya. Selamat!
                      </p>
                      <Button variant="outline" size="sm">Balas</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default ParentPortalDisciplinePage;
