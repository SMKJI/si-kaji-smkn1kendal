
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell, Pencil, Trash, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Announcement, CreateAnnouncementRequest } from '@/lib/types/announcement';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '@/services/announcementService';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Judul pengumuman minimal 5 karakter' }).max(100, { message: 'Judul pengumuman maksimal 100 karakter' }),
  content: z.string().min(10, { message: 'Konten pengumuman minimal 10 karakter' }).max(500, { message: 'Konten pengumuman maksimal 500 karakter' }),
  important: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const AnnouncementCard = ({ 
  announcement, 
  onEdit, 
  onDelete 
}: { 
  announcement: Announcement; 
  onEdit: (announcement: Announcement) => void; 
  onDelete: (id: number) => void;
}) => {
  return (
    <Card className={`${announcement.important ? 'border-red-400' : 'border-blue-200'} animate-fade-in-up`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Bell className={`h-5 w-5 mr-2 ${announcement.important ? 'text-red-600' : 'text-blue-600'}`} />
            <CardTitle className="text-lg">{announcement.title}</CardTitle>
          </div>
          {announcement.important && (
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Penting</span>
          )}
        </div>
        <CardDescription className="text-xs">
          Diposting pada: {new Date(announcement.date).toLocaleDateString('id-ID', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{announcement.content}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-0">
        <Button variant="outline" size="sm" onClick={() => onEdit(announcement)}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(announcement.id)}>
          <Trash className="h-4 w-4 mr-2" />
          Hapus
        </Button>
      </CardFooter>
    </Card>
  );
};

const AnnouncementManagePage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<number | null>(null);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      important: false,
    },
  });
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    loadAnnouncements();
  }, []);
  
  const loadAnnouncements = () => {
    const data = getAnnouncements();
    setAnnouncements(data);
  };
  
  const handleCreateAnnouncement = () => {
    setEditingAnnouncement(null);
    form.reset({
      title: '',
      content: '',
      important: false,
    });
    setIsDialogOpen(true);
  };
  
  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    form.reset({
      title: announcement.title,
      content: announcement.content,
      important: announcement.important,
    });
    setIsDialogOpen(true);
  };
  
  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncementToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (announcementToDelete !== null) {
      const result = deleteAnnouncement(announcementToDelete);
      if (result) {
        toast({
          title: "Pengumuman berhasil dihapus",
          variant: "default",
        });
        loadAnnouncements();
      } else {
        toast({
          title: "Gagal menghapus pengumuman",
          variant: "destructive",
        });
      }
      setIsDeleteDialogOpen(false);
      setAnnouncementToDelete(null);
    }
  };
  
  const onSubmit = (values: FormValues) => {
    if (editingAnnouncement) {
      // Update existing announcement
      const result = updateAnnouncement(editingAnnouncement.id, values);
      if (result) {
        toast({
          title: "Pengumuman berhasil diperbarui",
          variant: "default",
        });
        loadAnnouncements();
      } else {
        toast({
          title: "Gagal memperbarui pengumuman",
          variant: "destructive",
        });
      }
    } else {
      // Create new announcement with proper type
      const announcementData: CreateAnnouncementRequest = {
        title: values.title,
        content: values.content,
        important: values.important
      };
      
      const result = createAnnouncement(announcementData);
      if (result) {
        toast({
          title: "Pengumuman berhasil dibuat",
          variant: "default",
        });
        loadAnnouncements();
      } else {
        toast({
          title: "Gagal membuat pengumuman",
          variant: "destructive",
        });
      }
    }
    setIsDialogOpen(false);
  };
  
  return (
    <DashboardLayout
      title="Manajemen Pengumuman"
      description="Kelola pengumuman yang akan ditampilkan di halaman utama Si-Kaji"
      userRole="admin"
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Daftar Pengumuman</h2>
        <Button onClick={handleCreateAnnouncement}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pengumuman
        </Button>
      </div>
      
      {announcements.length === 0 ? (
        <Card className="p-8 text-center bg-muted/50">
          <CardContent>
            <p className="text-muted-foreground py-8">Belum ada pengumuman yang dibuat.</p>
            <Button onClick={handleCreateAnnouncement}>
              <Plus className="mr-2 h-4 w-4" />
              Buat Pengumuman Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onEdit={handleEditAnnouncement}
              onDelete={handleDeleteAnnouncement}
            />
          ))}
        </div>
      )}
      
      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAnnouncement ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru'}</DialogTitle>
            <DialogDescription>
              {editingAnnouncement 
                ? 'Ubah informasi pengumuman yang sudah ada.' 
                : 'Buat pengumuman baru yang akan ditampilkan di halaman utama.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Pengumuman</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul pengumuman" {...field} />
                    </FormControl>
                    <FormDescription>
                      Judul sebaiknya singkat dan jelas tentang isi pengumuman.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Isi Pengumuman</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tulis isi pengumuman di sini..." 
                        rows={5}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Tulis isi pengumuman secara detail namun tetap ringkas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="important"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Pengumuman Penting</FormLabel>
                      <FormDescription>
                        Centang jika pengumuman ini penting dan harus mendapat perhatian khusus.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">{editingAnnouncement ? 'Perbarui' : 'Tambahkan'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pengumuman ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={confirmDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AnnouncementManagePage;
