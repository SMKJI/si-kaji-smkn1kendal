
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const DashboardPage = () => {
  console.log("DashboardPage rendering");
  
  useEffect(() => {
    console.log("DashboardPage component mounted");
    window.scrollTo(0, 0);
    document.title = 'Dashboard - Si-Kaji';
  }, []);

  // In a real app, this would come from auth context/state
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'student' | 'parent' | 'principal' | 'counselor' | 'trainer' | 'waka' | 'tppk' | 'class_teacher'>('admin');

  // For demo purposes only - toggle between roles
  const toggleRole = () => {
    const roles: ('admin' | 'teacher' | 'student' | 'parent' | 'principal' | 'counselor' | 'trainer' | 'waka' | 'tppk' | 'class_teacher')[] = [
      'admin', 'teacher', 'student', 'parent', 'principal', 'counselor', 'trainer', 'waka', 'tppk', 'class_teacher'
    ];
    const currentIndex = roles.indexOf(userRole);
    const nextIndex = (currentIndex + 1) % roles.length;
    setUserRole(roles[nextIndex]);
  };

  return (
    <DashboardLayout
      title="Dashboard"
      description="Selamat datang di Si-Kaji SMKN 1 Kendal"
      userRole={userRole}
      userName={`User ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}
    >
      {/* Demo only - would be removed in production */}
      <Button onClick={toggleRole} className="mb-6">
        Ganti Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </Button>
      
      <DashboardTabs userRole={userRole} onRoleChange={setUserRole} />
    </DashboardLayout>
  );
};

export default DashboardPage;
