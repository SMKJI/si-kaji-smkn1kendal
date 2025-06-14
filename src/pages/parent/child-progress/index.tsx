
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Minus, BookOpen, Award, AlertTriangle } from 'lucide-react';

const ParentChildProgressPage = () => {
  // Mock child data
  const childData = {
    name: "Ahmad Rizki",
    class: "XI RPL 1",
    nis: "20240001"
  };

  // Mock academic data
  const academicData = {
    subjects: [
      { name: "Pemrograman Web", grade: 85, trend: "up", attendance: 95 },
      { name: "Basis Data", grade: 78, trend: "down", attendance: 88 },
      { name: "Pemrograman Berorientasi Objek", grade: 82, trend: "up", attendance: 92 },
      { name: "Sistem Operasi", grade: 75, trend: "same", attendance: 85 },
      { name: "Matematika", grade: 80, trend: "up", attendance: 90 },
      { name: "Bahasa Indonesia", grade: 88, trend: "up", attendance: 95 }
    ],
    overallGrade: 81.3,
    overallAttendance: 90.8,
    rank: 8,
    totalStudents: 32
  };

  // Mock behavior data
  const behaviorData = {
    violations: [
      { date: "2024-01-15", type: "Terlambat", description: "Masuk kelas 15 menit terlambat", status: "resolved" },
      { date: "2024-01-10", type: "Tidak mengerjakan tugas", description: "Tidak mengumpulkan tugas Matematika", status: "pending" }
    ],
    achievements: [
      { date: "2024-01-20", title: "Juara 2 Lomba Programming", description: "Kompetisi programming tingkat sekolah" },
      { date: "2024-01-05", title: "Siswa Teladan Bulan", description: "Pencapaian akademik dan kedisiplinan terbaik" }
    ],
    disciplineScore: 82
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout
      title="Perkembangan Anak"
      description={`Pantau perkembangan akademik dan perilaku ${childData.name}`}
      userRole="parent"
    >
      <div className="space-y-6">
        {/* Child Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Anak</CardTitle>
            <CardDescription>Data dasar siswa yang dipantau</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="font-medium">Nama:</span>
                <p className="text-lg">{childData.name}</p>
              </div>
              <div>
                <span className="font-medium">Kelas:</span>
                <Badge variant="secondary">{childData.class}</Badge>
              </div>
              <div>
                <span className="font-medium">NIS:</span>
                <p>{childData.nis}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="academic" className="w-full">
          <TabsList>
            <TabsTrigger value="academic">Akademik</TabsTrigger>
            <TabsTrigger value="behavior">Perilaku & Prestasi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic" className="space-y-4">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{academicData.overallGrade}</div>
                  <Progress value={academicData.overallGrade} className="mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Kehadiran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{academicData.overallAttendance}%</div>
                  <Progress value={academicData.overallAttendance} className="mt-2" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Peringkat Kelas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{academicData.rank}</div>
                  <p className="text-sm text-muted-foreground">dari {academicData.totalStudents} siswa</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Skor Disiplin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{behaviorData.disciplineScore}</div>
                  <Progress value={behaviorData.disciplineScore} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Subject Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Detail Mata Pelajaran
                </CardTitle>
                <CardDescription>Nilai dan kehadiran per mata pelajaran</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academicData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{subject.name}</span>
                          {getTrendIcon(subject.trend)}
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm text-muted-foreground">Nilai:</span>
                            <Progress value={subject.grade} className="mt-1" />
                            <span className="text-sm font-medium">{subject.grade}</span>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Kehadiran:</span>
                            <Progress value={subject.attendance} className="mt-1" />
                            <span className="text-sm font-medium">{subject.attendance}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="behavior" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Prestasi
                  </CardTitle>
                  <CardDescription>Pencapaian dan penghargaan yang diraih</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {behaviorData.achievements.map((achievement, index) => (
                      <div key={index} className="border-l-4 border-yellow-500 pl-4">
                        <div className="font-medium">{achievement.title}</div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(achievement.date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Violations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Pelanggaran
                  </CardTitle>
                  <CardDescription>Catatan pelanggaran dan tindak lanjut</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {behaviorData.violations.map((violation, index) => (
                      <div key={index} className="border-l-4 border-red-500 pl-4">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{violation.type}</div>
                          <Badge variant={violation.status === 'resolved' ? 'default' : 'destructive'}>
                            {violation.status === 'resolved' ? 'Selesai' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{violation.description}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(violation.date).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ParentChildProgressPage;
