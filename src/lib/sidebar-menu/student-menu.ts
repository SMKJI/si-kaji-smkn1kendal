
import { LayoutDashboard, CalendarCheck, MessageSquare, 
  FileText, Award, Check, Users, FileEdit, PlusCircle } from 'lucide-react';
import { MenuItemType } from './types';

export const studentMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['student'],
  },
  {
    title: 'Kehadiran',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['student'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['student'],
  },
  {
    title: 'Pengaduan',
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
    title: 'Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['student'],
  },
  {
    title: 'Buat Perizinan',
    path: '/permission/create',
    icon: FileEdit,
    roles: ['student'],
  },
  {
    title: 'Data Siswa',
    path: '/student-data',
    icon: Users,
    roles: ['student'],
  },
  {
    title: 'Surat Keterangan',
    path: '/certificates',
    icon: Check,
    roles: ['student'],
  },
  {
    title: 'Ekstrakurikuler',
    path: '/extracurricular',
    icon: Award,
    roles: ['student'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['student'],
  },
];
