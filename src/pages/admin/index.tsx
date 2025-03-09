
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

const AdminPage = () => {
  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  );
};

export default AdminPage;
