
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Plus, Users, Filter, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ClassManagementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Kelas - Si-Kaji';
  }, []);

  const [tabValue, setTabValue] = useState('all');

  // Sample class data
  const classes = [
    { id: 1, name: 'XII RPL 1', totalStudents: 36, homeroom: 'Budi Santoso, S.Pd.', year: '2023/2024' },
    { id: 2, name: 'XII RPL 2', totalStudents: 35, homeroom: 'Dian Pertiwi, M.Pd.', year: '2023/2024' },
    { id: 3, name: 'XII RPL 3', totalStudents: 34, homeroom: 'Rudi Hermawan, S.Kom.', year: '2023/2024' },
    { id: 4, name: 'XI RPL 1', totalStudents: 36, homeroom: 'Ani Suryani, S.Pd.', year: '2023/2024' },
    { id: 5, name: 'XI RPL 2', totalStudents: 36, homeroom: 'Tono Wijaya, S.T.', year: '2023/2024' },
    { id: 6, name: 'X RPL 1', totalStudents: 36, homeroom: 'Siti Rahayu, S.Pd.', year: '2023/2024' },
    { id: 7, name: 'X RPL 2', totalStudents: 35, homeroom: 'Joko Susilo, S.Kom.', year: '2023/2024' },
  ];

  // Filter classes by grade level based on tab
  const filteredClasses = classes.filter(classItem => {
    if (tabValue === 'all') return true;
    return classItem.name.startsWith(tabValue);
  });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Manajemen Kelas</h1>
                <p className="text-muted-foreground mt-1">Kelola data kelas dan wali kelas SMKN 1 Kendal</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                Tambah Kelas Baru
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari kelas..."
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
                <Tabs defaultValue="all" className="mb-6" onValueChange={setTabValue}>
                  <TabsList>
                    <TabsTrigger value="all">Semua</TabsTrigger>
                    <TabsTrigger value="X">Kelas X</TabsTrigger>
                    <TabsTrigger value="XI">Kelas XI</TabsTrigger>
                    <TabsTrigger value="XII">Kelas XII</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClasses.map((classItem) => (
                    <Link to={`/class/${classItem.id}`} key={classItem.id} className="block">
                      <Card className="hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-lg">{classItem.name}</h3>
                            <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                              {classItem.year}
                            </div>
                          </div>
                          <div className="flex items-center text-muted-foreground gap-1 text-sm mb-2">
                            <Users size={16} />
                            <span>{classItem.totalStudents} siswa</span>
                          </div>
                          <div className="mt-4 pt-3 border-t">
                            <p className="text-sm text-muted-foreground mb-1">Wali Kelas:</p>
                            <p className="font-medium">{classItem.homeroom}</p>
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

export default ClassManagementPage;
