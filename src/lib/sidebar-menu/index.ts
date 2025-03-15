
import { MenuItemType } from './types';
import { adminMenu } from './admin-menu';
import { teacherMenu } from './teacher-menu';
import { studentMenu } from './student-menu';
import { parentMenu } from './parent-menu';
import { principalMenu } from './principal-menu';
import { counselorMenu } from './counselor-menu';
import { classTeacherMenu } from './class-teacher-menu';
import { wakaMenu } from './waka-menu';
import { tppkMenu } from './tppk-menu';
import { trainerMenu } from './trainer-menu';
import { HelpCircle, ClipboardList, Trophy, FileCheck, FileEdit, UserCheck } from 'lucide-react';

// Combine all menu items
const allMenuItems: MenuItemType[] = [
  ...adminMenu,
  ...teacherMenu,
  ...studentMenu,
  ...parentMenu,
  ...principalMenu,
  ...counselorMenu,
  ...classTeacherMenu,
  ...wakaMenu,
  ...tppkMenu,
  ...trainerMenu
];

// Filter unique items based on title and path
const uniqueItems = Array.from(
  new Map(allMenuItems.map(item => [`${item.title}-${item.path}`, item])).values()
);

// Maintain the existing mainMenu export for backward compatibility
export const mainMenu: MenuItemType[] = uniqueItems;

// Re-export the types
export type { MenuItemType };

// Export each role's menu separately
export {
  adminMenu,
  teacherMenu,
  studentMenu,
  parentMenu,
  principalMenu,
  counselorMenu,
  classTeacherMenu,
  wakaMenu,
  tppkMenu,
  trainerMenu
};
