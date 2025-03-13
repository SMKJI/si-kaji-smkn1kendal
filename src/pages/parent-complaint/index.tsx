
import React, { useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus } from 'lucide-react';

const ParentComplaintPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Pengaduan Orang Tua - Si-Kaji';
  }, []);

  return (
    <DashboardLayout 
      title="Pengaduan Orang Tua" 
      description="Sampaikan pengaduan atau masukan kepada pihak sekolah" 
      showBackButton
      backTo="/dashboard"
      userRole="parent"
      userName="Budi Santoso"
    >
      <div className="flex justify-end mb-4">
        <Button className="gap-1">
          <Plus size={16} />
          Buat Pengaduan Baru
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Daftar Pengaduan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Lihat dan kelola pengaduan yang telah diajukan</p>
          {/* Parent complaint content will go here */}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ParentComplaintPage;
