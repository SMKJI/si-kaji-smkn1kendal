
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const AdminDashboardPage = () => {
  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
