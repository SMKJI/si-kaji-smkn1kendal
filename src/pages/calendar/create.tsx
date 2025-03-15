
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar, Clock, Users, MapPin, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const createEventSchema = z.object({
  title: z.string().min(3, { message: "Judul harus minimal 3 karakter" }),
  date: z.date({ required_error: "Pilih tanggal kegiatan" }),
  startTime: z.string().min(1, { message: "Waktu mulai harus diisi" }),
  endTime: z.string().min(1, { message: "Waktu selesai harus diisi" }),
  location: z.string().min(3, { message: "Lokasi harus minimal 3 karakter" }),
  category: z.string().min(1, { message: "Kategori harus dipilih" }),
  participants: z.string().min(3, { message: "Peserta harus minimal 3 karakter" }),
  description: z.string().min(10, { message: "Deskripsi harus minimal 10 karakter" }),
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

const EventCreatePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tambah Kegiatan - Si-Kaji';
  }, []);

  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      startTime: "07:30",
      endTime: "09:30",
      location: "",
      category: "",
      participants: "",
      description: "",
    },
  });

  function onSubmit(values: CreateEventFormValues) {
    // Here we would typically save to API
    console.log(values);
    
    toast({
      title: "Kegiatan berhasil ditambahkan",
      description: `${values.title} pada tanggal ${format(values.date, 'dd MMMM yyyy', { locale: id })}`,
    });
    
    // Redirect back to calendar page
    setTimeout(() => {
      navigate('/calendar');
    }, 1500);
  }

  return (
    <DashboardLayout
      title="Tambah Kegiatan"
      description="Tambahkan kegiatan baru ke kalender akademik"
      userRole="admin"
      userName="Administrator"
      showBackButton
      backTo="/calendar"
    >
      <Card>
        <CardHeader>
          <CardTitle>Formulir Kegiatan Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Kegiatan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan judul kegiatan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori kegiatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Akademik">Akademik</SelectItem>
                          <SelectItem value="Rapat">Rapat</SelectItem>
                          <SelectItem value="Peringatan">Peringatan</SelectItem>
                          <SelectItem value="Lomba">Lomba</SelectItem>
                          <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <div className="border rounded-md p-2">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            locale={id}
                            className="rounded-md border"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waktu Mulai</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waktu Selesai</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lokasi</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan lokasi kegiatan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peserta</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Semua Siswa, Guru Matematika" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Kegiatan</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Masukkan deskripsi dan detail kegiatan"
                        className="min-h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/calendar')}
                >
                  Batal
                </Button>
                <Button type="submit">Simpan Kegiatan</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default EventCreatePage;
