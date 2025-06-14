
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Calendar, Clock, MapPin, Star, Trophy, Target } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

const extracurricularData = [
  {
    id: "EKSKUL001",
    name: "Pramuka",
    category: "Kepanduan",
    description: "Kegiatan kepanduan untuk membentuk karakter dan keterampilan hidup",
    coach: "Budi Santoso, S.Pd",
    schedule: "Jumat, 14:00-16:00",
    location: "Lapangan Sekolah",
    maxMembers: 50,
    currentMembers: 35,
    status: "active",
    achievements: ["Juara 1 Lomba Pramuka Tingkat Kabupaten 2023"]
  },
  {
    id: "EKSKUL002",
    name: "Basket",
    category: "Olahraga",
    description: "Tim basket sekolah untuk kompetisi dan pengembangan bakat olahraga",
    coach: "Ahmad Rahman, S.Pd",
    schedule: "Senin & Rabu, 15:30-17:00",
    location: "Lapangan Basket",
    maxMembers: 20,
    currentMembers: 18,
    status: "active",
    achievements: ["Juara 2 Kompetisi Basket Antar SMA 2023"]
  },
  {
    id: "EKSKUL003",
    name: "English Club",
    category: "Akademik",
    description: "Klub bahasa Inggris untuk meningkatkan kemampuan berbahasa Inggris",
    coach: "Sarah Johnson, S.Pd",
    schedule: "Selasa & Kamis, 14:00-15:30",
    location: "Lab Bahasa",
    maxMembers: 30,
    currentMembers: 25,
    status: "active",
    achievements: ["Best Presentation Award - English Competition 2023"]
  },
  {
    id: "EKSKUL004",
    name: "Robotika",
    category: "Teknologi",
    description: "Pengembangan robot dan teknologi otomasi",
    coach: "Dr. Bambang Sutrisno",
    schedule: "Sabtu, 08:00-12:00",
    location: "Lab Komputer",
    maxMembers: 15,
    currentMembers: 12,
    status: "active",
    achievements: ["Juara 3 Kompetisi Robot Nasional 2023"]
  }
];

const myExtracurriculars = [
  {
    id: "EKSKUL002",
    name: "Basket",
    joinDate: "2023-08-01",
    position: "Anggota",
    attendance: 85,
    achievements: ["Best Team Player 2023"]
  },
  {
    id: "EKSKUL003", 
    name: "English Club",
    joinDate: "2023-07-15",
    position: "Sekretaris",
    attendance: 92,
    achievements: ["Best Speaker Award"]
  }
];

const ExtracurricularPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Olahraga':
        return 'bg-green-100 text-green-800';
      case 'Akademik':
        return 'bg-blue-100 text-blue-800';
      case 'Teknologi':
        return 'bg-purple-100 text-purple-800';
      case 'Kepanduan':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'full':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Award className="h-6 w-6" />
              Ekstrakurikuler
            </h1>
            <p className="text-muted-foreground">
              Jelajahi dan ikuti kegiatan ekstrakurikuler sekolah
            </p>
          </div>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Daftar Ekstrakurikuler</TabsTrigger>
            <TabsTrigger value="my">Ekstrakurikuler Saya</TabsTrigger>
            <TabsTrigger value="achievements">Prestasi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Input 
                placeholder="Cari ekstrakurikuler..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="olahraga">Olahraga</SelectItem>
                  <SelectItem value="akademik">Akademik</SelectItem>
                  <SelectItem value="teknologi">Teknologi</SelectItem>
                  <SelectItem value="kepanduan">Kepanduan</SelectItem>
                  <SelectItem value="seni">Seni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {extracurricularData.map((ekskul) => (
                <Card key={ekskul.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{ekskul.name}</CardTitle>
                        <CardDescription>{ekskul.description}</CardDescription>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className={getCategoryColor(ekskul.category)}>
                          {ekskul.category}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(ekskul.status)}>
                          Aktif
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>Pelatih: {ekskul.coach}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>Jadwal: {ekskul.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>Lokasi: {ekskul.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4" />
                        <span>Anggota: {ekskul.currentMembers}/{ekskul.maxMembers}</span>
                      </div>
                    </div>
                    
                    {ekskul.achievements.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          Prestasi Terbaru:
                        </p>
                        {ekskul.achievements.map((achievement, index) => (
                          <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Daftar
                      </Button>
                      <Button size="sm" variant="outline">
                        Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {myExtracurriculars.map((ekskul) => {
                const fullData = extracurricularData.find(e => e.id === ekskul.id);
                return (
                  <Card key={ekskul.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{ekskul.name}</CardTitle>
                          <CardDescription>
                            Bergabung sejak {format(new Date(ekskul.joinDate), 'dd MMMM yyyy')}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {ekskul.position}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{ekskul.attendance}%</p>
                          <p className="text-xs text-green-600">Kehadiran</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{ekskul.achievements.length}</p>
                          <p className="text-xs text-purple-600">Prestasi</p>
                        </div>
                      </div>
                      
                      {fullData && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Jadwal: {fullData.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>Lokasi: {fullData.location}</span>
                          </div>
                        </div>
                      )}
                      
                      {ekskul.achievements.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            Prestasi Saya:
                          </p>
                          {ekskul.achievements.map((achievement, index) => (
                            <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Lihat Jadwal
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Presensi
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {myExtracurriculars.length === 0 && (
              <Card className="p-8 text-center">
                <CardContent>
                  <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Belum mengikuti ekstrakurikuler apapun
                  </p>
                  <Button className="mt-4">
                    Jelajahi Ekstrakurikuler
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Prestasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">8</div>
                  <p className="text-xs text-muted-foreground">prestasi</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Ekstrakurikuler Aktif</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <p className="text-xs text-muted-foreground">kegiatan</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Rata-rata Kehadiran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">88.5%</div>
                  <p className="text-xs text-muted-foreground">kehadiran</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Prestasi</CardTitle>
                <CardDescription>
                  Daftar semua prestasi yang telah diraih dalam kegiatan ekstrakurikuler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Best Speaker Award", ekskul: "English Club", date: "2023-10-15", level: "Sekolah" },
                    { title: "Best Team Player 2023", ekskul: "Basket", date: "2023-09-20", level: "Sekolah" },
                    { title: "Juara 2 Kompetisi Basket", ekskul: "Basket", date: "2023-08-10", level: "Kabupaten" },
                    { title: "Participant Certificate", ekskul: "English Club", date: "2023-07-25", level: "Provinsi" }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Trophy className="h-8 w-8 text-yellow-600" />
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {achievement.ekskul} • {format(new Date(achievement.date), 'dd MMMM yyyy')}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-800">
                        {achievement.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ExtracurricularPage;
