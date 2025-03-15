
import { 
  LayoutDashboard, Users, BookOpen, CalendarCheck, 
  FileText, MessageSquare, GraduationCap, Award, 
  UserCheck, ClipboardList, Bell, Settings,
  School, Shield, HelpCircle, Check, BookCheck,
  ChartGantt, BookText, Trophy, Calendar, FileCheck,
  PlusCircle, FileEdit, Send, Briefcase, BarChart3,
  ListChecks, Home
} from 'lucide-react';

export type MenuItemType = {
  title: string;
  path: string;
  icon: any;
  roles: Array<'admin' | 'teacher' | 'student' | 'parent' | 'principal' | 'counselor' | 'class_teacher' | 'waka' | 'tppk' | 'trainer'>;
};

export const mainMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'teacher', 'student', 'principal', 'counselor', 'class_teacher', 'waka', 'tppk', 'trainer'],
  },
  {
    title: 'Dashboard Orang Tua',
    path: '/parent-portal/dashboard',
    icon: Home,
    roles: ['parent'],
  },
  {
    title: 'Manajemen Siswa',
    path: '/student',
    icon: Users,
    roles: ['admin', 'teacher', 'class_teacher', 'waka', 'principal'],
  },
  {
    title: 'Manajemen Guru',
    path: '/teacher',
    icon: GraduationCap,
    roles: ['admin', 'principal', 'waka'],
  },
  {
    title: 'Manajemen Kelas',
    path: '/class',
    icon: BookOpen,
    roles: ['admin', 'teacher', 'class_teacher', 'waka'],
  },
  {
    title: 'Kehadiran',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['admin', 'teacher', 'student', 'parent', 'class_teacher', 'waka', 'principal'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['admin', 'teacher', 'student', 'waka', 'principal', 'trainer'],
  },
  {
    title: 'Pengaduan',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['admin', 'student', 'tppk', 'waka', 'principal'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['parent', 'admin', 'tppk', 'waka', 'principal'],
  },
  {
    title: 'Portal Orang Tua',
    path: '/parent-portal',
    icon: UserCheck,
    roles: ['parent', 'admin'],
  },
  {
    title: 'Konseling',
    path: '/counseling',
    icon: HelpCircle,
    roles: ['student', 'teacher', 'class_teacher'],
  },
  {
    title: 'Manajemen Konseling',
    path: '/counseling/manage',
    icon: HelpCircle,
    roles: ['counselor', 'admin'],
  },
  {
    title: 'Buat Sesi Konseling',
    path: '/counseling/session',
    icon: PlusCircle,
    roles: ['counselor', 'admin'],
  },
  {
    title: 'Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['student', 'admin', 'teacher', 'class_teacher', 'waka', 'counselor'],
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
    roles: ['student', 'class_teacher'],
  },
  {
    title: 'Jurnal Perwalian',
    path: '/class-journal',
    icon: BookText,
    roles: ['class_teacher', 'waka', 'principal'],
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
    roles: ['admin', 'teacher', 'class_teacher', 'tppk', 'waka'],
  },
  {
    title: 'Catat Pelanggaran/Prestasi',
    path: '/discipline/manage',
    icon: FileEdit,
    roles: ['admin', 'tppk', 'waka'],
  },
  {
    title: 'Prestasi Siswa',
    path: '/achievements',
    icon: Trophy,
    roles: ['admin', 'teacher', 'student', 'parent', 'principal', 'waka'],
  },
  {
    title: 'Surat Keterangan',
    path: '/certificates',
    icon: Check,
    roles: ['student', 'admin', 'class_teacher'],
  },
  {
    title: 'Ekstrakurikuler',
    path: '/extracurricular',
    icon: Award,
    roles: ['student', 'waka', 'admin'],
  },
  {
    title: 'Manajemen Ekstrakurikuler',
    path: '/extracurricular/manage',
    icon: Award,
    roles: ['trainer', 'admin'],
  },
  {
    title: 'Persetujuan Proposal',
    path: '/proposal',
    icon: FileCheck,
    roles: ['principal', 'waka', 'admin'],
  },
  {
    title: 'Kalender Akademik',
    path: '/calendar',
    icon: Calendar,
    roles: ['admin', 'teacher', 'student', 'parent', 'principal', 'counselor', 'class_teacher', 'waka', 'trainer'],
  },
  {
    title: 'Buat Acara',
    path: '/calendar/create',
    icon: PlusCircle,
    roles: ['admin', 'waka', 'principal'],
  },
  {
    title: 'Pengumuman',
    path: '/announcement',
    icon: Bell,
    roles: ['admin', 'teacher', 'student', 'parent', 'principal', 'waka'],
  },
  {
    title: 'Laporan & Statistik',
    path: '/reports',
    icon: BarChart3,
    roles: ['admin', 'principal', 'waka'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['admin', 'teacher', 'student', 'parent', 'principal', 'counselor', 'class_teacher', 'waka', 'tppk', 'trainer'],
  },
];
