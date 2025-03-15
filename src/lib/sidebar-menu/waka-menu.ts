
import { LayoutDashboard, Users, GraduationCap, BookOpen, 
  CalendarCheck, MessageSquare, Shield, BookText, Award, Bell, 
  BarChart3, Settings, PlusCircle, ClipboardList, FileText, FileEdit, Trophy, FileCheck } from 'lucide-react';
import { MenuItemType } from './types';

export const wakaMenu: MenuItemType[] = [
  {
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['waka'],
  },
  {
    title: 'Manajemen Kesiswaan',
    path: '/student',
    icon: Users,
    roles: ['waka'],
  },
  {
    title: 'Presensi & Disiplin',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['waka'],
  },
  {
    title: 'Monitoring Pelanggaran',
    path: '/discipline',
    icon: Shield,
    roles: ['waka'],
  },
  {
    title: 'Pengaduan & Kasus',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['waka'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['waka'],
  },
  {
    title: 'Persetujuan Proposal',
    path: '/proposal',
    icon: FileCheck,
    roles: ['waka'],
  },
  {
    title: 'Managemen Ekstrakurikuler',
    path: '/extracurricular',
    icon: Award,
    roles: ['waka'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['waka'],
  },
  {
    title: 'Perizinan Siswa',
    path: '/permission',
    icon: FileText,
    roles: ['waka'],
  },
  {
    title: 'Prestasi Siswa',
    path: '/achievements',
    icon: Trophy,
    roles: ['waka'],
  },
  {
    title: 'Jurnal Perwalian',
    path: '/class-journal',
    icon: BookText,
    roles: ['waka'],
  },
  {
    title: 'Laporan & Statistik',
    path: '/reports',
    icon: BarChart3,
    roles: ['waka'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['waka'],
  },
];
