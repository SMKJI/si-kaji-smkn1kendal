
import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// In a real app, this would come from an API
const dummyAnnouncements = [
  {
    id: 1,
    title: 'Pengumuman Pendaftaran Ekstrakurikuler',
    content: 'Pendaftaran ekstrakurikuler untuk semester baru telah dibuka. Silakan mendaftar melalui sistem Si-Kaji sebelum tanggal 15 September 2023.',
    date: '2023-09-01',
    important: true,
  },
  {
    id: 2,
    title: 'Jadwal Ujian Tengah Semester',
    content: 'Ujian Tengah Semester akan dilaksanakan pada tanggal 10-15 Oktober 2023. Siswa wajib hadir tepat waktu dan membawa perlengkapan yang diperlukan.',
    date: '2023-09-15',
    important: false,
  },
  {
    id: 3,
    title: 'Pemeliharaan Sistem',
    content: 'Sistem Si-Kaji akan mengalami pemeliharaan pada tanggal 20 September 2023 dari pukul 22:00 - 02:00 WIB. Mohon maaf atas ketidaknyamanan ini.',
    date: '2023-09-18',
    important: true,
  },
];

type Announcement = {
  id: number;
  title: string;
  content: string;
  date: string;
  important: boolean;
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(dummyAnnouncements);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (announcements.length === 0) {
    return null;
  }
  
  const currentAnnouncement = announcements[currentIndex];
  
  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev === announcements.length - 1 ? 0 : prev + 1));
  };
  
  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev === 0 ? announcements.length - 1 : prev - 1));
  };
  
  return (
    <div className="py-4 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <Alert className={`relative ${currentAnnouncement.important ? 'border-red-400 bg-red-50 dark:bg-red-950/20 dark:border-red-900' : 'border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900'}`}>
          <div className="flex justify-between items-start">
            <div className="flex items-start">
              <Bell className={`h-5 w-5 mr-2 mt-1 ${currentAnnouncement.important ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`} />
              <div>
                <AlertTitle className="text-lg font-semibold flex items-center">
                  {currentAnnouncement.title}
                  {currentAnnouncement.important && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Penting</span>
                  )}
                </AlertTitle>
                <AlertDescription className="mt-1">
                  {currentAnnouncement.content}
                </AlertDescription>
                <p className="text-xs text-muted-foreground mt-2">
                  Diposting pada: {new Date(currentAnnouncement.date).toLocaleDateString('id-ID', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
          
          {announcements.length > 1 && (
            <div className="flex items-center justify-center mt-4 space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={prevAnnouncement}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Pengumuman sebelumnya</span>
              </Button>
              <span className="text-xs text-muted-foreground">
                {currentIndex + 1} / {announcements.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={nextAnnouncement}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Pengumuman selanjutnya</span>
              </Button>
            </div>
          )}
        </Alert>
      </div>
    </div>
  );
};

export default Announcements;
