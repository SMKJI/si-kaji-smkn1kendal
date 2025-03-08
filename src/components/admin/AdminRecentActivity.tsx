
import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminRecentActivity = () => {
  // Mock recent activities
  const recentActivities = [
    {
      action: 'User login',
      user: 'admin@smkn1kendal.sch.id',
      time: 'Baru saja',
    },
    {
      action: 'Update Pengguna',
      user: 'guru_bk',
      time: '10 menit lalu',
    },
    {
      action: 'Sistem backup',
      user: 'sistem',
      time: '2 jam lalu',
    },
    {
      action: 'Reset Password',
      user: 'kesiswaan',
      time: '3 jam lalu',
    },
    {
      action: 'Tambah Pengguna',
      user: 'admin@smkn1kendal.sch.id',
      time: '4 jam lalu',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Aktivitas Terbaru</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>
          Log aktivitas terakhir pada sistem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex flex-col space-y-1 pb-3 border-b last:border-0 last:pb-0">
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">{activity.action}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-xs text-muted-foreground">Oleh: {activity.user}</p>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4 text-xs">
          Lihat Semua Aktivitas <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminRecentActivity;
