
import { Home, CalendarCheck, MessageSquare, Bell, Settings, UserCheck, Trophy, Calendar, BookOpen, Shield, BookText } from 'lucide-react';
import { MenuItemType } from './types';

export const parentMenu: MenuItemType[] = [
  {
    title: 'Dashboard Orang Tua',
    path: '/parent-portal/dashboard',
    icon: Home,
    roles: ['parent'],
  },
  {
    title: 'Akademik Anak',
    path: '/parent-portal/academic',
    icon: BookOpen,
    roles: ['parent'],
  },
  {
    title: 'Kehadiran',
    path: '/parent-portal/attendance',
    icon: CalendarCheck,
    roles: ['parent'],
  },
  {
    title: 'Kedisiplinan',
    path: '/parent-portal/discipline',
    icon: Shield,
    roles: ['parent'],
  },
  {
    title: 'Tugas & PR',
    path: '/parent-portal/assignments',
    icon: BookText,
    roles: ['parent'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['parent'],
  },
  {
    title: 'Portal Orang Tua',
    path: '/parent-portal',
    icon: UserCheck,
    roles: ['parent'],
  },
  {
    title: 'Prestasi Siswa',
    path: '/achievements',
    icon: Trophy,
    roles: ['parent'],
  },
  {
    title: 'Pengumuman',
    path: '/announcement',
    icon: Bell,
    roles: ['parent'],
  },
  {
    title: 'Notifikasi',
    path: '/parent-portal/notifications',
    icon: Bell,
    roles: ['parent'],
  },
  {
    title: 'Kalender Akademik',
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
