
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Trophy, Calendar, Clock, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const AchievementsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Prestasi Siswa - Si-Kaji';
  }, []);

  // Sample achievement data
  const achievements = [
    {
      id: 1,
      student: 'Andi Saputra',
      class: 'XII RPL 1',
      title: 'Juara 1 Lomba Web Design Tingkat Kabupaten',
      category: 'Akademik',
      level: 'Kabupaten',
      date: '15 April 2023',
      venue: 'SMKN 1 Kendal',
      coach: 'Budi Santoso, S.Pd.'
    },
    {
      id: 2,
      student: 'Siti Nurhaliza',
      class: 'XI RPL 3',
      title: 'Juara 2 Olimpiade Matematika',
      category: 'Akademik',
      level: 'Provinsi',
      date: '20 Mei 2023',
      venue: 'Universitas Diponegoro',
      coach: 'Ani Suryani, S.Pd.'
    },
    {
      id: 3,
      student: 'Ahmad Fariz',
      class: 'X TKJ 2',
      title: 'Juara 1 Lomba Futsal Antar SMA/SMK',
      category: 'Olahraga',
      level: 'Kota',
      date: '2 Juni 2023',
      venue: 'GOR Kendal',
      coach: 'Joko Susilo, S.Pd.'
    },
    {
      id: 4,
      student: 'Dewi Kartika',
      class: 'XII AKL 1',
      title: 'Juara 3 Lomba Karya Tulis Ilmiah',
      category: 'Akademik',
      level: 'Nasional',
      date: '10 Juli 2023',
      venue: 'Jakarta Convention Center',
      coach: 'Siti Rahayu, S.Pd.'
    },
    {
      id: 5,
      student: 'Rizki Ramadhan',
      class: 'XI MM 2',
      title: 'Juara 1 Desain Poster',
      category: 'Seni',
      level: 'Provinsi',
      date: '25 Agustus 2023',
      venue: 'Gedung Semarang Creative Hub',
      coach: 'Tono Wijaya, S.T.'
    }
  ];

  const getLevelBadge = (level) => {
    switch(level) {
      case 'Kabupaten':
        return <Badge className="bg-blue-500">Kabupaten</Badge>;
      case 'Kota':
        return <Badge className="bg-green-500">Kota</Badge>;
      case 'Provinsi':
        return <Badge className="bg-purple-500">Provinsi</Badge>;
      case 'Nasional':
        return <Badge className="bg-orange-500">Nasional</Badge>;
      case 'Internasional':
        return <Badge className="bg-red-500">Internasional</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };

  const getCategoryBadge = (category) => {
    switch(category) {
      case 'Akademik':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Akademik</Badge>;
      case 'Olahraga':
        return <Badge variant="outline" className="border-green-500 text-green-500">Olahraga</Badge>;
      case 'Seni':
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Seni</Badge>;
      case 'Teknologi':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Teknologi</Badge>;
      default:
        return <Badge variant="outline">{category}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Prestasi Siswa"
      description="Catatan prestasi siswa SMKN 1 Kendal"
      userRole="admin"
      userName="Administrator"
      showBackButton
      backTo="/dashboard"
    >
      <div className="mb-4 flex justify-end">
        <Button className="gap-2">
          <Trophy size={16} />
          Tambah Prestasi
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-3 sm:flex sm:flex-row">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="academic">Akademik</TabsTrigger>
          <TabsTrigger value="sports">Olahraga</TabsTrigger>
          <TabsTrigger value="arts">Seni</TabsTrigger>
          <TabsTrigger value="technology">Teknologi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Daftar Prestasi</CardTitle>
              <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari prestasi..."
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
              <div className="space-y-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{achievement.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          {getCategoryBadge(achievement.category)}
                          {getLevelBadge(achievement.level)}
                        </div>
                        <p className="text-muted-foreground mt-2">
                          Siswa: <span className="font-medium text-foreground">{achievement.student}</span> - {achievement.class}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            {achievement.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin size={14} />
                            {achievement.venue}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground md:col-span-2">
                            <Clock size={14} />
                            Pembina: {achievement.coach}
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 ml-auto md:ml-0 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">Detail</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Trophy size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Filter Prestasi Akademik</h3>
                <p className="text-muted-foreground">Menampilkan prestasi bidang akademik: lomba mata pelajaran, olimpiade, karya tulis, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sports">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Trophy size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Filter Prestasi Olahraga</h3>
                <p className="text-muted-foreground">Menampilkan prestasi bidang olahraga: sepak bola, basket, voli, atletik, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="arts">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Trophy size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Filter Prestasi Seni</h3>
                <p className="text-muted-foreground">Menampilkan prestasi bidang seni: musik, tari, lukis, teater, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="technology">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Trophy size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Filter Prestasi Teknologi</h3>
                <p className="text-muted-foreground">Menampilkan prestasi bidang teknologi: pemrograman, robotik, IoT, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AchievementsPage;
