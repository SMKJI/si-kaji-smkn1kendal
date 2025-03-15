
import { LayoutDashboard, ClipboardList, Award, Calendar, Settings, FileEdit, Users, Dumbbell, Clock, CheckSquare } from 'lucide-react';
import { MenuItemType } from './types';

export const trainerMenu: MenuItemType[] = [
  {
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['trainer'],
  },
  {
    title: 'Manajemen Ekstrakurikuler',
    path: '/extracurricular/manage',
    icon: Award,
    roles: ['trainer'],
  },
  {
    title: 'Presensi Peserta',
    path: '/extracurricular/attendance',
    icon: Users,
    roles: ['trainer'],
  },
  {
    title: 'Presensi Mandiri',
    path: '/extracurricular/my-attendance',
    icon: CheckSquare,
    roles: ['trainer'],
  },
  {
    title: 'Jurnal Ekstrakurikuler',
    path: '/extracurricular/journal',
    icon: FileEdit,
    roles: ['trainer'],
  },
  {
    title: 'Program Latihan',
    path: '/extracurricular/training',
    icon: Dumbbell,
    roles: ['trainer'],
  },
  {
    title: 'Jadwal Kegiatan',
    path: '/extracurricular/schedule',
    icon: Clock,
    roles: ['trainer'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['trainer'],
  },
  {
    title: 'Jadwal Kegiatan',
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
