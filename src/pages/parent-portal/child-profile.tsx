
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Heart, Users, BookOpen, Award } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

const childData = {
  personal: {
    name: "Andi Saputra",
    nisn: "0012345678",
    nis: "20240001",
    photo: "https://i.pravatar.cc/150?img=3",
    birthPlace: "Kendal",
    birthDate: "2007-05-15",
    gender: "Laki-laki",
    religion: "Islam",
    bloodType: "O",
    address: "Jl. Pemuda No. 123, Kendal, Jawa Tengah",
    phone: "081234567890",
    email: "andi.saputra@student.smkn1kendal.sch.id"
  },
  academic: {
    class: "XII RPL 1",
    major: "Rekayasa Perangkat Lunak",
    academicYear: "2023/2024",
    semester: 3,
    entryYear: 2023,
    graduationYear: 2026,
    homeRoomTeacher: "Ibu Siti Nurhaliza, S.Pd",
    studentId: "S2023001"
  },
  family: {
    fatherName: "Budi Santoso",
    fatherJob: "Wiraswasta",
    fatherPhone: "081234567891",
    fatherEmail: "budi.santoso@email.com",
    motherName: "Siti Rahayu",
    motherJob: "Ibu Rumah Tangga", 
    motherPhone: "081234567892",
    motherEmail: "siti.rahayu@email.com",
    guardianName: "-",
    guardianPhone: "-",
    familyAddress: "Jl. Pemuda No. 123, Kendal, Jawa Tengah"
  },
  health: {
    height: "170 cm",
    weight: "60 kg",
    bloodType: "O",
    allergies: "Tidak ada",
    medicalHistory: "Tidak ada riwayat penyakit serius",
    emergencyContact: "Budi Santoso (081234567891)"
  },
  achievements: [
    {
      id: "A001",
      title: "Juara 2 Lomba Web Design",
      level: "Kota",
      year: "2023",
      organizer: "Dinas Pendidikan Kota Kendal"
    },
    {
      id: "A002", 
      title: "Siswa Berprestasi",
      level: "Sekolah",
      year: "2023",
      organizer: "SMKN 1 Kendal"
    }
  ],
  extracurricular: [
    {
      name: "Programming Club",
      position: "Anggota",
      year: "2023-2024"
    },
    {
      name: "Rohani Islam",
      position: "Sekretaris",
      year: "2023-2024"
    }
  ]
};

const ParentChildProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("personal");

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Profil Anak</h1>
            <p className="text-muted-foreground">
              Informasi lengkap data anak
            </p>
          </div>
        </div>

        {/* Header Card with Photo */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={childData.personal.photo} alt={childData.personal.name} />
                <AvatarFallback className="text-2xl">{childData.personal.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">{childData.personal.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">NISN:</span> {childData.personal.nisn}
                  </div>
                  <div>
                    <span className="font-medium">NIS:</span> {childData.personal.nis}
                  </div>
                  <div>
                    <span className="font-medium">Kelas:</span> {childData.academic.class}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <Badge variant="secondary">{childData.academic.major}</Badge>
                  <Badge variant="outline">{childData.academic.academicYear}</Badge>
                  <Badge variant="outline">Semester {childData.academic.semester}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
            <TabsTrigger value="academic">Akademik</TabsTrigger>
            <TabsTrigger value="family">Keluarga</TabsTrigger>
            <TabsTrigger value="health">Kesehatan</TabsTrigger>
            <TabsTrigger value="activities">Kegiatan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Identitas Diri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Nama Lengkap:</span>
                    <span>{childData.personal.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">NISN:</span>
                    <span>{childData.personal.nisn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tempat Lahir:</span>
                    <span>{childData.personal.birthPlace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tanggal Lahir:</span>
                    <span>{new Date(childData.personal.birthDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Jenis Kelamin:</span>
                    <span>{childData.personal.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Agama:</span>
                    <span>{childData.personal.religion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Golongan Darah:</span>
                    <span>{childData.personal.bloodType}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Kontak & Alamat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium block mb-1">Alamat:</span>
                    <span className="text-sm">{childData.personal.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Telepon:</span>
                    <span>{childData.personal.phone}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Email:</span>
                    <span className="text-sm">{childData.personal.email}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="academic" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Status Akademik
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Kelas:</span>
                    <span>{childData.academic.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Jurusan:</span>
                    <span>{childData.academic.major}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tahun Pelajaran:</span>
                    <span>{childData.academic.academicYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Semester:</span>
                    <span>{childData.academic.semester}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tahun Masuk:</span>
                    <span>{childData.academic.entryYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tahun Lulus:</span>
                    <span>{childData.academic.graduationYear}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Informasi Kelas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">ID Siswa:</span>
                    <span>{childData.academic.studentId}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Wali Kelas:</span>
                    <span>{childData.academic.homeRoomTeacher}</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Anak Anda saat ini berada di kelas {childData.academic.class} 
                      dengan fokus pembelajaran {childData.academic.major}.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="family" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Ayah</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Nama:</span>
                    <span>{childData.family.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pekerjaan:</span>
                    <span>{childData.family.fatherJob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Telepon:</span>
                    <span>{childData.family.fatherPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span className="text-sm">{childData.family.fatherEmail}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Ibu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Nama:</span>
                    <span>{childData.family.motherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pekerjaan:</span>
                    <span>{childData.family.motherJob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Telepon:</span>
                    <span>{childData.family.motherPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span className="text-sm">{childData.family.motherEmail}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Alamat Keluarga</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{childData.family.familyAddress}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Data Kesehatan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Tinggi Badan:</span>
                      <span>{childData.health.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Berat Badan:</span>
                      <span>{childData.health.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Golongan Darah:</span>
                      <span>{childData.health.bloodType}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium block mb-1">Alergi:</span>
                      <span>{childData.health.allergies}</span>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Riwayat Penyakit:</span>
                      <span>{childData.health.medicalHistory}</span>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Kontak Darurat:</span>
                      <span>{childData.health.emergencyContact}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activities" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Prestasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {childData.achievements.map((achievement) => (
                      <div key={achievement.id} className="border rounded-lg p-3">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>Tingkat: {achievement.level}</p>
                          <p>Tahun: {achievement.year}</p>
                          <p>Penyelenggara: {achievement.organizer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Ekstrakurikuler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {childData.extracurricular.map((activity, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h4 className="font-medium">{activity.name}</h4>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>Posisi: {activity.position}</p>
                          <p>Periode: {activity.year}</p>
                        </div>
                      </div>
                    ))}
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

export default ParentChildProfilePage;
