
import { LayoutDashboard, Users, GraduationCap, BookOpen, MessageSquare, 
  UserCheck, Bell, Settings, Award, BarChart3, Calendar, PlusCircle, HelpCircle, FileEdit } from 'lucide-react';
import { MenuItemType } from './types';

export const adminMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Siswa',
    path: '/student',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Guru',
    path: '/teacher',
    icon: GraduationCap,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Kelas',
    path: '/class',
    icon: BookOpen,
    roles: ['admin'],
  },
  {
    title: 'Pengaduan',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['admin'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['admin'],
  },
  {
    title: 'Portal Orang Tua',
    path: '/parent-portal',
    icon: UserCheck,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Konseling',
    path: '/counseling/manage',
    icon: HelpCircle,
    roles: ['admin'],
  },
  {
    title: 'Buat Sesi Konseling',
    path: '/counseling/session',
    icon: PlusCircle,
    roles: ['admin'],
  },
  {
    title: 'Catat Pelanggaran/Prestasi',
    path: '/discipline/manage',
    icon: FileEdit,
    roles: ['admin'],
  },
  {
    title: 'Buat Acara',
    path: '/calendar/create',
    icon: PlusCircle,
    roles: ['admin'],
  },
  {
    title: 'Pengumuman',
    path: '/announcement',
    icon: Bell,
    roles: ['admin'],
  },
  {
    title: 'Laporan & Statistik',
    path: '/reports',
    icon: BarChart3,
    roles: ['admin'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
];
