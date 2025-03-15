
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Users, Calendar, Clock, MapPin, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ExtracurricularPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Ekstrakurikuler - Si-Kaji';
  }, []);

  // Sample extracurricular data
  const extracurriculars = [
    {
      id: 1,
      name: 'Futsal',
      category: 'Olahraga',
      day: 'Senin',
      time: '15:30 - 17:30',
      location: 'Lapangan Futsal SMKN 1 Kendal',
      coach: 'Joko Susilo, S.Pd.',
      description: 'Kegiatan ekstrakurikuler futsal untuk meningkatkan kemampuan bermain sepak bola di lapangan indoor.',
      members: 25,
      image: ''
    },
    {
      id: 2,
      name: 'Paduan Suara',
      category: 'Seni',
      day: 'Selasa',
      time: '15:30 - 17:00',
      location: 'Ruang Musik SMKN 1 Kendal',
      coach: 'Dewi Astuti, S.Pd.',
      description: 'Kegiatan ekstrakurikuler paduan suara untuk mengembangkan bakat menyanyi dan harmonisasi vokal.',
      members: 30,
      image: ''
    },
    {
      id: 3,
      name: 'Robotik',
      category: 'Teknologi',
      day: 'Rabu',
      time: '15:30 - 17:30',
      location: 'Lab Robotik SMKN 1 Kendal',
      coach: 'Tono Wijaya, S.T.',
      description: 'Kegiatan ekstrakurikuler robotik untuk pengembangan kemampuan dalam merakit dan memprogram robot.',
      members: 15,
      image: ''
    },
    {
      id: 4,
      name: 'Pramuka',
      category: 'Kepemimpinan',
      day: 'Jumat',
      time: '14:00 - 16:30',
      location: 'Lapangan Utama SMKN 1 Kendal',
      coach: 'Budi Santoso, S.Pd.',
      description: 'Kegiatan ekstrakurikuler pramuka untuk membentuk karakter, kedisiplinan, dan kemandirian siswa.',
      members: 50,
      image: ''
    },
    {
      id: 5,
      name: 'Karya Ilmiah Remaja',
      category: 'Akademik',
      day: 'Kamis',
      time: '15:30 - 17:00',
      location: 'Ruang Diskusi SMKN 1 Kendal',
      coach: 'Ani Suryani, S.Pd.',
      description: 'Kegiatan ekstrakurikuler untuk mengembangkan kemampuan menulis dan meneliti dalam bentuk karya ilmiah.',
      members: 20,
      image: ''
    }
  ];

  const getCategoryBadge = (category) => {
    switch(category) {
      case 'Olahraga':
        return <Badge className="bg-green-500">Olahraga</Badge>;
      case 'Seni':
        return <Badge className="bg-purple-500">Seni</Badge>;
      case 'Teknologi':
        return <Badge className="bg-blue-500">Teknologi</Badge>;
      case 'Kepemimpinan':
        return <Badge className="bg-amber-500">Kepemimpinan</Badge>;
      case 'Akademik':
        return <Badge className="bg-red-500">Akademik</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  return (
    <DashboardLayout
      title="Ekstrakurikuler"
      description="Pengelolaan kegiatan ekstrakurikuler"
      userRole="trainer"
      userName="Pelatih"
      showBackButton
      backTo="/dashboard"
    >
      <div className="mb-4 flex justify-end">
        <Button className="gap-2">
          <Plus size={16} />
          Tambah Ekstrakurikuler
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-3 md:grid-cols-5 sm:flex sm:flex-row">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="sports">Olahraga</TabsTrigger>
          <TabsTrigger value="arts">Seni</TabsTrigger>
          <TabsTrigger value="tech">Teknologi</TabsTrigger>
          <TabsTrigger value="leadership">Kepemimpinan</TabsTrigger>
          <TabsTrigger value="academic">Akademik</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="relative w-full mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari ekstrakurikuler..."
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extracurriculars.map((extracurricular) => (
              <Card key={extracurricular.id} className="overflow-hidden">
                <div className="h-40 bg-muted flex items-center justify-center">
                  {extracurricular.image ? (
                    <img 
                      src={extracurricular.image} 
                      alt={extracurricular.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Award size={48} className="text-muted-foreground opacity-50" />
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{extracurricular.name}</CardTitle>
                    {getCategoryBadge(extracurricular.category)}
                  </div>
                  <CardDescription className="line-clamp-2">{extracurricular.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span>{extracurricular.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={14} className="text-muted-foreground" />
                      <span>{extracurricular.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} className="text-muted-foreground" />
                      <span>{extracurricular.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={14} className="text-muted-foreground" />
                      <span>{extracurricular.members} Peserta</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {extracurricular.coach.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{extracurricular.coach}</p>
                      <p className="text-muted-foreground">Pembina</p>
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">Presensi</Button>
                    <Button size="sm" className="flex-1">Detail</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sports">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Award size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Ekstrakurikuler Olahraga</h3>
                <p className="text-muted-foreground">Menampilkan kegiatan ekstrakurikuler bidang olahraga seperti futsal, basket, voli, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="arts">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Award size={48} className="mx-auto text-purple-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Ekstrakurikuler Seni</h3>
                <p className="text-muted-foreground">Menampilkan kegiatan ekstrakurikuler bidang seni seperti paduan suara, tari, musik, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tech">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Award size={48} className="mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Ekstrakurikuler Teknologi</h3>
                <p className="text-muted-foreground">Menampilkan kegiatan ekstrakurikuler bidang teknologi seperti robotik, pemrograman, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leadership">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Award size={48} className="mx-auto text-amber-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Ekstrakurikuler Kepemimpinan</h3>
                <p className="text-muted-foreground">Menampilkan kegiatan ekstrakurikuler bidang kepemimpinan seperti pramuka, PMR, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Award size={48} className="mx-auto text-red-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Ekstrakurikuler Akademik</h3>
                <p className="text-muted-foreground">Menampilkan kegiatan ekstrakurikuler bidang akademik seperti karya ilmiah, debat, dan lainnya.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ExtracurricularPage;
