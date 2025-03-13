
import React, { useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Book } from 'lucide-react';

const ClassManagementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Kelas - Si-Kaji';
  }, []);

  return (
    <DashboardLayout 
      title="Manajemen Kelas" 
      description="Kelola data kelas, wali kelas, dan siswa" 
      showBackButton
      backTo="/dashboard"
      userRole="admin"
      userName="Administrator"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Book className="mr-2 h-5 w-5 text-primary" />
              Daftar Kelas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kelola kelas dan komposisi siswa</p>
            {/* Class management content will go here */}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Wali Kelas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kelola penugasan wali kelas</p>
            {/* Class advisor content will go here */}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClassManagementPage;
