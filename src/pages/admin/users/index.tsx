
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const UsersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data
  const users = [
    { id: 1, name: 'Admin Utama', email: 'admin@smkn1kendal.sch.id', role: 'admin', status: 'active' },
    { id: 2, name: 'Kepala Sekolah', email: 'kepsek@smkn1kendal.sch.id', role: 'kepala_sekolah', status: 'active' },
    { id: 3, name: 'Wakil Kesiswaan', email: 'kesiswaan@smkn1kendal.sch.id', role: 'waka_kesiswaan', status: 'active' },
    { id: 4, name: 'Guru BK 1', email: 'bk1@smkn1kendal.sch.id', role: 'guru_bk', status: 'inactive' },
    { id: 5, name: 'Guru BK 2', email: 'bk2@smkn1kendal.sch.id', role: 'guru_bk', status: 'active' },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (id: number) => {
    toast({
      title: "Pengguna dihapus",
      description: `ID pengguna ${id} telah berhasil dihapus`,
    });
  };

  const handleEditUser = (id: number) => {
    toast({
      title: "Edit pengguna",
      description: `Form edit untuk pengguna ID ${id} akan ditampilkan`,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'kepala_sekolah': return 'bg-blue-100 text-blue-800';
      case 'waka_kesiswaan': return 'bg-green-100 text-green-800';
      case 'guru_bk': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link to="/admin" className="text-muted-foreground hover:text-primary inline-flex items-center mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Kembali ke Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
            <p className="text-muted-foreground mt-1">Kelola akun, role, dan hak akses pengguna sistem</p>
          </div>
          <Button className="sm:self-start">
            <Plus className="h-4 w-4 mr-2" /> Tambah Pengguna
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari pengguna..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">ID</th>
                      <th className="px-4 py-3 text-left font-medium">Nama</th>
                      <th className="px-4 py-3 text-left font-medium">Email</th>
                      <th className="px-4 py-3 text-left font-medium">Role</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-center font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3">{user.id}</td>
                        <td className="px-4 py-3 font-medium">{user.name}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-blue-500"
                              onClick={() => handleEditUser(user.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-muted-foreground hover:text-red-500"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUsers.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  Tidak ada pengguna yang ditemukan
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
