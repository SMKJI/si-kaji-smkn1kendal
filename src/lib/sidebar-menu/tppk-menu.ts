
import { LayoutDashboard, MessageSquare, Shield, FileEdit, Settings } from 'lucide-react';
import { MenuItemType } from './types';

export const tppkMenu: MenuItemType[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['tppk'],
  },
  {
    title: 'Pengaduan',
    path: '/complaint',
    icon: MessageSquare,
    roles: ['tppk'],
  },
  {
    title: 'Pengaduan Orang Tua',
    path: '/parent-complaint',
    icon: MessageSquare,
    roles: ['tppk'],
  },
  {
    title: 'Pencatatan Pelanggaran',
    path: '/discipline',
    icon: Shield,
    roles: ['tppk'],
  },
  {
    title: 'Catat Pelanggaran/Prestasi',
    path: '/discipline/manage',
    icon: FileEdit,
    roles: ['tppk'],
  },
  {
    title: 'Pengaturan',
    path: '/settings',
    icon: Settings,
    roles: ['tppk'],
  },
];
