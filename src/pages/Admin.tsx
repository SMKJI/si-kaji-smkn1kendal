
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminOverviewStats from '@/components/admin/AdminOverviewStats';
import AdminActivityChart from '@/components/admin/AdminActivityChart';
import AdminRecentActivity from '@/components/admin/AdminRecentActivity';

const Admin = () => {
  const adminModules = [
    { 
      title: 'Manajemen Pengguna', 
      description: 'Kelola akun, role, dan hak akses pengguna sistem', 
      icon: Users, 
      link: '/admin/users'
    },
    { 
      title: 'Konfigurasi Sistem', 
      description: 'Atur notifikasi, backup, dan parameter sistem', 
      icon: Settings, 
      link: '/admin/config'
    },
    { 
      title: 'Audit Log & Laporan', 
      description: 'Lihat histori aktivitas dan ekspor laporan', 
      icon: FileText, 
      link: '/admin/audit'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Kelola semua aspek sistem dari satu tempat</p>
        </div>

        {/* Admin Overview Statistics */}
        <AdminOverviewStats />

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <AdminActivityChart className="col-span-1 lg:col-span-2" />
          <AdminRecentActivity />
        </div>

        {/* Admin Modules */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Modul Admin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminModules.map((module, index) => (
              <Card key={index} className="overflow-hidden border">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <module.icon className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-md" />
                  </div>
                  <CardTitle className="mt-4 text-lg">{module.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 pb-4">
                  <Link to={module.link} className="w-full">
                    <Button variant="outline" className="w-full justify-between">
                      Akses <ChevronRight size={16} />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
