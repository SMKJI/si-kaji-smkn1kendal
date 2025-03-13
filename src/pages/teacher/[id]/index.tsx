import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TeacherProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const teacherId = parseInt(id || '0');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Profil Guru ${teacherData?.name || ''} - Si-Kaji`;
  }, [id]);

  // Sample teacher data
  const teacherData = {
    id: teacherId,
    name: 'Budi Santoso, S.Pd.',
    photo: '',
    nip: '198705132008011003',
    subject: 'Bahasa Indonesia',
    email: 'budi.santoso@example.com',
    phone: '08123456789',
    address: 'Jl. Pahlawan No. 123, Kendal',
    dateOfBirth: '13 Mei 1987',
    education: 'S1 Pendidikan Bahasa Indonesia, Universitas Negeri Semarang (2009)',
    joinDate: '1 Agustus 2010',
    status: 'PNS',
    homeroom: 'XII RPL 1'
  };

  if (!teacherData) {
    return (
      <DashboardLayout
        title="Profil Tidak Ditemukan"
        description="Guru yang Anda cari tidak ditemukan"
        showBackButton
        backTo="/teacher"
        userRole="admin"
      >
        <div className="text-center py-12">
          <p>Guru dengan ID {id} tidak ditemukan</p>
          <Button className="mt-4" variant="outline" onClick={() => window.history.back()}>
            Kembali
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={teacherData.name}
      description={`${teacherData.subject} - NIP: ${teacherData.nip}`}
      showBackButton
      backTo="/teacher"
      backLabel="Kembali ke Daftar Guru"
      userRole="admin"
      userName="Admin System"
    >
      <Tabs defaultValue="profile" className="w-full mt-4">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="class">Kelas yang Diampu</TabsTrigger>
          <TabsTrigger value="schedule">Jadwal Mengajar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-auto flex flex-col items-center space-y-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={teacherData.photo} alt={teacherData.name} />
                    <AvatarFallback className="text-2xl">
                      {teacherData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <Button variant="outline" size="sm" className="mt-2 flex items-center gap-1 w-full md:w-auto">
                    <Pencil size={14} />
                    Edit Profil
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col mb-4">
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{teacherData.subject}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                        teacherData.status === 'PNS' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {teacherData.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{teacherData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{teacherData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{teacherData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{teacherData.dateOfBirth}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>Wali Kelas: {teacherData.homeroom}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Bergabung: {teacherData.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-2">Pendidikan</h3>
                    <p>{teacherData.education}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="class">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Kelas yang Diampu</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">XII RPL 1</h4>
                    <p className="text-sm text-muted-foreground">Bahasa Indonesia - 4 jam/minggu</p>
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
                <div className="p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">XII RPL 2</h4>
                    <p className="text-sm text-muted-foreground">Bahasa Indonesia - 4 jam/minggu</p>
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
                <div className="p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">XI RPL 1</h4>
                    <p className="text-sm text-muted-foreground">Bahasa Indonesia - 4 jam/minggu</p>
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Jadwal Mengajar</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border py-2 px-3 text-left">Hari</th>
                      <th className="border py-2 px-3 text-left">Jam</th>
                      <th className="border py-2 px-3 text-left">Kelas</th>
                      <th className="border py-2 px-3 text-left">Ruangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border py-2 px-3" rowSpan={2}>Senin</td>
                      <td className="border py-2 px-3">07:00 - 08:30</td>
                      <td className="border py-2 px-3">XII RPL 1</td>
                      <td className="border py-2 px-3">R-23</td>
                    </tr>
                    <tr>
                      <td className="border py-2 px-3">10:15 - 11:45</td>
                      <td className="border py-2 px-3">XI RPL 1</td>
                      <td className="border py-2 px-3">R-15</td>
                    </tr>
                    <tr>
                      <td className="border py-2 px-3" rowSpan={1}>Selasa</td>
                      <td className="border py-2 px-3">12:30 - 14:00</td>
                      <td className="border py-2 px-3">XII RPL 2</td>
                      <td className="border py-2 px-3">R-24</td>
                    </tr>
                    <tr>
                      <td className="border py-2 px-3" rowSpan={2}>Rabu</td>
                      <td className="border py-2 px-3">07:00 - 08:30</td>
                      <td className="border py-2 px-3">XI RPL 1</td>
                      <td className="border py-2 px-3">R-15</td>
                    </tr>
                    <tr>
                      <td className="border py-2 px-3">08:30 - 10:00</td>
                      <td className="border py-2 px-3">XII RPL 1</td>
                      <td className="border py-2 px-3">R-23</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TeacherProfilePage;
