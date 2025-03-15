
import { LayoutDashboard, ClipboardList, Award, Calendar, Settings, FileEdit, Users, FileText } from 'lucide-react';
import { MenuItemType } from './types';

export const trainerMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['trainer'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['trainer'],
  },
  {
    title: 'Manajemen Ekstrakurikuler',
    path: '/extracurricular/manage',
    icon: Award,
    roles: ['trainer'],
  },
  {
    title: 'Jurnal Ekstrakurikuler',
    path: '/extracurricular/journal',
    icon: FileEdit,
    roles: ['trainer'],
  },
  {
    title: 'Presensi Peserta',
    path: '/extracurricular/attendance',
    icon: Users,
    roles: ['trainer'],
  },
  {
    title: 'Program Latihan',
    path: '/extracurricular/training',
    icon: FileText,
    roles: ['trainer'],
  },
  {
    title: 'Kalender Akademik',
    path: '/calendar',
    icon: Calendar,
    roles: ['trainer'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['trainer'],
  },
];
