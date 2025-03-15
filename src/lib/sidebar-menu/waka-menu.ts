
import { LayoutDashboard, Users, GraduationCap, BookOpen, 
  CalendarCheck, MessageSquare, Shield, BookText, Award, Bell, 
  BarChart3, Settings, PlusCircle, ClipboardList, FileText, FileEdit, Trophy, FileCheck } from 'lucide-react';
import { MenuItemType } from './types';

export const wakaMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['waka'],
  },
  {
    title: 'Manajemen Siswa',
    path: '/student',
    icon: Users,
    roles: ['waka'],
  },
  {
    title: 'Manajemen Guru',
    path: '/teacher',
    icon: GraduationCap,
    roles: ['waka'],
  },
  {
    title: 'Manajemen Kelas',
    path: '/class',
    icon: BookOpen,
    roles: ['waka'],
  },
  {
    title: 'Kehadiran',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['waka'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['waka'],
  },
  {
    title: 'Pengaduan',
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
    title: 'Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['waka'],
  },
  {
    title: 'Jurnal Perwalian',
    path: '/class-journal',
    icon: BookText,
    roles: ['waka'],
  },
  {
    title: 'Pencatatan Pelanggaran',
    path: '/discipline',
    icon: Shield,
    roles: ['waka'],
  },
  {
    title: 'Catat Pelanggaran/Prestasi',
    path: '/discipline/manage',
    icon: FileEdit,
    roles: ['waka'],
  },
  {
    title: 'Prestasi Siswa',
    path: '/achievements',
    icon: Trophy,
    roles: ['waka'],
  },
  {
    title: 'Ekstrakurikuler',
    path: '/extracurricular',
    icon: Award,
    roles: ['waka'],
  },
  {
    title: 'Persetujuan Proposal',
    path: '/proposal',
    icon: FileCheck,
    roles: ['waka'],
  },
  {
    title: 'Buat Acara',
    path: '/calendar/create',
    icon: PlusCircle,
    roles: ['waka'],
  },
  {
    title: 'Pengumuman',
    path: '/announcement',
    icon: Bell,
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
