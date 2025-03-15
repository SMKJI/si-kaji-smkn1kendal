
import { LayoutDashboard, PlusCircle, Settings, Calendar } from 'lucide-react';
import { MenuItemType } from './types';

export const counselorMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['counselor'],
  },
  {
    title: 'Manajemen Konseling',
    path: '/counseling/manage',
    icon: HelpCircle,
    roles: ['counselor'],
  },
  {
    title: 'Buat Sesi Konseling',
    path: '/counseling/session',
    icon: PlusCircle,
    roles: ['counselor'],
  },
  {
    title: 'Perizinan',
    path: '/permission',
    icon: FileText,
    roles: ['counselor'],
  },
  {
    title: 'Kalender Akademik',
    path: '/calendar',
    icon: Calendar,
    roles: ['counselor'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['counselor'],
  },
];
