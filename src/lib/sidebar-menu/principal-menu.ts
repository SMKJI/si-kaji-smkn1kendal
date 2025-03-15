
import { LayoutDashboard, Users, GraduationCap, CalendarCheck, 
  MessageSquare, Bell, BarChart3, Settings, FileCheck, ClipboardList, BookText, Trophy, Shield } from 'lucide-react';
import { MenuItemType } from './types';

export const principalMenu: MenuItemType[] = [
  {
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['principal'],
  },
  {
    title: 'Laporan Evaluasi',
    path: '/reports',
    icon: BarChart3,
    roles: ['principal'],
  },
  {
    title: 'Persetujuan Proposal',
    path: '/proposal',
    icon: FileCheck,
    roles: ['principal'],
  },
  {
    title: 'Monitoring Pengaduan',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['principal'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['principal'],
  },
  {
    title: 'Manajemen Siswa',
    path: '/student',
    icon: Users,
    roles: ['principal'],
  },
  {
    title: 'Manajemen Guru',
    path: '/teacher',
    icon: GraduationCap,
    roles: ['principal'],
  },
  {
    title: 'Monitoring Presensi',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['principal'],
  },
  {
    title: 'Monitoring Pelanggaran',
    path: '/discipline',
    icon: Shield,
    roles: ['principal'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['principal'],
  },
  {
    title: 'Jurnal Perwalian',
    path: '/class-journal',
    icon: BookText,
    roles: ['principal'],
  },
  {
    title: 'Prestasi Siswa',
    path: '/achievements',
    icon: Trophy,
    roles: ['principal'],
  },
  {
    title: 'Pengumuman',
    path: '/announcement',
    icon: Bell,
    roles: ['principal'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['principal'],
  },
];
