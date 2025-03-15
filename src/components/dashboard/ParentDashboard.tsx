
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, CalendarCheck, MessageSquare, ClipboardList, Calendar
} from 'lucide-react';

const ParentDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link to="/student/child" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Data Anak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lihat profil dan informasi anak</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/attendance/child" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CalendarCheck className="mr-2 h-5 w-5 text-primary" />
              Kehadiran Anak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Pantau kehadiran dan keterlambatan anak</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/parent-complaint/new" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Pengaduan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Sampaikan pengaduan atau keluhan</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/student-activities/child" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <ClipboardList className="mr-2 h-5 w-5 text-primary" />
              Kegiatan Anak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lihat kegiatan dan aktivitas anak</p>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/calendar" className="block">
        <Card className="hover:shadow-md transition-shadow h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Kalender
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Lihat jadwal sekolah dan kegiatan</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default ParentDashboard;
