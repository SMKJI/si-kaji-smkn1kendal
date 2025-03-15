
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, FileText, UserCheck, Bell, AlertTriangle, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  type: "academic" | "attendance" | "discipline" | "announcement" | "general";
  read: boolean;
}

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Ketidakhadiran Anak",
    message: "Anak Anda tidak hadir di sekolah hari ini tanpa keterangan. Mohon informasi lebih lanjut.",
    date: "2023-06-15",
    time: "08:30",
    type: "attendance",
    read: false
  },
  {
    id: "2",
    title: "Nilai Ujian Tengah Semester",
    message: "Nilai ujian tengah semester anak Anda telah dipublikasikan. Silakan periksa di portal akademik.",
    date: "2023-06-10",
    time: "14:00",
    type: "academic",
    read: true
  },
  {
    id: "3",
    title: "Pelanggaran Tata Tertib",
    message: "Anak Anda tercatat melakukan pelanggaran ringan: terlambat masuk kelas selama 3 hari berturut-turut.",
    date: "2023-06-08",
    time: "09:15",
    type: "discipline",
    read: false
  },
  {
    id: "4",
    title: "Pengumuman Rapat Orang Tua",
    message: "Rapat orang tua akan diadakan pada tanggal 20 Juni 2023 pukul 15:00 WIB di Aula Sekolah.",
    date: "2023-06-05",
    time: "11:30",
    type: "announcement",
    read: true
  },
  {
    id: "5",
    title: "Reminder: Pembayaran SPP",
    message: "Ini adalah pengingat untuk pembayaran SPP bulan Juni yang jatuh tempo pada tanggal 10 Juni 2023.",
    date: "2023-06-01",
    time: "10:00",
    type: "general",
    read: true
  },
  {
    id: "6",
    title: "Tugas Yang Belum Dikumpulkan",
    message: "Anak Anda memiliki 2 tugas yang belum dikumpulkan untuk mata pelajaran Matematika.",
    date: "2023-05-28",
    time: "16:45",
    type: "academic",
    read: false
  },
  {
    id: "7",
    title: "Prestasi Akademik",
    message: "Selamat! Anak Anda mendapatkan nilai tertinggi pada ulangan Bahasa Indonesia minggu ini.",
    date: "2023-05-25",
    time: "13:20",
    type: "academic",
    read: true
  },
];

// Function to get icon based on notification type
const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "academic":
      return <FileText className="w-5 h-5 text-blue-500" />;
    case "attendance":
      return <CalendarClock className="w-5 h-5 text-purple-500" />;
    case "discipline":
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case "announcement":
      return <Bell className="w-5 h-5 text-amber-500" />;
    default:
      return <Info className="w-5 h-5 text-gray-500" />;
  }
};

const ParentPortalNotificationsPage = () => {
  return (
    <DashboardLayout 
      title="Notifikasi"
      description="Lihat semua notifikasi dan pemberitahuan untuk anak Anda"
      userRole="parent"
      userName="Orang Tua Siswa"
    >
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifikasi</h1>
            <p className="text-muted-foreground">
              Lihat semua notifikasi dan pemberitahuan untuk anak Anda
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Tandai Semua Telah Dibaca
            </Button>
            <Button variant="outline" size="sm">
              Pengaturan Notifikasi
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifikasi Terbaru</CardTitle>
              <CardDescription>
                Semua notifikasi dan pemberitahuan dari sekolah untuk anak Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div key={notification.id} className="relative">
                      <div className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className={`font-medium ${notification.read ? '' : 'font-semibold'}`}>
                                {notification.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge variant={notification.read ? "outline" : "default"}>
                                  {notification.read ? "Telah Dibaca" : "Belum Dibaca"}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{notification.date}</span>
                              <span className="mx-2">•</span>
                              <span>{notification.time}</span>
                              <span className="mx-2">•</span>
                              <span className="capitalize">
                                {notification.type === "academic" && "Akademik"}
                                {notification.type === "attendance" && "Kehadiran"}
                                {notification.type === "discipline" && "Kedisiplinan"}
                                {notification.type === "announcement" && "Pengumuman"}
                                {notification.type === "general" && "Umum"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {notification.id !== mockNotifications[mockNotifications.length - 1].id && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Notifikasi Sebelumnya</Button>
              <Button>Muat Lebih Banyak</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParentPortalNotificationsPage;
