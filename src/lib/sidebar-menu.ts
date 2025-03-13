
import { 
  LayoutDashboard, Users, BookOpen, CalendarCheck, 
  FileText, MessageSquare, GraduationCap, Award, 
  UserCheck, ClipboardList, Bell, Settings 
} from 'lucide-react';

export type MenuItemType = {
  title: string;
  path: string;
  icon: any;
  roles: Array<'admin' | 'teacher' | 'student' | 'parent'>;
};

export const mainMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    title: 'Manajemen Siswa',
    path: '/student',
    icon: Users,
    roles: ['admin', 'teacher'],
  },
  {
    title: 'Manajemen Guru',
    path: '/teacher',
    icon: GraduationCap,
    roles: ['admin'],
  },
  {
    title: 'Manajemen Kelas',
    path: '/class',
    icon: BookOpen,
    roles: ['admin', 'teacher'],
  },
  {
    title: 'Kehadiran',
    path: '/attendance',
    icon: CalendarCheck,
    roles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    title: 'Kegiatan Siswa',
    path: '/student-activities',
    icon: ClipboardList,
    roles: ['admin', 'teacher', 'student'],
  },
  {
    title: 'Pengaduan',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['admin', 'student'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['parent', 'admin'],
  },
  {
    title: 'Portal Orang Tua',
    path: '/parent-portal',
    icon: UserCheck,
    roles: ['parent'],
  },
  {
    title: 'Konseling',
    path: '/counseling',
    icon: MessageSquare,
    roles: ['student', 'teacher'],
  },
  {
    title: 'Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['student', 'admin', 'teacher'],
  },
  {
    title: 'Data Siswa',
    path: '/student-data',
    icon: Users,
    roles: ['student'],
  },
  {
    title: 'Kalender Akademik',
    path: '/calendar',
    icon: CalendarCheck,
    roles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    title: 'Pengumuman',
    path: '/announcement',
    icon: Bell,
    roles: ['admin', 'teacher', 'student', 'parent'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['admin', 'teacher', 'student', 'parent'],
  },
];
