
import { LayoutDashboard, Users, BookOpen, CalendarCheck, 
  MessageSquare, FileText, Settings, Shield, BookText, FileEdit, Check } from 'lucide-react';
import { MenuItemType } from './types';
import { HelpCircle } from 'lucide-react';

export const classTeacherMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['class_teacher'],
  },
  {
    title: 'Manajemen Siswa',
    path: '/student',
    icon: Users,
    roles: ['class_teacher'],
  },
  {
    title: 'Manajemen Kelas',
    path: '/class',
    icon: BookOpen,
    roles: ['class_teacher'],
  },
  {
    title: 'Kehadiran',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['class_teacher'],
  },
  {
    title: 'Konseling',
    path: '/counseling',
    icon: HelpCircle,
    roles: ['class_teacher'],
  },
  {
    title: 'Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['class_teacher'],
  },
  {
    title: 'Data Siswa',
    path: '/student-data',
    icon: Users,
    roles: ['class_teacher'],
  },
  {
    title: 'Jurnal Perwalian',
    path: '/class-journal',
    icon: BookText,
    roles: ['class_teacher'],
  },
  {
    title: 'Buat Jurnal',
    path: '/class-journal/create',
    icon: FileEdit,
    roles: ['class_teacher'],
  },
  {
    title: 'Pencatatan Pelanggaran',
    path: '/discipline',
    icon: Shield,
    roles: ['class_teacher'],
  },
  {
    title: 'Surat Keterangan',
    path: '/certificates',
    icon: Check,
    roles: ['class_teacher'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['class_teacher'],
  },
];
