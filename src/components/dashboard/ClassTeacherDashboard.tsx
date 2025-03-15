
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Book, Users, CalendarCheck, HelpCircle, FileEdit
} from 'lucide-react';

const ClassTeacherDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link to="/class" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Book className="mr-2 h-5 w-5 text-primary" />
              Kelas Saya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kelola kelas perwalian</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/student" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Data Siswa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kelola data siswa di kelas</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/attendance" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
              Kehadiran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kelola kehadiran siswa</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/class-journal" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Book className="mr-2 h-5 w-5 text-primary" />
              Jurnal Perwalian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Kelola jurnal perwalian</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/class-journal/create" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <FileEdit className="mr-2 h-5 w-5 text-primary" />
              Buat Jurnal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Buat jurnal perwalian baru</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/counseling" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <HelpCircle className="mr-2 h-5 w-5 text-primary" />
              Konseling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Rujuk siswa untuk konseling</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default ClassTeacherDashboard;
