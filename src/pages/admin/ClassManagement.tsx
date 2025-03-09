
import React from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  Download 
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ClassManagement = () => {
  const { toast } = useToast();
  
  // Mock class data
  const classes = [
    { id: 1, name: 'X TKJ 1', major: 'Teknik Komputer Jaringan', teacher: 'Budi Santoso', students: 32 },
    { id: 2, name: 'X TKJ 2', major: 'Teknik Komputer Jaringan', teacher: 'Siti Aminah', students: 30 },
    { id: 3, name: 'XI RPL 1', major: 'Rekayasa Perangkat Lunak', teacher: 'Agus Widodo', students: 28 },
    { id: 4, name: 'XI RPL 2', major: 'Rekayasa Perangkat Lunak', teacher: 'Dewi Susilowati', students: 29 },
    { id: 5, name: 'XII MM 1', major: 'Multimedia', teacher: 'Joko Purnomo', students: 25 },
  ];

  const handleAddClass = () => {
    toast({
      title: "Fitur dalam pengembangan",
      description: "Fungsi tambah kelas akan segera tersedia",
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Kelas",
      description: `Mengedit kelas dengan ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Hapus Kelas",
      description: `Menghapus kelas dengan ID: ${id}`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Ekspor Data",
      description: "Mengekspor data kelas ke Excel",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Manajemen Kelas</h1>
            <p className="text-muted-foreground">Kelola data kelas, jurusan, dan wali kelas</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAddClass} className="flex items-center gap-1">
              <Plus size={16} /> Tambah Kelas
            </Button>
            <Button variant="outline" onClick={handleExport} className="flex items-center gap-1">
              <Download size={16} /> Ekspor
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Daftar Kelas</CardTitle>
            <div className="mt-4 mb-2">
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <Input 
                  placeholder="Cari kelas..." 
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Nama Kelas</th>
                    <th className="py-3 px-4 text-left font-medium">Jurusan</th>
                    <th className="py-3 px-4 text-left font-medium">Wali Kelas</th>
                    <th className="py-3 px-4 text-left font-medium">Jumlah Siswa</th>
                    <th className="py-3 px-4 text-center font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls) => (
                    <tr key={cls.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4">{cls.name}</td>
                      <td className="py-3 px-4">{cls.major}</td>
                      <td className="py-3 px-4">{cls.teacher}</td>
                      <td className="py-3 px-4">{cls.students}</td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit(cls.id)}
                            className="h-8 w-8"
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(cls.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClassManagement;
