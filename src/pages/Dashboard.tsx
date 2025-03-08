
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import KepalaSekolahDashboard from '@/components/dashboard/KepalaSekolahDashboard';
import WakaKesiswaanDashboard from '@/components/dashboard/WakaKesiswaanDashboard';
import { useToast } from '@/hooks/use-toast';

// This would typically come from an authentication context
// For now we'll simulate it
const useAuth = () => {
  // For demo purposes only - in a real app, this would come from your auth system
  const [user, setUser] = useState({ 
    name: 'Admin User', 
    role: 'admin',
    isAuthenticated: true 
  });

  const changeRole = (newRole: string) => {
    setUser(prev => ({ ...prev, role: newRole }));
  };

  return { user, changeRole };
};

const Dashboard = () => {
  const { user, changeRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated - in a real app, this would redirect to login
    if (!user.isAuthenticated) {
      toast({
        title: 'Silakan masuk terlebih dahulu',
        description: 'Anda harus login untuk mengakses dashboard',
        variant: 'destructive',
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);

  const renderDashboardContent = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'kepala_sekolah':
        return <KepalaSekolahDashboard />;
      case 'waka_kesiswaan':
        return <WakaKesiswaanDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  // For demo purposes - a role selector
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeRole(e.target.value);
    toast({
      title: 'Peran berubah',
      description: `Beralih ke dashboard ${e.target.value}`,
    });
  };

  return (
    <DashboardLayout>
      {/* Role Selector (for demo only) */}
      <div className="mb-6 p-4 bg-secondary/20 rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">Demo: Pilih Peran</p>
        <select 
          value={user.role} 
          onChange={handleRoleChange}
          className="p-2 border rounded text-sm"
        >
          <option value="admin">Admin</option>
          <option value="kepala_sekolah">Kepala Sekolah</option>
          <option value="waka_kesiswaan">Waka Kesiswaan</option>
        </select>
      </div>
      
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
