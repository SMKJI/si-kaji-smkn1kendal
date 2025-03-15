
import { LayoutDashboard, CalendarCheck, MessageSquare, 
  FileText, Award, Check, Users, FileEdit, PlusCircle, ClipboardList, HelpCircle, Settings, BookOpen } from 'lucide-react';
import { MenuItemType } from './types';

export const studentMenu: MenuItemType[] = [
  {
    title: 'Dashboard Utama',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['student'],
  },
  {
    title: 'Profil & Data Akademik',
    path: '/student-data/profile',
    icon: Users,
    roles: ['student'],
  },
  {
    title: 'Kehadiran',
    path: '/attendance/me',
    icon: CalendarCheck,
    roles: ['student'],
  },
  {
    title: 'Pengajuan Izin',
    path: '/permission/create',
    icon: FileEdit,
    roles: ['student'],
  },
  {
    title: 'Perizinan Saya',
    path: '/permission',
    icon: FileText,
    roles: ['student'],
  },
  {
    title: 'Laporan Pengaduan',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['student'],
  },
  {
    title: 'Konseling',
    path: '/counseling',
    icon: HelpCircle,
    roles: ['student'],
  },
  {
    title: 'Kegiatan Saya',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['student'],
  },
  {
    title: 'Proposal Kegiatan',
    path: '/student-activities/proposal',
    icon: FileText,
    roles: ['student'],
  },
  {
    title: 'Ekstrakurikuler',
    path: '/extracurricular',
    icon: Award,
    roles: ['student'],
  },
  {
    title: 'Surat Keterangan',
    path: '/certificates',
    icon: Check,
    roles: ['student'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['student'],
  },
];
