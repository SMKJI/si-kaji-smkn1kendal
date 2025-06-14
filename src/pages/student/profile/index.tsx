
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap } from 'lucide-react';

const StudentProfilePage = () => {
  // Mock student data
  const studentData = {
    name: "Ahmad Rizki",
    nis: "20240001",
    class: "XI RPL 1",
    email: "ahmad.rizki@student.smkn1kendal.sch.id",
    phone: "081234567890",
    address: "Jl. Pemuda No. 123, Kendal",
    birthDate: "2007-05-15",
    parentName: "Budi Santoso",
    parentPhone: "081234567891",
    status: "Aktif"
  };

  return (
    <DashboardLayout
      title="Profil Saya"
      description="Informasi lengkap data pribadi siswa"
      userRole="student"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Data Pribadi
            </CardTitle>
            <CardDescription>Informasi dasar siswa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Nama Lengkap:</span>
              <span>{studentData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">NIS:</span>
              <span>{studentData.nis}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Kelas:</span>
              <Badge variant="secondary">{studentData.class}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <Badge variant="default">{studentData.status}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Kontak
            </CardTitle>
            <CardDescription>Informasi kontak siswa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span className="text-sm">{studentData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Telepon:</span>
              <span>{studentData.phone}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="font-medium">Alamat:</span>
              <span className="text-right text-sm">{studentData.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tanggal Lahir:</span>
              <span>{new Date(studentData.birthDate).toLocaleDateString('id-ID')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Data Orang Tua
            </CardTitle>
            <CardDescription>Informasi kontak orang tua/wali</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Nama Orang Tua:</span>
              <span>{studentData.parentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Telepon Orang Tua:</span>
              <span>{studentData.parentPhone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Informasi Akademik
            </CardTitle>
            <CardDescription>Status akademik saat ini</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Tahun Masuk:</span>
              <span>2023</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Semester:</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Wali Kelas:</span>
              <span>Ibu Siti Nurhaliza, S.Pd</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfilePage;
