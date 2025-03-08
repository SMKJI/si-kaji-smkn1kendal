
import React from 'react';
import { Users, Bell, FileText, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminOverviewStats = () => {
  const stats = [
    { 
      title: 'Total Pengguna', 
      value: '245', 
      change: '+12%', 
      icon: Users, 
      trend: 'up',
      description: 'Dari bulan lalu'
    },
    { 
      title: 'Insiden Sistem', 
      value: '3', 
      change: '-25%', 
      icon: ShieldAlert, 
      trend: 'down',
      description: 'Dibandingkan minggu lalu'
    },
    { 
      title: 'Notifikasi', 
      value: '18', 
      change: '+4', 
      icon: Bell, 
      trend: 'up',
      description: 'Belum dibaca'
    },
    { 
      title: 'Update Sistem', 
      value: '1', 
      change: 'Tersedia', 
      icon: FileText, 
      trend: 'neutral',
      description: 'Versi terbaru'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription className="text-2xl font-bold mt-2">
              {stat.value}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-3 pt-0">
            <div className="text-xs flex items-center">
              <span className={`mr-1 ${
                stat.trend === 'up' ? 'text-green-500' : 
                stat.trend === 'down' ? 'text-red-500' : 
                'text-muted-foreground'
              }`}>
                {stat.change}
              </span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminOverviewStats;
