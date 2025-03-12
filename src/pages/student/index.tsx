
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, List, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const StudentManagementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Data Kesiswaan - Si-Kaji';
  }, []);

  // Sample student data
  const students = [
    { id: 1, name: 'Andi Saputra', class: 'XII RPL 1', nisn: '0012345678' },
    { id: 2, name: 'Budi Santoso', class: 'XII RPL 1', nisn: '0012345679' },
    { id: 3, name: 'Cindy Permata', class: 'XII RPL 2', nisn: '0012345680' },
    { id: 4, name: 'Deni Wijaya', class: 'XII RPL 2', nisn: '0012345681' },
    { id: 5, name: 'Eka Putri', class: 'XII RPL 3', nisn: '0012345682' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Manajemen Data Kesiswaan</h1>
                <p className="text-muted-foreground mt-1">Kelola data siswa SMKN 1 Kendal</p>
              </div>
              <Button className="flex items-center gap-2">
                <UserPlus size={18} />
                Tambah Siswa
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari siswa..."
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
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">NISN</th>
                        <th className="py-3 px-4 text-left font-medium">Nama</th>
                        <th className="py-3 px-4 text-left font-medium">Kelas</th>
                        <th className="py-3 px-4 text-right font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{student.nisn}</td>
                          <td className="py-3 px-4">{student.name}</td>
                          <td className="py-3 px-4">{student.class}</td>
                          <td className="py-3 px-4 text-right">
                            <Link to={`/student/${student.id}`}>
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

export default StudentManagementPage;
