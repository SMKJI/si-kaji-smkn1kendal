
import { LayoutDashboard, Users, GraduationCap, BookOpen, MessageSquare, 
  UserCheck, Bell, Settings, Award, BarChart3, Calendar, PlusCircle, HelpCircle, 
  FileEdit, CalendarCheck, Shield, FileText, FileCheck } from 'lucide-react';
import { MenuItemType } from './types';

export const adminMenu: MenuItemType[] = [
  {
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin'],
  },
  {
    title: 'Manajemen User',
    path: '/user-management',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Guru',
    path: '/teacher',
    icon: GraduationCap,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Siswa',
    path: '/student',
    icon: Users,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Kelas',
    path: '/class',
    icon: BookOpen,
    roles: ['admin'],
  },
  {
    title: 'Presensi & Disiplin',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['admin'],
  },
  {
    title: 'Pengaduan Siswa',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['admin'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['admin'],
  },
  {
    title: 'Portal Orang Tua',
    path: '/parent-portal',
    icon: UserCheck,
    roles: ['admin'],
  },
  {
    title: 'Sistem Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Konseling',
    path: '/counseling/manage',
    icon: HelpCircle,
    roles: ['admin'],
  },
  {
    title: 'Ekstrakurikuler',
    path: '/extracurricular',
    icon: Award,
    roles: ['admin'],
  },
  {
    title: 'Pelanggaran & Prestasi',
    path: '/discipline/manage',
    icon: FileEdit,
    roles: ['admin'],
  },
  {
    title: 'Permohonan Surat',
    path: '/certificates',
    icon: FileCheck,
    roles: ['admin'],
  },
  {
    title: 'Proposal Kegiatan',
    path: '/proposal',
    icon: FileCheck,
    roles: ['admin'],
  },
  {
    title: 'Buat Acara',
    path: '/calendar/create',
    icon: PlusCircle,
    roles: ['admin'],
  },
  {
    title: 'Pengumuman',
    path: '/announcement',
    icon: Bell,
    roles: ['admin'],
  },
  {
    title: 'Laporan & Statistik',
    path: '/reports',
    icon: BarChart3,
    roles: ['admin'],
  },
  {
    title: 'Pengaturan Sistem',
    path: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
];
