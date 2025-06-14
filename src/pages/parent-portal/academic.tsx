
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, TrendingDown, Calendar, FileText, Award, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageTransition from '@/components/layout/PageTransition';

const academicData = {
  semester: "Ganjil 2023/2024",
  grades: [
    { subject: "Matematika", score: 85, grade: "A", teacher: "Budi Santoso, S.Pd" },
    { subject: "Bahasa Indonesia", score: 88, grade: "A", teacher: "Siti Aminah, S.Pd" },
    { subject: "Bahasa Inggris", score: 82, grade: "A-", teacher: "John Smith, S.Pd" },
    { subject: "Fisika", score: 79, grade: "B+", teacher: "Ahmad Rahman, S.Pd" },
    { subject: "Kimia", score: 81, grade: "A-", teacher: "Dr. Maria Sari" },
    { subject: "Biologi", score: 86, grade: "A", teacher: "Rina Wati, S.Pd" },
    { subject: "Sejarah", score: 84, grade: "A", teacher: "Bambang Suko, S.Pd" },
    { subject: "Geografi", score: 80, grade: "A-", teacher: "Dewi Lestari, S.Pd" }
  ],
  ranking: {
    position: 5,
    total: 32,
    average: 83.1
  },
  attendance: {
    present: 45,
    sick: 2,
    permit: 1,
    absent: 0,
    percentage: 93.7
  }
};

const examHistory = [
  {
    id: "UTS001",
    type: "Ujian Tengah Semester",
    date: "2023-10-15",
    subjects: [
      { name: "Matematika", score: 88 },
      { name: "Bahasa Indonesia", score: 85 },
      { name: "Bahasa Inggris", score: 82 },
      { name: "Fisika", score: 79 }
    ],
    average: 83.5
  },
  {
    id: "UH001",
    type: "Ulangan Harian",
    date: "2023-09-20",
    subjects: [
      { name: "Matematika", score: 82 },
      { name: "Fisika", score: 78 }
    ],
    average: 80.0
  }
];

const ParentPortalAcademicPage = () => {
  const [selectedSemester, setSelectedSemester] = useState("ganjil2023");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'A-':
        return 'bg-blue-100 text-blue-800';
      case 'B+':
        return 'bg-amber-100 text-amber-800';
      case 'B':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateGPA = () => {
    const total = academicData.grades.reduce((sum, grade) => sum + grade.score, 0);
    return (total / academicData.grades.length).toFixed(2);
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Prestasi Akademik
            </h1>
            <p className="text-muted-foreground">
              Pantau nilai dan prestasi akademik anak
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ganjil2023">Ganjil 2023/2024</SelectItem>
                <SelectItem value="genap2023">Genap 2022/2023</SelectItem>
                <SelectItem value="ganjil2022">Ganjil 2022/2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{calculateGPA()}</div>
              <p className="text-xs text-muted-foreground">dari 100</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ranking Kelas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {academicData.ranking.position}/{academicData.ranking.total}
              </div>
              <p className="text-xs text-muted-foreground">posisi di kelas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Kehadiran</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{academicData.attendance.percentage}%</div>
              <p className="text-xs text-muted-foreground">tingkat kehadiran</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Mata Pelajaran</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{academicData.grades.length}</div>
              <p className="text-xs text-muted-foreground">mata pelajaran</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="grades" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grades">Nilai Semester</TabsTrigger>
            <TabsTrigger value="exams">Riwayat Ujian</TabsTrigger>
            <TabsTrigger value="progress">Perkembangan</TabsTrigger>
            <TabsTrigger value="report">Rapor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grades" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter Mata Pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
                  <SelectItem value="matematika">Matematika</SelectItem>
                  <SelectItem value="bahasa">Bahasa</SelectItem>
                  <SelectItem value="sains">Sains</SelectItem>
                  <SelectItem value="sosial">Sosial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Nilai Semester {academicData.semester}</CardTitle>
                <CardDescription>
                  Daftar nilai semua mata pelajaran semester ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mata Pelajaran</TableHead>
                      <TableHead>Guru</TableHead>
                      <TableHead className="text-center">Nilai</TableHead>
                      <TableHead className="text-center">Grade</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {academicData.grades.map((grade, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{grade.subject}</TableCell>
                        <TableCell>{grade.teacher}</TableCell>
                        <TableCell className="text-center font-semibold">{grade.score}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={getGradeColor(grade.grade)}>
                            {grade.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {grade.score >= 75 ? (
                            <Badge className="bg-green-100 text-green-800">Lulus</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800">Tidak Lulus</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="exams" className="space-y-4">
            <div className="space-y-4">
              {examHistory.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{exam.type}</CardTitle>
                        <CardDescription>
                          {format(new Date(exam.date), 'dd MMMM yyyy')} • Rata-rata: {exam.average}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">#{exam.id}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {exam.subjects.map((subject, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <p className="font-medium text-sm">{subject.name}</p>
                          <p className="text-2xl font-bold text-blue-600">{subject.score}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Grafik Perkembangan Nilai</CardTitle>
                <CardDescription>
                  Tren perkembangan nilai anak selama semester ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Mata Pelajaran Terbaik</span>
                      </div>
                      <p className="text-lg font-bold text-green-600 mt-2">Bahasa Indonesia (88)</p>
                    </div>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-amber-600" />
                        <span className="font-medium text-amber-800">Perlu Perbaikan</span>
                      </div>
                      <p className="text-lg font-bold text-amber-600 mt-2">Fisika (79)</p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-800">Rata-rata Kelas</span>
                      </div>
                      <p className="text-lg font-bold text-blue-600 mt-2">81.5</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Analisis Perkembangan</h4>
                    <p className="text-sm text-blue-700">
                      Anak menunjukkan peningkatan yang konsisten dalam mata pelajaran bahasa, 
                      namun perlu fokus lebih pada mata pelajaran eksak seperti Fisika. 
                      Secara keseluruhan, prestasi anak berada di atas rata-rata kelas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="report" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapor Semester</CardTitle>
                <CardDescription>
                  Download dan lihat rapor resmi semester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">Rapor Ganjil 2023/2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Rapor resmi semester ganjil tahun ajaran 2023/2024
                      </p>
                      <Button size="sm" className="w-full">
                        Download PDF
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5" />
                        <span className="font-medium">Sertifikat Prestasi</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Sertifikat prestasi akademik dan non-akademik
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        Lihat Sertifikat
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Catatan Wali Kelas</h4>
                    <p className="text-sm text-amber-700">
                      "Anak menunjukkan perkembangan yang baik dalam aspek akademik. 
                      Disarankan untuk lebih fokus pada mata pelajaran Fisika dan 
                      meningkatkan partisipasi dalam diskusi kelas."
                    </p>
                    <p className="text-xs text-amber-600 mt-2">- Ahmad Rahman, S.Pd (Wali Kelas)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ParentPortalAcademicPage;
