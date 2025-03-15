
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, FileText, Clock, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

// Sample data
const assignments = [
  {
    id: 1,
    subject: 'Matematika',
    title: 'Tugas Aljabar Persamaan Linier',
    description: 'Mengerjakan soal nomor 1-10 di buku paket halaman 75-76',
    teacher: 'Ibu Sri Wahyuni',
    dueDate: '2023-12-15',
    status: 'pending',
    attachments: ['Soal_Latihan.pdf'],
  },
  {
    id: 2,
    subject: 'Bahasa Indonesia',
    title: 'Laporan Buku Fiksi',
    description: 'Membuat laporan mengenai novel yang telah dibaca',
    teacher: 'Bpk. Ahmad Junaedi',
    dueDate: '2023-12-10',
    status: 'completed',
    attachments: ['Panduan_Penulisan_Laporan.pdf'],
  },
  {
    id: 3,
    subject: 'IPA',
    title: 'Laporan Praktikum Fotosintesis',
    description: 'Membuat laporan praktikum berdasarkan pengamatan di laboratorium',
    teacher: 'Ibu Dina Rahmawati',
    dueDate: '2023-12-08',
    status: 'overdue',
    attachments: ['Template_Laporan_Praktikum.docx'],
  },
  {
    id: 4,
    subject: 'PKN',
    title: 'Makalah Pancasila',
    description: 'Membuat makalah tentang implementasi nilai-nilai Pancasila dalam kehidupan sehari-hari',
    teacher: 'Bpk. Hendra Gunawan',
    dueDate: '2023-12-20',
    status: 'pending',
    attachments: [],
  },
  {
    id: 5,
    subject: 'Bahasa Inggris',
    title: 'Essay Writing',
    description: 'Write a 500-word essay about your dream job',
    teacher: 'Mrs. Linda Wijaya',
    dueDate: '2023-12-12',
    status: 'completed',
    attachments: ['Essay_Guidelines.pdf'],
  },
  {
    id: 6,
    subject: 'IPS',
    title: 'Peta Konsep Sejarah Kemerdekaan',
    description: 'Membuat peta konsep tentang peristiwa sekitar proklamasi kemerdekaan',
    teacher: 'Bpk. Darmawan',
    dueDate: '2023-12-05',
    status: 'overdue',
    attachments: ['Contoh_Peta_Konsep.jpg'],
  },
];

const exams = [
  {
    id: 1,
    subject: 'Matematika',
    title: 'Ulangan Harian Bab 4',
    description: 'Materi Aljabar dan Persamaan Kuadrat',
    date: '2023-12-18',
    status: 'upcoming',
    result: null,
  },
  {
    id: 2,
    subject: 'Bahasa Indonesia',
    title: 'Ulangan Tengah Semester',
    description: 'Mencakup semua materi yang telah dipelajari',
    date: '2023-12-05',
    status: 'completed',
    result: {
      score: 85,
      average: 75,
      highest: 92,
    },
  },
  {
    id: 3,
    subject: 'IPA',
    title: 'Ujian Praktikum',
    description: 'Praktikum di laboratorium',
    date: '2023-11-28',
    status: 'completed',
    result: {
      score: 90,
      average: 78,
      highest: 95,
    },
  },
];

const ParentPortalAssignmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  
  // Filter assignments based on search, status and subject
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    const matchesSubject = filterSubject === 'all' || assignment.subject === filterSubject;
    
    return matchesSearch && matchesStatus && matchesSubject;
  });

  // Get badge style for status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate assignment statistics
  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter(a => a.status === 'completed').length;
  const overdueAssignments = assignments.filter(a => a.status === 'overdue').length;
  const pendingAssignments = assignments.filter(a => a.status === 'pending').length;
  const completionRate = Math.round((completedAssignments / totalAssignments) * 100);

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tugas & PR</h1>
            <p className="text-muted-foreground">
              Pantau tugas dan pekerjaan rumah anak Anda
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Input
              type="search"
              placeholder="Cari tugas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px]"
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Cari
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Total Tugas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{totalAssignments}</span>
                <span className="text-sm text-muted-foreground">Jumlah tugas & PR</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                Selesai
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-600">{completedAssignments}</span>
                <span className="text-sm text-muted-foreground">Tugas dikumpulkan</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                Menunggu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-yellow-600">{pendingAssignments}</span>
                <span className="text-sm text-muted-foreground">Tugas belum dikerjakan</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                Terlambat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-red-600">{overdueAssignments}</span>
                <span className="text-sm text-muted-foreground">Tugas melewati deadline</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Progres Pengerjaan Tugas</CardTitle>
              <CardDescription>Semester 1 - Tahun Ajaran 2023/2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tingkat Penyelesaian Tugas</span>
                  <span className="font-medium">{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="assignments" className="w-full">
            <TabsList className="mb-4 w-full md:w-auto">
              <TabsTrigger value="assignments">Tugas & PR</TabsTrigger>
              <TabsTrigger value="exams">Ujian & Ulangan</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal Mendatang</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assignments" className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">
                <div className="space-x-2">
                  <Badge
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterStatus('all')}
                  >
                    Semua
                  </Badge>
                  <Badge
                    variant={filterStatus === 'pending' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterStatus('pending')}
                  >
                    Menunggu
                  </Badge>
                  <Badge
                    variant={filterStatus === 'completed' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterStatus('completed')}
                  >
                    Selesai
                  </Badge>
                  <Badge
                    variant={filterStatus === 'overdue' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFilterStatus('overdue')}
                  >
                    Terlambat
                  </Badge>
                </div>
                
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Mata Pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
                    <SelectItem value="Matematika">Matematika</SelectItem>
                    <SelectItem value="Bahasa Indonesia">Bahasa Indonesia</SelectItem>
                    <SelectItem value="Bahasa Inggris">Bahasa Inggris</SelectItem>
                    <SelectItem value="IPA">IPA</SelectItem>
                    <SelectItem value="IPS">IPS</SelectItem>
                    <SelectItem value="PKN">PKN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{assignment.subject}</Badge>
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(assignment.status)}`}>
                                {assignment.status === 'pending' ? 'Menunggu' : 
                                assignment.status === 'completed' ? 'Selesai' : 'Terlambat'}
                              </span>
                            </div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                            <div className="mt-2 text-sm">
                              <p><span className="text-muted-foreground">Guru:</span> {assignment.teacher}</p>
                              <p className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-muted-foreground mr-1">Tenggat:</span> 
                                {format(new Date(assignment.dueDate), 'EEEE, dd MMM yyyy')}
                              </p>
                            </div>
                          </div>
                          <div className="flex md:flex-col justify-between items-end gap-2">
                            {assignment.attachments.length > 0 && (
                              <div className="text-sm">
                                <span className="text-muted-foreground block mb-1">Lampiran:</span>
                                {assignment.attachments.map((attachment, index) => (
                                  <Button key={index} variant="outline" size="sm" className="w-full text-xs mb-1">
                                    <FileText className="h-3 w-3 mr-1" /> {attachment}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 bg-muted/20 rounded-lg">
                    <FileText className="h-12 w-12 mx-auto text-muted mb-2" />
                    <h3 className="text-lg font-medium">Tidak ada tugas ditemukan</h3>
                    <p className="text-muted-foreground">
                      Coba ubah filter atau kata kunci pencarian
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="exams" className="space-y-4">
              <div className="space-y-3">
                {exams.map((exam) => (
                  <Card key={exam.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{exam.subject}</Badge>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(exam.status)}`}>
                              {exam.status === 'upcoming' ? 'Akan Datang' : 'Selesai'}
                            </span>
                          </div>
                          <h3 className="font-medium">{exam.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{exam.description}</p>
                          <div className="mt-2 text-sm">
                            <p className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-muted-foreground mr-1">Tanggal:</span> 
                              {format(new Date(exam.date), 'EEEE, dd MMM yyyy')}
                            </p>
                          </div>
                        </div>
                        {exam.result && (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium mb-2">Hasil:</p>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Nilai:</p>
                                <p className="font-bold text-green-600">{exam.result.score}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Rata-rata:</p>
                                <p className="font-medium">{exam.result.average}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Tertinggi:</p>
                                <p className="font-medium">{exam.result.highest}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Tugas & Ujian Mendatang</CardTitle>
                  <CardDescription>
                    Kalender tenggat waktu untuk 2 minggu ke depan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">Senin, 5 December 2023</p>
                      <div className="mt-2 space-y-2">
                        <div className="bg-blue-50 p-2 rounded">
                          <Badge variant="outline" className="mb-1">Bahasa Indonesia</Badge>
                          <p className="font-medium text-sm">Ulangan Tengah Semester</p>
                          <p className="text-xs text-muted-foreground">08:00 - 09:30</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">Jumat, 8 December 2023</p>
                      <div className="mt-2 space-y-2">
                        <div className="bg-red-50 p-2 rounded">
                          <Badge variant="outline" className="mb-1">IPA</Badge>
                          <p className="font-medium text-sm">Batas Pengumpulan Laporan Praktikum</p>
                          <p className="text-xs text-muted-foreground">23:59</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">Sabtu, 10 December 2023</p>
                      <div className="mt-2 space-y-2">
                        <div className="bg-green-50 p-2 rounded">
                          <Badge variant="outline" className="mb-1">Bahasa Indonesia</Badge>
                          <p className="font-medium text-sm">Tenggat Laporan Buku Fiksi</p>
                          <p className="text-xs text-muted-foreground">12:00</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">Selasa, 12 December 2023</p>
                      <div className="mt-2 space-y-2">
                        <div className="bg-yellow-50 p-2 rounded">
                          <Badge variant="outline" className="mb-1">Bahasa Inggris</Badge>
                          <p className="font-medium text-sm">Essay Writing Submission</p>
                          <p className="text-xs text-muted-foreground">15:00</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">Jumat, 15 December 2023</p>
                      <div className="mt-2 space-y-2">
                        <div className="bg-purple-50 p-2 rounded">
                          <Badge variant="outline" className="mb-1">Matematika</Badge>
                          <p className="font-medium text-sm">Tugas Aljabar Persamaan Linier</p>
                          <p className="text-xs text-muted-foreground">Pukul 14:00</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">Senin, 18 December 2023</p>
                      <div className="mt-2 space-y-2">
                        <div className="bg-blue-50 p-2 rounded">
                          <Badge variant="outline" className="mb-1">Matematika</Badge>
                          <p className="font-medium text-sm">Ulangan Harian Bab 4</p>
                          <p className="text-xs text-muted-foreground">10:00 - 11:30</p>
                        </div>
                      </div>
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

export default ParentPortalAssignmentsPage;
