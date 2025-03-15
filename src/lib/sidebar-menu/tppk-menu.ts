
import { LayoutDashboard, FileText, MessageSquare, Bell, Settings, Shield, BarChart3, Award } from 'lucide-react';
import { MenuItemType } from './types';

export const tppkMenu: MenuItemType[] = [
  {
    title: 'Dashboard TPPK',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['tppk'],
  },
  {
    title: 'Pengaduan & Kasus',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['tppk'],
  },
  {
    title: 'Tindak Lanjut Kasus',
    path: '/discipline/manage',
    icon: Shield,
    roles: ['tppk'],
  },
  {
    title: 'Pelanggaran Tata Tertib',
    path: '/discipline',
    icon: Shield,
    roles: ['tppk'],
  },
  {
    title: 'Sistem Gamifikasi',
    path: '/gamification',
    icon: Award,
    roles: ['tppk'],
  },
  {
    title: 'Evaluasi & Laporan',
    path: '/reports',
    icon: BarChart3,
    roles: ['tppk'],
  },
  {
    title: 'Kirim Notifikasi',
    path: '/notifications',
    icon: Bell,
    roles: ['tppk'],
  },
  {
    title: 'Surat Rekomendasi',
    path: '/certificates',
    icon: FileText,
    roles: ['tppk'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['tppk'],
  },
];
