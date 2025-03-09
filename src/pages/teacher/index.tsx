
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Filter, List, Briefcase, Phone, Mail, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TeacherManagementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Guru - Si-Kaji';
  }, []);

  // Sample teacher data
  const teachers = [
    { 
      id: 1, 
      name: 'Budi Santoso, S.Pd.', 
      photo: '', 
      subject: 'Bahasa Indonesia',
      email: 'budi.santoso@example.com',
      phone: '08123456789',
      homeroom: 'XII RPL 1',
      status: 'PNS'
    },
    { 
      id: 2, 
      name: 'Dian Pertiwi, M.Pd.', 
      photo: '', 
      subject: 'Matematika',
      email: 'dian.pertiwi@example.com',
      phone: '08123456790',
      homeroom: 'XII RPL 2',
      status: 'PNS'
    },
    { 
      id: 3, 
      name: 'Rudi Hermawan, S.Kom.', 
      photo: '', 
      subject: 'Pemrograman',
      email: 'rudi.hermawan@example.com',
      phone: '08123456791',
      homeroom: 'XII RPL 3',
      status: 'Honorer'
    },
    { 
      id: 4, 
      name: 'Ani Suryani, S.Pd.', 
      photo: '', 
      subject: 'Bahasa Inggris',
      email: 'ani.suryani@example.com',
      phone: '08123456792',
      homeroom: 'XI RPL 1',
      status: 'PNS'
    },
    { 
      id: 5, 
      name: 'Tono Wijaya, S.T.', 
      photo: '', 
      subject: 'Basis Data',
      email: 'tono.wijaya@example.com',
      phone: '08123456793',
      homeroom: 'XI RPL 2',
      status: 'Honorer'
    },
    { 
      id: 6, 
      name: 'Siti Rahayu, S.Pd.', 
      photo: '', 
      subject: 'Kimia',
      email: 'siti.rahayu@example.com',
      phone: '08123456794',
      homeroom: 'X RPL 1',
      status: 'PNS'
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Manajemen Guru</h1>
                <p className="text-muted-foreground mt-1">Kelola data guru dan wali kelas SMKN 1 Kendal</p>
              </div>
              <Button className="flex items-center gap-2">
                <UserPlus size={18} />
                Tambah Guru
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari guru..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      Filter
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <List size={16} />
                      Kolom
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teachers.map((teacher) => (
                    <Link to={`/teacher/${teacher.id}`} key={teacher.id} className="block">
                      <Card className="hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-14 w-14">
                              <AvatarImage src={teacher.photo} alt={teacher.name} />
                              <AvatarFallback className="text-lg">
                                {teacher.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-lg">{teacher.name}</h3>
                              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                <Briefcase size={14} />
                                <span>{teacher.subject}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{teacher.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{teacher.phone}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Wali Kelas</p>
                              <div className="flex items-center gap-1">
                                <GraduationCap className="h-4 w-4 text-primary" />
                                <span className="font-medium">{teacher.homeroom}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Status</p>
                              <span className={`px-2 py-1 rounded text-xs ${
                                teacher.status === 'PNS' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {teacher.status}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
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

export default TeacherManagementPage;
