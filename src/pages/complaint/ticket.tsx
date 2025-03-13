
import React, { useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const TicketStatusPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Status Tiket Pengaduan - Si-Kaji';
  }, []);

  return (
    <DashboardLayout 
      title="Status Tiket Pengaduan" 
      description="Lacak status pengaduan yang telah diajukan" 
      showBackButton
      backTo="/complaint"
      userRole="student"
      userName="Ahmad Fauzi"
    >
      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Detail Pengaduan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Informasi status pengaduan Anda</p>
          {/* Ticket status content will go here */}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TicketStatusPage;
