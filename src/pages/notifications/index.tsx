
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Filter, Check, MessageSquare, Info, AlertTriangle, Clock, Settings, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageTransition from '@/components/layout/PageTransition';

const NotificationsPage = () => {
  const notificationTypes = [
    { 
      id: 1, 
      title: "Pelanggaran Baru", 
      description: "Ada pelanggaran siswa yang perlu diproses", 
      time: "10 menit yang lalu", 
      type: "warning",
      icon: AlertTriangle 
    },
    { 
      id: 2, 
      title: "Pengaduan Ditanggapi", 
      description: "Pengaduan nomor #1234 telah ditanggapi oleh TPPK", 
      time: "1 jam yang lalu", 
      type: "info",
      icon: MessageSquare 
    },
    { 
      id: 3, 
      title: "Jadwal Konseling", 
      description: "Jadwal konseling dengan siswa Fajar telah dikonfirmasi", 
      time: "3 jam yang lalu", 
      type: "success",
      icon: Check 
    },
    { 
      id: 4, 
      title: "Pengingat Rapat", 
      description: "Rapat evaluasi TPPK akan dimulai dalam 2 jam", 
      time: "5 jam yang lalu", 
      type: "reminder",
      icon: Clock 
    },
    { 
      id: 5, 
      title: "Kebijakan Baru", 
      description: "Ada perubahan kebijakan tata tertib yang perlu direview", 
      time: "1 hari yang lalu", 
      type: "info",
      icon: Info 
    },
  ];

  const getIconColor = (type: string) => {
    switch(type) {
      case 'warning': return 'text-amber-500';
      case 'info': return 'text-blue-500';
      case 'success': return 'text-green-500';
      case 'reminder': return 'text-purple-500';
      default: return 'text-primary';
    }
  };

  const getIconBg = (type: string) => {
    switch(type) {
      case 'warning': return 'bg-amber-100';
      case 'info': return 'bg-blue-100';
      case 'success': return 'bg-green-100';
      case 'reminder': return 'bg-purple-100';
      default: return 'bg-primary/10';
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Notifikasi</h1>
          <p className="text-muted-foreground">
            Kelola dan pantau semua notifikasi dalam sistem
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="unread">Belum Dibaca</TabsTrigger>
                <TabsTrigger value="flagged">Penting</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button variant="outline" size="sm">
                  Tandai Semua Dibaca
                </Button>
                <Button size="sm">
                  Buat Notifikasi
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Bell className="mr-2 h-5 w-5 text-primary" />
                    Semua Notifikasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notificationTypes.map((notification) => (
                      <div 
                        key={notification.id} 
                        className="flex items-start p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <div className={`p-2 mr-3 rounded-full ${getIconBg(notification.type)}`}>
                          <notification.icon className={`h-5 w-5 ${getIconColor(notification.type)}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Muat Lebih Banyak
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unread" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Bell className="mr-2 h-5 w-5 text-primary" />
                    Notifikasi Belum Dibaca
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notificationTypes.slice(0, 3).map((notification) => (
                      <div 
                        key={notification.id} 
                        className="flex items-start p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <div className={`p-2 mr-3 rounded-full ${getIconBg(notification.type)}`}>
                          <notification.icon className={`h-5 w-5 ${getIconColor(notification.type)}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flagged" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Bell className="mr-2 h-5 w-5 text-primary" />
                    Notifikasi Penting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notificationTypes.filter(n => n.type === 'warning').map((notification) => (
                      <div 
                        key={notification.id} 
                        className="flex items-start p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <div className={`p-2 mr-3 rounded-full ${getIconBg(notification.type)}`}>
                          <notification.icon className={`h-5 w-5 ${getIconColor(notification.type)}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Pengaturan Notifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Konfigurasi Notifikasi
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Atur Penerima
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Anda dapat mengatur jenis notifikasi, frekuensi, dan penerima notifikasi sesuai dengan kebutuhan.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default NotificationsPage;
