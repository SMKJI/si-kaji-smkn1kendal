
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, Mail, Phone, MapPin, Calendar, School, 
  BookOpen, FileText, Award, Activity, Shield,
  Download, Edit, Clock
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';

const StudentProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Profil Siswa - Si-Kaji';
  }, []);

  // Sample student data
  const student = {
    id: 'S12345',
    name: 'Ahmad Rizki Pratama',
    nisn: '0054178901',
    nis: '2021001',
    class: 'XII RPL 1',
    gender: 'Laki-laki',
    photo: '/placeholder.svg',
    birthplace: 'Kendal',
    birthdate: '15 Oktober 2004',
    religion: 'Islam',
    address: 'Jl. Merdeka No. 123, Kendal',
    phone: '081234567890',
    email: 'ahmad.rizki@gmail.com',
    joinDate: '15 Juli 2021',
    status: 'Aktif',
    parent: {
      father: 'Budi Santoso',
      fatherOccupation: 'Wiraswasta',
      fatherPhone: '081234567891',
      mother: 'Siti Rahayu',
      motherOccupation: 'Ibu Rumah Tangga',
      motherPhone: '081234567892',
      address: 'Jl. Merdeka No. 123, Kendal',
    }
  };

  // Sample attendance data
  const attendanceData = [
    { month: 'Juli 2023', present: 20, sick: 1, permission: 0, absent: 0, late: 2 },
    { month: 'Agustus 2023', present: 21, sick: 0, permission: 1, absent: 0, late: 0 },
    { month: 'September 2023', present: 19, sick: 2, permission: 1, absent: 0, late: 1 },
  ];

  // Sample achievement data
  const achievements = [
    { id: 1, title: 'Juara 1 Lomba Web Design', date: '15 April 2023', level: 'Kabupaten' },
    { id: 2, title: 'Juara 2 Olimpiade Matematika', date: '20 Mei 2023', level: 'Provinsi' },
  ];

  // Sample discipline/violation data
  const violations = [
    { id: 1, date: '5 Agustus 2023', type: 'Terlambat', points: -5, description: 'Terlambat masuk sekolah', status: 'Sudah diresolusi' },
    { id: 2, date: '12 September 2023', type: 'Seragam', points: -5, description: 'Tidak memakai atribut lengkap', status: 'Sudah diresolusi' },
  ];

  // Sample academic records
  const academicResults = [
    { semester: 'Ganjil 2022/2023', gpa: 3.75, rank: 5, attendance: '98%' },
    { semester: 'Genap 2022/2023', gpa: 3.78, rank: 3, attendance: '97%' },
    { semester: 'Ganjil 2023/2024', gpa: 3.82, rank: 2, attendance: '95%' },
  ];

  return (
    <DashboardLayout
      title="Profil Siswa"
      description="Detail data siswa dan akademik"
      userRole="student"
      userName={student.name}
      showBackButton
      backTo="/student-data"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={student.photo} alt={student.name} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-center">{student.name}</h2>
            <p className="text-muted-foreground text-center">{student.nisn} / {student.nis}</p>
            <Badge className="mt-2">{student.class}</Badge>
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">{student.gender}</div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">{student.email}</div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">{student.phone}</div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">{student.birthplace}, {student.birthdate}</div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">{student.address}</div>
              </div>
              <div className="flex items-center gap-3">
                <School className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">Tahun Masuk: {student.joinDate}</div>
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full" onClick={() => navigate('/student-data/edit')}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Profil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="academic" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="academic">Akademik</TabsTrigger>
              <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
              <TabsTrigger value="achievement">Prestasi</TabsTrigger>
              <TabsTrigger value="discipline">Kedisiplinan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Data Akademik</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Semester</TableHead>
                        <TableHead>Rata-rata</TableHead>
                        <TableHead>Peringkat</TableHead>
                        <TableHead>Kehadiran</TableHead>
                        <TableHead className="text-right">Detail</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {academicResults.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{record.semester}</TableCell>
                          <TableCell>{record.gpa}</TableCell>
                          <TableCell>{record.rank}</TableCell>
                          <TableCell>{record.attendance}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="link" size="sm">
                              <FileText className="h-4 w-4 mr-1" /> Lihat
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Unduh Rapor
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Data Kehadiran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {attendanceData.map((month, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">{month.month}</h3>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" /> 
                            {month.present + month.sick + month.permission + month.absent} hari
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Hadir</span>
                            <span className="text-lg font-semibold text-green-500">{month.present}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Sakit</span>
                            <span className="text-lg font-semibold text-yellow-500">{month.sick}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Izin</span>
                            <span className="text-lg font-semibold text-blue-500">{month.permission}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Absen</span>
                            <span className="text-lg font-semibold text-red-500">{month.absent}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Terlambat</span>
                            <span className="text-lg font-semibold text-amber-500">{month.late}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Tingkat kehadiran</span>
                            <span>{((month.present / (month.present + month.sick + month.permission + month.absent)) * 100).toFixed(0)}%</span>
                          </div>
                          <Progress value={(month.present / (month.present + month.sick + month.permission + month.absent)) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Unduh Rekap Kehadiran
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievement">
              <Card>
                <CardHeader>
                  <CardTitle>Prestasi</CardTitle>
                </CardHeader>
                <CardContent>
                  {achievements.length > 0 ? (
                    <div className="space-y-4">
                      {achievements.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <div className="flex items-center gap-2 mt-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{item.date}</span>
                              </div>
                            </div>
                            <Badge>{item.level}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Award className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">Belum ada data prestasi</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discipline">
              <Card>
                <CardHeader>
                  <CardTitle>Kedisiplinan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 border rounded-lg bg-muted/30">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <h3 className="font-semibold">Total Poin</h3>
                        <p className="text-sm text-muted-foreground">Tahun Akademik 2023/2024</p>
                      </div>
                      <div className="text-3xl font-bold">90</div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Status Kedisiplinan</span>
                        <span>90/100</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                  
                  {violations.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Riwayat Pelanggaran</h3>
                      {violations.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{item.type}</h3>
                                <Badge variant="destructive">{item.points} poin</Badge>
                              </div>
                              <p className="text-sm mt-1">{item.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{item.date}</span>
                              </div>
                            </div>
                            <Badge variant="outline">{item.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">Tidak ada catatan pelanggaran</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfilePage;
