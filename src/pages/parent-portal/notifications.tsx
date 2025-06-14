
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, AlertCircle, Info, CheckCircle, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

const notifications = [
  {
    id: "N001",
    type: "urgent",
    category: "Akademik",
    title: "Ujian Tengah Semester akan dimulai",
    message: "Ujian Tengah Semester akan dimulai tanggal 20 November 2023. Pastikan anak sudah mempersiapkan diri dengan baik.",
    date: "2023-11-15T10:30:00",
    isRead: false,
    sender: "Waka Kurikulum"
  },
  {
    id: "N002",
    type: "info",
    category: "Kehadiran",
    title: "Laporan Kehadiran Mingguan",
    message: "Tingkat kehadiran anak Anda minggu ini adalah 100%. Terima kasih atas perhatian dan dukungannya.",
    date: "2023-11-14T16:00:00",
    isRead: true,
    sender: "Sistem Otomatis"
  },
  {
    id: "N003",
    type: "warning",
    category: "Kedisiplinan",
    title: "Peringatan Keterlambatan",
    message: "Anak Anda telah terlambat 3 kali dalam minggu ini. Mohon perhatikan waktu keberangkatan ke sekolah.",
    date: "2023-11-13T14:20:00",
    isRead: false,
    sender: "Guru Piket"
  },
  {
    id: "N004",
    type: "success",
    category: "Prestasi",
    title: "Selamat! Anak Anda Meraih Prestasi",
    message: "Kami bangga mengumumkan bahwa anak Anda meraih Juara 2 dalam Lomba Web Design tingkat kota.",
    date: "2023-11-12T09:15:00",
    isRead: true,
    sender: "Kepala Sekolah"
  },
  {
    id: "N005",
    type: "info",
    category: "Agenda",
    title: "Pertemuan Orang Tua",
    message: "Pertemuan orang tua akan diadakan pada tanggal 25 November 2023 pukul 09:00 di Aula sekolah.",
    date: "2023-11-11T11:45:00",
    isRead: true,
    sender: "Komite Sekolah"
  },
  {
    id: "N006",
    type: "info",
    category: "Pembayaran",
    title: "Reminder Pembayaran SPP",
    message: "Pembayaran SPP bulan November akan berakhir tanggal 20 November 2023. Mohon segera melakukan pembayaran.",
    date: "2023-11-10T08:00:00",
    isRead: false,
    sender: "Bagian Keuangan"
  }
];

const ParentPortalNotificationsPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [notificationList, setNotificationList] = useState(notifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Akademik": "bg-purple-100 text-purple-800",
      "Kehadiran": "bg-blue-100 text-blue-800",
      "Kedisiplinan": "bg-orange-100 text-orange-800",
      "Prestasi": "bg-green-100 text-green-800",
      "Agenda": "bg-indigo-100 text-indigo-800",
      "Pembayaran": "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(notif => notif.id !== id));
  };

  const getFilteredNotifications = () => {
    switch (selectedTab) {
      case 'unread':
        return notificationList.filter(n => !n.isRead);
      case 'urgent':
        return notificationList.filter(n => n.type === 'urgent' || n.type === 'warning');
      default:
        return notificationList;
    }
  };

  const unreadCount = notificationList.filter(n => !n.isRead).length;
  const urgentCount = notificationList.filter(n => n.type === 'urgent' || n.type === 'warning').length;

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Notifikasi
            </h1>
            <p className="text-muted-foreground">
              Terima informasi penting dari sekolah
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              Tandai Semua Dibaca
            </Button>
            <Button variant="outline" size="sm">
              Hapus yang Dibaca
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Notifikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationList.length}</div>
              <p className="text-xs text-muted-foreground">semua notifikasi</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Belum Dibaca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">notifikasi baru</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Penting/Mendesak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
              <p className="text-xs text-muted-foreground">perlu perhatian</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              Semua ({notificationList.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Belum Dibaca ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="urgent">
              Penting ({urgentCount})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab} className="space-y-4">
            <div className="space-y-3">
              {getFilteredNotifications().map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="outline" 
                              className={getNotificationBadgeColor(notification.type)}
                            >
                              {notification.type === 'urgent' ? 'Mendesak' :
                               notification.type === 'warning' ? 'Peringatan' :
                               notification.type === 'success' ? 'Sukses' : 'Info'}
                            </Badge>
                            <Badge variant="outline" className={getCategoryColor(notification.category)}>
                              {notification.category}
                            </Badge>
                            {!notification.isRead && (
                              <Badge variant="default" className="bg-blue-600">
                                Baru
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium mb-1">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(notification.date), 'dd MMM yyyy, HH:mm')}
                            </span>
                            <span>Dari: {notification.sender}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {getFilteredNotifications().length === 0 && (
              <Card className="p-8 text-center">
                <CardContent>
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {selectedTab === 'unread' ? 'Tidak ada notifikasi yang belum dibaca' :
                     selectedTab === 'urgent' ? 'Tidak ada notifikasi penting saat ini' :
                     'Tidak ada notifikasi'}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default ParentPortalNotificationsPage;
