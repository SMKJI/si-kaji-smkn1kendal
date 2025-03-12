
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Pencil, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
            <p>Guru tidak ditemukan</p>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <Link to="/teacher">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronLeft size={16} />
                  Kembali
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={teacherData.photo} alt={teacherData.name} />
                    <AvatarFallback className="text-2xl">
                      {teacherData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div>
                        <h1 className="text-2xl font-bold">{teacherData.name}</h1>
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
                      <Button variant="outline" size="sm" className="mt-2 md:mt-0 flex items-center gap-1">
                        <Pencil size={14} />
                        Edit Profil
                      </Button>
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
                  </div>
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

export default TeacherProfilePage;
