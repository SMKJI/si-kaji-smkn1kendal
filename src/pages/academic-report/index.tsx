
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Search, Filter, Download, Eye, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

const AcademicReportPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Laporan Akademik - Si-Kaji';
  }, []);

  const [selectedClass, setSelectedClass] = useState('XII RPL 1');
  const [selectedPeriod, setSelectedPeriod] = useState('2023-1');
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

  // Sample report data
  const reports = [
    {
      id: 1,
      student: { id: 1, name: 'Andi Saputra', nisn: '0012345678' },
      semester: '1',
      year: '2023/2024',
      status: 'Disetujui',
      average: 85.5,
      rank: 3,
      subjects: [
        { name: 'Matematika', score: 85, grade: 'B', teacherNote: 'Baik dalam aljabar, perlu peningkatan dalam trigonometri' },
        { name: 'Bahasa Indonesia', score: 90, grade: 'A', teacherNote: 'Pemahaman dan penulisan sangat baik' },
        { name: 'Bahasa Inggris', score: 80, grade: 'B', teacherNote: 'Grammar baik, vocabulary perlu ditingkatkan' },
        { name: 'Pemrograman Web', score: 95, grade: 'A', teacherNote: 'Sangat baik dalam praktikum dan teori' },
        { name: 'Basis Data', score: 88, grade: 'B', teacherNote: 'Perlu latihan lebih banyak dalam query kompleks' },
      ]
    },
    {
      id: 2,
      student: { id: 2, name: 'Budi Santoso', nisn: '0012345679' },
      semester: '1',
      year: '2023/2024',
      status: 'Disetujui',
      average: 87.2,
      rank: 2,
      subjects: [
        { name: 'Matematika', score: 88, grade: 'B', teacherNote: 'Konsisten dalam pembelajaran' },
        { name: 'Bahasa Indonesia', score: 85, grade: 'B', teacherNote: 'Kemampuan menulis sangat baik' },
        { name: 'Bahasa Inggris', score: 90, grade: 'A', teacherNote: 'Kemampuan speaking sangat baik' },
        { name: 'Pemrograman Web', score: 92, grade: 'A', teacherNote: 'Proyek akhir sangat baik' },
        { name: 'Basis Data', score: 81, grade: 'B', teacherNote: 'Perlu peningkatan dalam normalisasi' },
      ]
    },
    {
      id: 3,
      student: { id: 3, name: 'Cindy Permata', nisn: '0012345680' },
      semester: '1',
      year: '2023/2024',
      status: 'Disetujui',
      average: 90.8,
      rank: 1,
      subjects: [
        { name: 'Matematika', score: 92, grade: 'A', teacherNote: 'Sangat baik dalam semua aspek' },
        { name: 'Bahasa Indonesia', score: 88, grade: 'B', teacherNote: 'Aktif dalam diskusi kelas' },
        { name: 'Bahasa Inggris', score: 95, grade: 'A', teacherNote: 'Kemampuan speaking dan writing sangat baik' },
        { name: 'Pemrograman Web', score: 90, grade: 'A', teacherNote: 'Kemampuan desain dan coding seimbang' },
        { name: 'Basis Data', score: 89, grade: 'B', teacherNote: 'Pemahaman konsep sangat baik' },
      ]
    },
    {
      id: 4,
      student: { id: 4, name: 'Deni Wijaya', nisn: '0012345681' },
      semester: '1',
      year: '2023/2024',
      status: 'Menunggu',
      average: 78.4,
      rank: 5,
      subjects: [
        { name: 'Matematika', score: 75, grade: 'C', teacherNote: 'Perlu bimbingan lebih untuk aljabar' },
        { name: 'Bahasa Indonesia', score: 80, grade: 'B', teacherNote: 'Cukup baik dalam penulisan' },
        { name: 'Bahasa Inggris', score: 78, grade: 'C', teacherNote: 'Perlu meningkatkan vocabulary' },
        { name: 'Pemrograman Web', score: 85, grade: 'B', teacherNote: 'Baik dalam HTML/CSS, perlu peningkatan di JS' },
        { name: 'Basis Data', score: 74, grade: 'C', teacherNote: 'Konsep dasar belum dikuasai sepenuhnya' },
      ]
    },
    {
      id: 5,
      student: { id: 5, name: 'Eka Putri', nisn: '0012345682' },
      semester: '1',
      year: '2023/2024',
      status: 'Disetujui',
      average: 82.6,
      rank: 4,
      subjects: [
        { name: 'Matematika', score: 82, grade: 'B', teacherNote: 'Konsisten dalam pembelajaran' },
        { name: 'Bahasa Indonesia', score: 85, grade: 'B', teacherNote: 'Aktif dalam diskusi' },
        { name: 'Bahasa Inggris', score: 80, grade: 'B', teacherNote: 'Kemampuan reading sangat baik' },
        { name: 'Pemrograman Web', score: 88, grade: 'B', teacherNote: 'Baik dalam desain UI/UX' },
        { name: 'Basis Data', score: 78, grade: 'C', teacherNote: 'Perlu latihan lebih untuk optimasi query' },
      ]
    },
  ];

  // Toggle expanded student
  const toggleExpandedStudent = (studentId: number) => {
    if (expandedStudent === studentId) {
      setExpandedStudent(null);
    } else {
      setExpandedStudent(studentId);
    }
  };

  // Get grade color
  const getGradeColor = (grade: string) => {
    const gradeColors = {
      'A': 'bg-green-100 text-green-800',
      'B': 'bg-blue-100 text-blue-800',
      'C': 'bg-yellow-100 text-yellow-800',
      'D': 'bg-orange-100 text-orange-800',
      'E': 'bg-red-100 text-red-800',
    };
    return gradeColors[grade as keyof typeof gradeColors] || 'bg-gray-100 text-gray-800';
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const statusColors = {
      'Disetujui': 'bg-green-100 text-green-800',
      'Menunggu': 'bg-yellow-100 text-yellow-800',
      'Ditolak': 'bg-red-100 text-red-800',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Laporan Akademik</h1>
                <p className="text-muted-foreground mt-1">Ringkasan rapor dan nilai siswa SMKN 1 Kendal</p>
              </div>
              <Button className="flex items-center gap-2">
                <FileText size={18} />
                Cetak Rapor
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari siswa..."
                        className="pl-10 w-full md:w-80"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-full md:w-44">
                          <SelectValue placeholder="Pilih Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XII RPL 1">XII RPL 1</SelectItem>
                          <SelectItem value="XII RPL 2">XII RPL 2</SelectItem>
                          <SelectItem value="XI RPL 1">XI RPL 1</SelectItem>
                          <SelectItem value="X RPL 1">X RPL 1</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger className="w-full md:w-52">
                          <SelectValue placeholder="Pilih Semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023-1">2023/2024 - Semester 1</SelectItem>
                          <SelectItem value="2022-2">2022/2023 - Semester 2</SelectItem>
                          <SelectItem value="2022-1">2022/2023 - Semester 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      Filter
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download size={16} />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">NISN</th>
                        <th className="py-3 px-4 text-left font-medium">Nama Siswa</th>
                        <th className="py-3 px-4 text-center font-medium">Rata-rata</th>
                        <th className="py-3 px-4 text-center font-medium">Peringkat</th>
                        <th className="py-3 px-4 text-center font-medium">Status</th>
                        <th className="py-3 px-4 text-right font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <React.Fragment key={report.id}>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{report.student.nisn}</td>
                            <td className="py-3 px-4">{report.student.name}</td>
                            <td className="py-3 px-4 text-center font-medium">{report.average.toFixed(1)}</td>
                            <td className="py-3 px-4 text-center">{report.rank}</td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(report.status)}`}>
                                {report.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" onClick={() => toggleExpandedStudent(report.id)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  Detail
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Unduh
                                </Button>
                              </div>
                            </td>
                          </tr>
                          {expandedStudent === report.id && (
                            <tr>
                              <td colSpan={6} className="p-0 border-b">
                                <div className="bg-muted/30 p-4">
                                  <div className="mb-3">
                                    <h4 className="font-semibold text-sm">Detail Nilai {report.student.name}</h4>
                                    <p className="text-xs text-muted-foreground">Tahun {report.year} - Semester {report.semester}</p>
                                  </div>
                                  <div className="overflow-x-auto">
                                    <table className="w-full border-collapse bg-background rounded-md">
                                      <thead>
                                        <tr className="border-b">
                                          <th className="py-2 px-4 text-left text-xs font-medium">Mata Pelajaran</th>
                                          <th className="py-2 px-4 text-center text-xs font-medium">Nilai</th>
                                          <th className="py-2 px-4 text-center text-xs font-medium">Grade</th>
                                          <th className="py-2 px-4 text-left text-xs font-medium">Catatan Guru</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {report.subjects.map((subject, index) => (
                                          <tr key={index} className="border-b last:border-0">
                                            <td className="py-2 px-4 text-xs">{subject.name}</td>
                                            <td className="py-2 px-4 text-center text-xs font-medium">{subject.score}</td>
                                            <td className="py-2 px-4 text-center">
                                              <span className={`px-2 py-1 rounded text-xs ${getGradeColor(subject.grade)}`}>
                                                {subject.grade}
                                              </span>
                                            </td>
                                            <td className="py-2 px-4 text-xs">{subject.teacherNote}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default AcademicReportPage;
