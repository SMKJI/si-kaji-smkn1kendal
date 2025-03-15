
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import PageTransition from '@/components/layout/PageTransition';

const academicData = [
  { subject: "Matematika", score: 85, average: 75, highest: 95 },
  { subject: "B. Indonesia", score: 82, average: 78, highest: 90 },
  { subject: "B. Inggris", score: 78, average: 72, highest: 92 },
  { subject: "IPA", score: 90, average: 76, highest: 94 },
  { subject: "IPS", score: 75, average: 70, highest: 88 },
  { subject: "PKN", score: 88, average: 80, highest: 95 },
  { subject: "Agama", score: 92, average: 82, highest: 98 },
];

const progressData = [
  { month: "Juli", bahasa: 75, matematika: 68, ipa: 72, ips: 70 },
  { month: "Agustus", bahasa: 78, matematika: 72, ipa: 75, ips: 73 },
  { month: "September", bahasa: 80, matematika: 75, ipa: 78, ips: 76 },
  { month: "Oktober", bahasa: 82, matematika: 80, ipa: 82, ips: 79 },
  { month: "November", bahasa: 85, matematika: 82, ipa: 85, ips: 83 },
  { month: "Desember", bahasa: 87, matematika: 85, ipa: 90, ips: 86 },
];

const ParentPortalAcademicPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("mid-term");
  const [selectedSemester, setSelectedSemester] = useState("semester1");

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Akademik Anak</h1>
            <p className="text-muted-foreground">
              Pantau perkembangan akademik anak Anda
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semester1">Semester 1</SelectItem>
                <SelectItem value="semester2">Semester 2</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mid-term">Ujian Tengah Semester</SelectItem>
                <SelectItem value="final">Ujian Akhir Semester</SelectItem>
                <SelectItem value="daily">Nilai Harian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="scores" className="w-full">
            <TabsList className="mb-4 w-full md:w-auto">
              <TabsTrigger value="scores">Nilai Pelajaran</TabsTrigger>
              <TabsTrigger value="progress">Perkembangan</TabsTrigger>
              <TabsTrigger value="reports">Laporan Guru</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scores" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nilai Akademik</CardTitle>
                  <CardDescription>
                    {selectedPeriod === "mid-term" ? "Ujian Tengah Semester" : 
                     selectedPeriod === "final" ? "Ujian Akhir Semester" : "Nilai Harian"} - {selectedSemester === "semester1" ? "Semester 1" : "Semester 2"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={academicData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" name="Nilai Anak" fill="#8884d8" />
                        <Bar dataKey="average" name="Rata-rata Kelas" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid md:grid-cols-3 gap-4">
                {academicData.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{item.subject}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Nilai Anak:</span>
                        <span className="font-medium">{item.score}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Rata-rata Kelas:</span>
                        <span>{item.average}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Nilai Tertinggi:</span>
                        <span>{item.highest}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Perkembangan Nilai</CardTitle>
                  <CardDescription>Tren nilai akademik per bulan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={progressData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[60, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="bahasa" name="Bahasa" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="matematika" name="Matematika" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="ipa" name="IPA" stroke="#ffc658" />
                        <Line type="monotone" dataKey="ips" name="IPS" stroke="#ff8042" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Guru</CardTitle>
                  <CardDescription>Komentar dan catatan dari guru mata pelajaran</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Matematika - Ibu Sri Wahyuni</h3>
                        <span className="text-sm text-muted-foreground">12/10/2023</span>
                      </div>
                      <p className="text-sm">
                        Anak Bapak/Ibu telah menunjukkan kemajuan yang baik dalam perhitungan dasar aljabar.
                        Namun masih perlu latihan tambahan untuk soal-soal cerita yang lebih kompleks.
                        Disarankan untuk melakukan latihan di rumah minimal 30 menit setiap hari.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Bahasa Indonesia - Bpk. Ahmad Junaedi</h3>
                        <span className="text-sm text-muted-foreground">10/10/2023</span>
                      </div>
                      <p className="text-sm">
                        Kemampuan menulis dan memahami bacaan sudah sangat baik. 
                        Anak Bapak/Ibu aktif berdiskusi dalam kelas dan mampu menyampaikan pendapat dengan terstruktur.
                        Terus dorong untuk lebih banyak membaca buku fiksi dan non-fiksi untuk memperkaya kosakata.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">IPA - Ibu Dina Rahmawati</h3>
                        <span className="text-sm text-muted-foreground">08/10/2023</span>
                      </div>
                      <p className="text-sm">
                        Memiliki ketertarikan yang tinggi pada eksperimen sains. 
                        Hasil ulangan terakhir menunjukkan pemahaman yang baik terhadap konsep dasar fisika.
                        Disarankan untuk mengikuti program ekstrakurikuler KIR (Karya Ilmiah Remaja) untuk mengembangkan potensinya.
                      </p>
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

export default ParentPortalAcademicPage;
