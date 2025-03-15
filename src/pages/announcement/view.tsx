
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Announcement } from '@/lib/types/announcement';
import { getAnnouncements } from '@/services/announcementService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const AnnouncementViewPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAnnouncements = () => {
      try {
        const data = getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, []);
  
  // Filter announcements by importance
  const importantAnnouncements = announcements.filter(announcement => announcement.important);
  const regularAnnouncements = announcements.filter(announcement => !announcement.important);
  
  const renderAnnouncement = (announcement: Announcement) => (
    <Card key={announcement.id} className={`mb-4 ${announcement.important ? 'border-red-400' : 'border-blue-200'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2">
            <Bell className={`h-5 w-5 mt-1 ${announcement.important ? 'text-red-600' : 'text-blue-600'}`} />
            <div>
              <CardTitle className="text-lg flex items-center">
                {announcement.title}
                {announcement.important && (
                  <Badge className="ml-2 bg-red-500">Penting</Badge>
                )}
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-xs">
            {new Date(announcement.date).toLocaleDateString('id-ID', { 
              year: 'numeric', month: 'long', day: 'numeric' 
            })}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{announcement.content}</p>
      </CardContent>
    </Card>
  );
  
  return (
    <DashboardLayout
      title="Pengumuman Sekolah"
      description="Lihat semua pengumuman penting dan informasi terbaru dari sekolah"
      userRole="student"
    >
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : announcements.length === 0 ? (
        <Alert>
          <AlertTitle>Tidak ada pengumuman</AlertTitle>
          <AlertDescription>
            Belum ada pengumuman yang dibuat saat ini. Silakan periksa kembali nanti.
          </AlertDescription>
        </Alert>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="important">Penting</TabsTrigger>
            <TabsTrigger value="regular">Reguler</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {announcements.map(renderAnnouncement)}
          </TabsContent>
          
          <TabsContent value="important" className="space-y-4">
            {importantAnnouncements.length > 0 ? (
              importantAnnouncements.map(renderAnnouncement)
            ) : (
              <Alert>
                <AlertTitle>Tidak ada pengumuman penting</AlertTitle>
                <AlertDescription>
                  Belum ada pengumuman penting yang dibuat saat ini.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="regular" className="space-y-4">
            {regularAnnouncements.length > 0 ? (
              regularAnnouncements.map(renderAnnouncement)
            ) : (
              <Alert>
                <AlertTitle>Tidak ada pengumuman reguler</AlertTitle>
                <AlertDescription>
                  Belum ada pengumuman reguler yang dibuat saat ini.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      )}
    </DashboardLayout>
  );
};

export default AnnouncementViewPage;
