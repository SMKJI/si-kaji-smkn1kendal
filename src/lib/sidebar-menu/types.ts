
import { USER_ROLES } from '../constants';

export type MenuItemType = {
  title: string;
  path: string;
  icon: any;
  roles: Array<
    'admin' | 
    'teacher' | 
    'student' | 
    'parent' | 
    'principal' | 
    'counselor' | 
    'class_teacher' | 
    'waka' | 
    'tppk' | 
    'trainer'
  >;
};
