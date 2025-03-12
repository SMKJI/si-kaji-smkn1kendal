import React, { useEffect } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentDataPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Data Siswa - Si-Kaji';
  }, []);

  // Sample student data
  const achievements = [
    { id: 1, title: 'Juara 1 Lomba Web Design Tingkat Kabupaten', year: '2022', certificate: 'certificate1.pdf' },
    { id: 2, title: 'Juara 2 Lomba Competitive Programming', year: '2023', certificate: 'certificate2.pdf' },
    { id: 3, title: 'Peserta Olimpiade Informatika Tingkat Provinsi', year: '2023', certificate: 'certificate3.pdf' }
  ];

  const attendance = {
    present: 95,
    sick: 3,
    absent: 1,
    leave: 1
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <h1 className="text-3xl font-bold mb-6">Data Siswa</h1>
          <Tabs defaultValue="biodata" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="biodata">Biodata</TabsTrigger>
              <TabsTrigger value="achievements">Prestasi</TabsTrigger>
              <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
            </TabsList>
            
            <TabsContent value="biodata">
              <Card>
                <CardHeader>
                  <CardTitle>Biodata Siswa</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Biodata content */}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Prestasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">Tahun {achievement.year}</p>
                          </div>
                          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            {achievement.year}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Kehadiran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Hadir</p>
                      <p className="text-2xl font-bold text-green-600">{attendance.present}%</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Sakit</p>
                      <p className="text-2xl font-bold text-yellow-600">{attendance.sick}%</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Izin</p>
                      <p className="text-2xl font-bold text-blue-600">{attendance.leave}%</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Tanpa Keterangan</p>
                      <p className="text-2xl font-bold text-red-600">{attendance.absent}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default StudentDataPage;
