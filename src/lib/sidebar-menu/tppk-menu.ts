
import { LayoutDashboard, MessageSquare, Shield, FileEdit, Settings, 
  BarChart3, Bell, Trophy, Users, FileText, ClipboardList } from 'lucide-react';
import { MenuItemType } from './types';

export const tppkMenu: MenuItemType[] = [
  {
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['tppk'],
  },
  {
    title: 'Monitoring Pengaduan',
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
    title: 'Tindak Lanjut Kasus',
    path: '/tppk/cases',
    icon: ClipboardList,
    roles: ['tppk'],
  },
  {
    title: 'Pelanggaran Tata Tertib',
    path: '/discipline',
    icon: Shield,
    roles: ['tppk'],
  },
  {
    title: 'Catat Pelanggaran',
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
    title: 'Evaluasi & Laporan',
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
