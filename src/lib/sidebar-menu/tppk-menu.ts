
import { LayoutDashboard, FileText, MessageSquare, Bell, Settings, Shield, BarChart3, Award, FileEdit, UserCheck, Eye, MailWarning } from 'lucide-react';
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
    title: 'Pengaduan Anonim',
    path: '/complaint/anonymous',
    icon: Eye,
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
    title: 'Pencatatan Pelanggaran',
    path: '/discipline/record',
    icon: FileEdit,
    roles: ['tppk'],
  },
  {
    title: 'Sistem Gamifikasi',
    path: '/gamification',
    icon: Award,
    roles: ['tppk'],
  },
  {
    title: 'Manajemen Reward',
    path: '/reward',
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
    title: 'Notifikasi Pelanggaran',
    path: '/notifications/violations',
    icon: MailWarning,
    roles: ['tppk'],
  },
  {
    title: 'Verifikasi Wali Kelas',
    path: '/verification/teacher',
    icon: UserCheck,
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
