
import { Home, CalendarCheck, MessageSquare, Bell, Settings, Trophy, Calendar, Shield, Users, BarChart3 } from 'lucide-react';
import { MenuItemType } from './types';

export const parentMenu: MenuItemType[] = [
  {
    title: 'Dashboard Orang Tua',
    path: '/parent-portal/dashboard',
    icon: Home,
    roles: ['parent'],
  },
  {
    title: 'Profil Anak',
    path: '/parent-portal/child-profile',
    icon: Users,
    roles: ['parent'],
  },
  {
    title: 'Monitoring Kehadiran',
    path: '/parent-portal/attendance',
    icon: CalendarCheck,
    roles: ['parent'],
  },
  {
    title: 'Catatan Kedisiplinan',
    path: '/parent-portal/discipline',
    icon: Shield,
    roles: ['parent'],
  },
  {
    title: 'Prestasi Anak',
    path: '/achievements',
    icon: Trophy,
    roles: ['parent'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['parent'],
  },
  {
    title: 'Laporan Perkembangan',
    path: '/parent-portal/reports',
    icon: BarChart3,
    roles: ['parent'],
  },
  {
    title: 'Notifikasi',
    path: '/parent-portal/notifications',
    icon: Bell,
    roles: ['parent'],
  },
  {
    title: 'Kalender Kegiatan',
    path: '/calendar',
    icon: Calendar,
    roles: ['parent'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['parent'],
  },
];
