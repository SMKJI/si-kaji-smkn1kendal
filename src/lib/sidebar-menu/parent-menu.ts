
import { Home, CalendarCheck, MessageSquare, Bell, Settings, Trophy, Calendar, Shield, Users, BarChart3, Clock, Graduation, Mail } from 'lucide-react';
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
    title: 'Prestasi Akademik',
    path: '/parent-portal/academic',
    icon: Graduation,
    roles: ['parent'],
  },
  {
    title: 'Prestasi Non-Akademik',
    path: '/achievements',
    icon: Trophy,
    roles: ['parent'],
  },
  {
    title: 'Riwayat Keterlambatan',
    path: '/parent-portal/late-history',
    icon: Clock,
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
    title: 'Pesan dari Sekolah',
    path: '/parent-portal/messages',
    icon: Mail,
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
