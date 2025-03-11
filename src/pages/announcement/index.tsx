
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Bell, Megaphone, Calendar, Users, Pin, Eye, MessageSquare, Flag, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AnnouncementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Pengumuman Sekolah - Si-Kaji';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  // Sample announcement data
  const announcements = [
    {
      id: 1,
      title: 'Jadwal Ujian Akhir Semester Ganjil 2023/2024',
      content: 'Diberitahukan kepada seluruh siswa bahwa Ujian Akhir Semester Ganjil akan dilaksanakan pada tanggal 4-9 Desember 2023. Silakan persiapkan diri dengan baik.',
      date: '2023-11-20T08:30:00',
      author: 'Kepala Sekolah',
      authorPhoto: '',
      category: 'akademik',
      audience: ['Semua Siswa', 'Guru'],
      pinned: true,
      attachments: [
        { name: 'Jadwal_UAS_Ganjil_2023.pdf', size: '245 KB' }
      ],
      comments: 5,
      views: 358
    },
    {
      id: 2,
      title: 'Pelatihan Keterampilan Digital untuk Guru',
      content: 'Dalam rangka meningkatkan kompetensi digital guru, akan diadakan pelatihan Google Workspace pada tanggal 25-26 November 2023 di Aula Utama.',
      date: '2023-11-15T10:15:00',
      author: 'Wakil Kepala Bidang Kurikulum',
      authorPhoto: '',
      category: 'pengembangan',
      audience: ['Guru'],
      pinned: false,
      attachments: [
        { name: 'Materi_Pelatihan_Google.pdf', size: '1.2 MB' },
        { name: 'Formulir_Pendaftaran.docx', size: '56 KB' }
      ],
      comments: 8,
      views: 124
    },
    {
      id: 3,
      title: 'Peringatan Hari Pahlawan',
      content: 'Dalam rangka memperingati Hari Pahlawan 10 November, akan diadakan upacara bendera dan lomba pidato kepahlawanan. Seluruh siswa diwajibkan mengenakan seragam lengkap.',
      date: '2023-11-08T09:45:00',
      author: 'Wakil Kepala Bidang Kesiswaan',
      authorPhoto: '',
      category: 'acara',
      audience: ['Semua Siswa', 'Guru'],
      pinned: false,
      attachments: [],
      comments: 3,
      views: 215
    },
    {
      id: 4,
      title: 'Rekrutmen Anggota OSIS Periode 2024',
      content: 'Bagi siswa kelas X dan XI yang berminat menjadi pengurus OSIS periode 2024, pendaftaran dibuka mulai 15-30 November 2023. Formulir dapat diambil di ruang OSIS.',
      date: '2023-11-07T14:30:00',
      author: 'Pembina OSIS',
      authorPhoto: '',
      category: 'organisasi',
      audience: ['Siswa Kelas X', 'Siswa Kelas XI'],
      pinned: false,
      attachments: [
        { name: 'Formulir_OSIS_2024.pdf', size: '189 KB' }
      ],
      comments: 12,
      views: 276
    },
    {
      id: 5,
      title: 'Pemberitahuan Libur Hari Guru Nasional',
      content: 'Diberitahukan bahwa tanggal 25 November 2023 diliburkan dalam rangka memperingati Hari Guru Nasional. Kegiatan belajar mengajar akan dilanjutkan pada hari berikutnya.',
      date: '2023-11-05T11:00:00',
      author: 'Kepala Tata Usaha',
      authorPhoto: '',
      category: 'informasi',
      audience: ['Semua Siswa', 'Guru', 'Staf'],
      pinned: false,
      attachments: [],
      comments: 2,
      views: 198
    },
    {
      id: 6,
      title: 'Kunjungan Industri Jurusan RPL',
      content: 'Kunjungan industri untuk siswa kelas XII jurusan RPL akan dilaksanakan pada tanggal 30 November 2023 ke PT Global Technology Solution di Jakarta. Informasi lebih lanjut akan disampaikan oleh wali kelas.',
      date: '2023-11-01T13:20:00',
      author: 'Ketua Jurusan RPL',
      authorPhoto: '',
      category: 'akademik',
      audience: ['Siswa Kelas XII RPL'],
      pinned: false,
      attachments: [
        { name: 'Surat_Izin_Orangtua.pdf', size: '156 KB' },
        { name: 'Itinerary_Kunjungan.pdf', size: '210 KB' }
      ],
      comments: 9,
      views: 142
    },
  ];

  // Filter announcements based on search query
  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Calculate time elapsed since announcement
  const getTimeElapsed = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInDays > 0) {
      return `${diffInDays} hari yang lalu`;
    } else if (diffInHours > 0) {
      return `${diffInHours} jam yang lalu`;
    } else {
      return `${diffInMinutes} menit yang lalu`;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Pengumuman Sekolah</h1>
                <p className="text-muted-foreground mt-1">Informasi dan pengumuman penting SMKN 1 Kendal</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                Buat Pengumuman
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Kategori</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <Megaphone size={16} />
                        <span>Semua Pengumuman</span>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <Calendar size={16} />
                        <span>Akademik</span>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <Users size={16} />
                        <span>Organisasi</span>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <Bell size={16} />
                        <span>Acara</span>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <Flag size={16} />
                        <span>Informasi</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Filter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Tampilkan</p>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Semua</SelectItem>
                            <SelectItem value="recent">Terbaru</SelectItem>
                            <SelectItem value="pinned">Yang Disematkan</SelectItem>
                            <SelectItem value="mine">Untuk Saya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Periode</p>
                        <Select defaultValue="all-time">
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Periode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-time">Semua Waktu</SelectItem>
                            <SelectItem value="today">Hari Ini</SelectItem>
                            <SelectItem value="week">Minggu Ini</SelectItem>
                            <SelectItem value="month">Bulan Ini</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <Pin size={14} />
                          <span className="text-sm">Hanya yang disematkan</span>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-3">
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari pengumuman..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">Semua</TabsTrigger>
                    <TabsTrigger value="pinned">Disematkan</TabsTrigger>
                    <TabsTrigger value="recent">Terbaru</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {filteredAnnouncements.map((announcement) => (
                      <Card key={announcement.id} className="relative">
                        {announcement.pinned && (
                          <div className="absolute top-0 right-0">
                            <Badge variant="secondary" className="rounded-bl-md rounded-tr-md rounded-br-none rounded-tl-none">
                              <Pin size={12} className="mr-1" /> Disematkan
                            </Badge>
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                                {announcement.title}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={announcement.authorPhoto} />
                                  <AvatarFallback className="text-xs">
                                    {announcement.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{announcement.author}</span>
                                <span>•</span>
                                <span>{getTimeElapsed(announcement.date)}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {announcement.category}
                                </Badge>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{announcement.content}</p>
                          {announcement.attachments.length > 0 && (
                            <div className="border rounded-md p-3 mb-2 bg-muted/30">
                              <p className="text-xs text-muted-foreground mb-2">Lampiran:</p>
                              <div className="space-y-2">
                                {announcement.attachments.map((attachment, index) => (
                                  <div key={index} className="flex justify-between items-center text-sm">
                                    <div className="font-medium">{attachment.name}</div>
                                    <div className="text-xs text-muted-foreground">{attachment.size}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                              <Eye size={16} />
                              <span>{announcement.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare size={16} />
                              <span>{announcement.comments}</span>
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">Lihat Detail</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="pinned" className="space-y-4">
                    {filteredAnnouncements.filter(a => a.pinned).map((announcement) => (
                      <Card key={announcement.id} className="relative">
                        <div className="absolute top-0 right-0">
                          <Badge variant="secondary" className="rounded-bl-md rounded-tr-md rounded-br-none rounded-tl-none">
                            <Pin size={12} className="mr-1" /> Disematkan
                          </Badge>
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                                {announcement.title}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={announcement.authorPhoto} />
                                  <AvatarFallback className="text-xs">
                                    {announcement.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{announcement.author}</span>
                                <span>•</span>
                                <span>{getTimeElapsed(announcement.date)}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {announcement.category}
                                </Badge>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{announcement.content}</p>
                          {announcement.attachments.length > 0 && (
                            <div className="border rounded-md p-3 mb-2 bg-muted/30">
                              <p className="text-xs text-muted-foreground mb-2">Lampiran:</p>
                              <div className="space-y-2">
                                {announcement.attachments.map((attachment, index) => (
                                  <div key={index} className="flex justify-between items-center text-sm">
                                    <div className="font-medium">{attachment.name}</div>
                                    <div className="text-xs text-muted-foreground">{attachment.size}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                              <Eye size={16} />
                              <span>{announcement.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare size={16} />
                              <span>{announcement.comments}</span>
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">Lihat Detail</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="recent" className="space-y-4">
                    {filteredAnnouncements
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 5)
                      .map((announcement) => (
                      <Card key={announcement.id} className="relative">
                        {announcement.pinned && (
                          <div className="absolute top-0 right-0">
                            <Badge variant="secondary" className="rounded-bl-md rounded-tr-md rounded-br-none rounded-tl-none">
                              <Pin size={12} className="mr-1" /> Disematkan
                            </Badge>
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                                {announcement.title}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={announcement.authorPhoto} />
                                  <AvatarFallback className="text-xs">
                                    {announcement.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{announcement.author}</span>
                                <span>•</span>
                                <span>{getTimeElapsed(announcement.date)}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">
                                  {announcement.category}
                                </Badge>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{announcement.content}</p>
                          {announcement.attachments.length > 0 && (
                            <div className="border rounded-md p-3 mb-2 bg-muted/30">
                              <p className="text-xs text-muted-foreground mb-2">Lampiran:</p>
                              <div className="space-y-2">
                                {announcement.attachments.map((attachment, index) => (
                                  <div key={index} className="flex justify-between items-center text-sm">
                                    <div className="font-medium">{attachment.name}</div>
                                    <div className="text-xs text-muted-foreground">{attachment.size}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                              <Eye size={16} />
                              <span>{announcement.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare size={16} />
                              <span>{announcement.comments}</span>
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">Lihat Detail</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default AnnouncementPage;
