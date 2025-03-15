
import { LayoutDashboard, PlusCircle, Settings, Calendar, HelpCircle, FileText, Users, MessageSquare, Shield, BarChart3, FileCheck, UserPlus, UserCog } from 'lucide-react';
import { MenuItemType } from './types';

export const counselorMenu: MenuItemType[] = [
  {
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['counselor'],
  },
  {
    title: 'Manajemen Konseling',
    path: '/counseling/manage',
    icon: HelpCircle,
    roles: ['counselor'],
  },
  {
    title: 'Buat Sesi Konseling',
    path: '/counseling/session',
    icon: PlusCircle,
    roles: ['counselor'],
  },
  {
    title: 'Konseling Individu',
    path: '/counseling/individual',
    icon: UserPlus,
    roles: ['counselor'],
  },
  {
    title: 'Konseling Kelompok',
    path: '/counseling/group',
    icon: Users,
    roles: ['counselor'],
  },
  {
    title: 'Mediasi & Advokasi',
    path: '/counseling/mediation',
    icon: UserCog,
    roles: ['counselor'],
  },
  {
    title: 'Monitoring Pelanggaran',
    path: '/discipline',
    icon: Shield,
    roles: ['counselor'],
  },
  {
    title: 'Pendampingan Siswa',
    path: '/counseling/students',
    icon: Users,
    roles: ['counselor'],
  },
  {
    title: 'Pengaduan & Kasus',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['counselor'],
  },
  {
    title: 'Laporan Evaluasi',
    path: '/counseling/reports',
    icon: BarChart3,
    roles: ['counselor'],
  },
  {
    title: 'Surat Rekomendasi',
    path: '/counseling/recommendation',
    icon: FileCheck,
    roles: ['counselor'],
  },
  {
    title: 'Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['counselor'],
  },
  {
    title: 'Kalender Konseling',
    path: '/calendar',
    icon: Calendar,
    roles: ['counselor'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['counselor'],
  },
];
