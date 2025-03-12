import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const TeacherManagementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Guru - Si-Kaji';
  }, []);

  // Sample teacher data
  const teachers = [
    { id: 1, name: 'Budi Santoso, S.Pd.', subject: 'Bahasa Indonesia', nip: '198705132008011003' },
    { id: 2, name: 'Ani Suryani, S.Pd.', subject: 'Matematika', nip: '198602252009022004' },
    { id: 3, name: 'Dedi Kurniawan, M.Pd.', subject: 'Produktif RPL', nip: '198412102010011005' },
    { id: 4, name: 'Siti Rahayu, S.Pd.', subject: 'Bahasa Inggris', nip: '199001152011012006' },
    { id: 5, name: 'Tono Wijaya, S.T.', subject: 'Produktif TKJ', nip: '198805202012011007' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Manajemen Guru</h1>
                <p className="text-muted-foreground mt-1">Kelola data guru SMKN 1 Kendal</p>
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
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">NIP</th>
                        <th className="py-3 px-4 text-left font-medium">Nama</th>
                        <th className="py-3 px-4 text-left font-medium">Mata Pelajaran</th>
                        <th className="py-3 px-4 text-right font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher) => (
                        <tr key={teacher.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{teacher.nip}</td>
                          <td className="py-3 px-4">{teacher.name}</td>
                          <td className="py-3 px-4">{teacher.subject}</td>
                          <td className="py-3 px-4 text-right">
                            <Link to={`/teacher/${teacher.id}`}>
                              <Button variant="link" className="h-auto p-0">Lihat Detail</Button>
                            </Link>
                          </td>
                        </tr>
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

export default TeacherManagementPage;
