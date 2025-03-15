
import { LayoutDashboard, MessageSquare, Shield, FileEdit, Settings, 
  BarChart3, Bell, Trophy, Users, FileText } from 'lucide-react';
import { MenuItemType } from './types';

export const tppkMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['tppk'],
  },
  {
    title: 'Pengaduan',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['tppk'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['tppk'],
  },
  {
    title: 'Pencatatan Pelanggaran',
    path: '/discipline',
    icon: Shield,
    roles: ['tppk'],
  },
  {
    title: 'Catat Pelanggaran/Prestasi',
    path: '/discipline/manage',
    icon: FileEdit,
    roles: ['tppk'],
  },
  {
    title: 'Sistem Gamifikasi',
    path: '/gamification',
    icon: Trophy,
    roles: ['tppk'],
  },
  {
    title: 'Data Siswa',
    path: '/student-data',
    icon: Users,
    roles: ['tppk'],
  },
  {
    title: 'Notifikasi',
    path: '/notifications',
    icon: Bell,
    roles: ['tppk'],
  },
  {
    title: 'Laporan Evaluasi',
    path: '/reports',
    icon: BarChart3,
    roles: ['tppk'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['tppk'],
  },
];
