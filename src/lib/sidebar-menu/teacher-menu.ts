
import { LayoutDashboard, Users, CalendarCheck, 
  MessageSquare, FileText, Settings, Shield, ClipboardList, HelpCircle, Award, Trophy, FileEdit, GraduationCap, BookOpen } from 'lucide-react';
import { MenuItemType } from './types';

export const teacherMenu: MenuItemType[] = [
  {
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['teacher'],
  },
  {
    title: 'Manajemen Siswa',
    path: '/student',
    icon: Users,
    roles: ['teacher'],
  },
  {
    title: 'Data Akademik',
    path: '/academic',
    icon: GraduationCap,
    roles: ['teacher'],
  },
  {
    title: 'Kegiatan Belajar',
    path: '/learning-activities',
    icon: BookOpen,
    roles: ['teacher'],
  },
  {
    title: 'Kehadiran Siswa',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['teacher'],
  },
  {
    title: 'Input Prestasi',
    path: '/achievements/create',
    icon: Trophy,
    roles: ['teacher'],
  },
  {
    title: 'Input Pelanggaran',
    path: '/discipline/record',
    icon: Shield,
    roles: ['teacher'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['teacher'],
  },
  {
    title: 'Laporan Aktivitas',
    path: '/reports/activities',
    icon: FileEdit,
    roles: ['teacher'],
  },
  {
    title: 'Konseling & Pendampingan',
    path: '/counseling',
    icon: HelpCircle,
    roles: ['teacher'],
  },
  {
    title: 'Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['teacher'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['teacher'],
  },
];
