
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  ChevronDown, 
  Clock, 
  Edit, 
  Info, 
  Loader2, 
  Plus, 
  Search, 
  Settings, 
  ShieldAlert, 
  Trash2, 
  Users, 
  Wrench 
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const FacilityManagementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Fasilitas - Si-Kaji';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  // Sample facility data
  const facilities = [
    {
      id: 1,
      name: 'Lab Komputer A',
      type: 'Laboratorium',
      capacity: 30,
      status: 'available',
      lastMaintenance: '15/06/2023',
      nextMaintenance: '15/12/2023',
      condition: 'Baik',
      location: 'Lantai 2, Gedung Utara',
      facilities: ['30 PC', 'AC', 'Proyektor', 'Smart Board'],
      bookings: [
        { date: '10/07/2023', time: '08:00 - 10:00', class: 'XII RPL 1', teacher: 'Rudi Hermawan' },
        { date: '10/07/2023', time: '13:00 - 15:00', class: 'XI RPL 2', teacher: 'Tono Wijaya' }
      ]
    },
    {
      id: 2,
      name: 'Lab Komputer B',
      type: 'Laboratorium',
      capacity: 30,
      status: 'maintenance',
      lastMaintenance: '10/05/2023',
      nextMaintenance: '10/07/2023',
      condition: 'Perbaikan',
      location: 'Lantai 2, Gedung Utara',
      facilities: ['30 PC', 'AC', 'Proyektor'],
      bookings: []
    },
    {
      id: 3,
      name: 'Ruang Kelas 12A',
      type: 'Ruang Kelas',
      capacity: 36,
      status: 'available',
      lastMaintenance: '20/04/2023',
      nextMaintenance: '20/10/2023',
      condition: 'Baik',
      location: 'Lantai 3, Gedung Timur',
      facilities: ['AC', 'Proyektor', 'Papan Tulis'],
      bookings: [
        { date: '11/07/2023', time: '07:00 - 14:00', class: 'XII RPL 1', teacher: 'Budi Santoso' },
      ]
    },
    {
      id: 4,
      name: 'Aula Utama',
      type: 'Aula',
      capacity: 200,
      status: 'booked',
      lastMaintenance: '05/06/2023',
      nextMaintenance: '05/12/2023',
      condition: 'Baik',
      location: 'Lantai 1, Gedung Pusat',
      facilities: ['Sound System', 'AC', 'Proyektor', 'Panggung', '200 Kursi'],
      bookings: [
        { date: '15/07/2023', time: '08:00 - 15:00', class: 'Semua Kelas', teacher: 'Kepala Sekolah' },
      ]
    },
    {
      id: 5,
      name: 'Perpustakaan',
      type: 'Perpustakaan',
      capacity: 50,
      status: 'available',
      lastMaintenance: '12/05/2023',
      nextMaintenance: '12/11/2023',
      condition: 'Baik',
      location: 'Lantai 1, Gedung Barat',
      facilities: ['AC', 'Komputer Katalog', 'Area Membaca', 'Koleksi Buku'],
      bookings: []
    },
    {
      id: 6,
      name: 'Lapangan Olahraga',
      type: 'Lapangan',
      capacity: 100,
      status: 'available',
      lastMaintenance: '01/06/2023',
      nextMaintenance: '01/12/2023',
      condition: 'Baik',
      location: 'Area Luar, Sisi Selatan',
      facilities: ['Ring Basket', 'Gawang Futsal', 'Net Voli'],
      bookings: [
        { date: '12/07/2023', time: '07:00 - 09:00', class: 'X RPL 1', teacher: 'Dedi Kurniawan' },
      ]
    },
  ];

  // Filter facilities based on search query
  const filteredFacilities = facilities.filter(facility => 
    facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Counts for overview section
  const totalFacilities = facilities.length;
  const availableFacilities = facilities.filter(f => f.status === 'available').length;
  const maintenanceFacilities = facilities.filter(f => f.status === 'maintenance').length;
  const bookedFacilities = facilities.filter(f => f.status === 'booked').length;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Manajemen Fasilitas</h1>
                <p className="text-muted-foreground mt-1">Kelola fasilitas dan sarana sekolah SMKN 1 Kendal</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                Tambah Fasilitas
              </Button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Fasilitas</p>
                      <h3 className="text-2xl font-bold">{totalFacilities}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tersedia</p>
                      <h3 className="text-2xl font-bold">{availableFacilities}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Wrench className="h-6 w-6 text-yellow-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Maintenance</p>
                      <h3 className="text-2xl font-bold">{maintenanceFacilities}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Terpesan</p>
                      <h3 className="text-2xl font-bold">{bookedFacilities}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <TabsList>
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="lab">Laboratorium</TabsTrigger>
                  <TabsTrigger value="class">Ruang Kelas</TabsTrigger>
                  <TabsTrigger value="other">Fasilitas Lain</TabsTrigger>
                </TabsList>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari fasilitas..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <Card>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                      {filteredFacilities.map((facility) => (
                        <Card key={facility.id} className="overflow-hidden">
                          <div className={`p-1 ${
                            facility.status === 'available' ? 'bg-green-500' : 
                            facility.status === 'maintenance' ? 'bg-yellow-500' : 
                            'bg-blue-500'
                          }`} />
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{facility.name}</CardTitle>
                                <CardDescription>{facility.type}</CardDescription>
                              </div>
                              <Badge variant={
                                facility.status === 'available' ? 'default' : 
                                facility.status === 'maintenance' ? 'destructive' : 
                                'secondary'
                              }>
                                {facility.status === 'available' ? 'Tersedia' : 
                                 facility.status === 'maintenance' ? 'Perbaikan' : 
                                 'Terpesan'}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Lokasi:</span>
                                <span>{facility.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Kapasitas:</span>
                                <span>{facility.capacity} orang</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Kondisi:</span>
                                <span>{facility.condition}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline" className="flex-1">Detail</Button>
                              <Button size="sm" variant="outline" className="flex-1">Pesan</Button>
                              <Button size="sm" variant="ghost" className="px-2">
                                <Settings size={16} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="lab" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFacilities
                        .filter(facility => facility.type === 'Laboratorium')
                        .map((facility) => (
                          <Card key={facility.id} className="overflow-hidden">
                            <div className={`p-1 ${
                              facility.status === 'available' ? 'bg-green-500' : 
                              facility.status === 'maintenance' ? 'bg-yellow-500' : 
                              'bg-blue-500'
                            }`} />
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                                  <CardDescription>{facility.type}</CardDescription>
                                </div>
                                <Badge variant={
                                  facility.status === 'available' ? 'default' : 
                                  facility.status === 'maintenance' ? 'destructive' : 
                                  'secondary'
                                }>
                                  {facility.status === 'available' ? 'Tersedia' : 
                                  facility.status === 'maintenance' ? 'Perbaikan' : 
                                  'Terpesan'}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Lokasi:</span>
                                  <span>{facility.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Kapasitas:</span>
                                  <span>{facility.capacity} orang</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Kondisi:</span>
                                  <span>{facility.condition}</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 mt-4">
                                <Button size="sm" variant="outline" className="flex-1">Detail</Button>
                                <Button size="sm" variant="outline" className="flex-1">Pesan</Button>
                                <Button size="sm" variant="ghost" className="px-2">
                                  <Settings size={16} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="class" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFacilities
                        .filter(facility => facility.type === 'Ruang Kelas')
                        .map((facility) => (
                          <Card key={facility.id} className="overflow-hidden">
                            <div className={`p-1 ${
                              facility.status === 'available' ? 'bg-green-500' : 
                              facility.status === 'maintenance' ? 'bg-yellow-500' : 
                              'bg-blue-500'
                            }`} />
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                                  <CardDescription>{facility.type}</CardDescription>
                                </div>
                                <Badge variant={
                                  facility.status === 'available' ? 'default' : 
                                  facility.status === 'maintenance' ? 'destructive' : 
                                  'secondary'
                                }>
                                  {facility.status === 'available' ? 'Tersedia' : 
                                  facility.status === 'maintenance' ? 'Perbaikan' : 
                                  'Terpesan'}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Lokasi:</span>
                                  <span>{facility.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Kapasitas:</span>
                                  <span>{facility.capacity} orang</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Kondisi:</span>
                                  <span>{facility.condition}</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 mt-4">
                                <Button size="sm" variant="outline" className="flex-1">Detail</Button>
                                <Button size="sm" variant="outline" className="flex-1">Pesan</Button>
                                <Button size="sm" variant="ghost" className="px-2">
                                  <Settings size={16} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="other" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFacilities
                        .filter(facility => facility.type !== 'Laboratorium' && facility.type !== 'Ruang Kelas')
                        .map((facility) => (
                          <Card key={facility.id} className="overflow-hidden">
                            <div className={`p-1 ${
                              facility.status === 'available' ? 'bg-green-500' : 
                              facility.status === 'maintenance' ? 'bg-yellow-500' : 
                              'bg-blue-500'
                            }`} />
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg">{facility.name}</CardTitle>
                                  <CardDescription>{facility.type}</CardDescription>
                                </div>
                                <Badge variant={
                                  facility.status === 'available' ? 'default' : 
                                  facility.status === 'maintenance' ? 'destructive' : 
                                  'secondary'
                                }>
                                  {facility.status === 'available' ? 'Tersedia' : 
                                  facility.status === 'maintenance' ? 'Perbaikan' : 
                                  'Terpesan'}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Lokasi:</span>
                                  <span>{facility.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Kapasitas:</span>
                                  <span>{facility.capacity} orang</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Kondisi:</span>
                                  <span>{facility.condition}</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 mt-4">
                                <Button size="sm" variant="outline" className="flex-1">Detail</Button>
                                <Button size="sm" variant="outline" className="flex-1">Pesan</Button>
                                <Button size="sm" variant="ghost" className="px-2">
                                  <Settings size={16} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default FacilityManagementPage;
