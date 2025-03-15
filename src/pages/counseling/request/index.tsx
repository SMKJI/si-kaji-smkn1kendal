
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from '@/components/ui/use-toast';

// Form schema for counseling request
const counselingRequestSchema = z.object({
  title: z.string().min(5, {
    message: "Judul harus minimal 5 karakter",
  }),
  category: z.string({
    required_error: "Pilih kategori konseling",
  }),
  date: z.date({
    required_error: "Pilih tanggal pertemuan",
  }),
  time: z.string({
    required_error: "Pilih waktu pertemuan",
  }),
  description: z.string().min(10, {
    message: "Deskripsi harus minimal 10 karakter",
  }),
  privacy: z.enum(["public", "private"], {
    required_error: "Pilih jenis privasi",
  }),
});

const CounselingRequestPage = () => {
  const navigate = useNavigate();
  const [timeSlots, setTimeSlots] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Permintaan Konseling - Si-Kaji';
    
    // Generate mock time slots from 08:00 to 15:00
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 8; hour <= 15; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
        if (hour < 15) {
          slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
      }
      return slots;
    };
    
    setTimeSlots(generateTimeSlots());
  }, []);
  
  const form = useForm<z.infer<typeof counselingRequestSchema>>({
    resolver: zodResolver(counselingRequestSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      privacy: "private",
    },
  });
  
  function onSubmit(values: z.infer<typeof counselingRequestSchema>) {
    console.log(values);
    
    // Show a success message
    toast({
      title: "Permintaan konseling berhasil dikirim",
      description: `Permintaan konseling dengan judul "${values.title}" telah dikirim. Guru BK akan segera menanggapi permintaan Anda.`,
    });
    
    // Navigate to the counseling list page
    setTimeout(() => {
      navigate('/counseling');
    }, 2000);
  }

  return (
    <DashboardLayout
      title="Permintaan Konseling"
      description="Ajukan permintaan konseling dengan Guru BK"
      userRole="student"
      userName="Alex Kurniawan"
      showBackButton
      backTo="/counseling"
    >
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Permintaan Konseling</CardTitle>
            <CardDescription>
              Lengkapi form berikut untuk mengajukan permintaan konseling dengan Guru BK.
              Semua informasi yang Anda berikan akan dijaga kerahasiaannya.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Perhatian</AlertTitle>
              <AlertDescription>
                Pertemuan konseling akan dijadwalkan berdasarkan ketersediaan Guru BK.
                Anda akan mendapatkan notifikasi setelah permintaan disetujui.
              </AlertDescription>
            </Alert>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Konseling</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan judul konseling" {...field} />
                      </FormControl>
                      <FormDescription>
                        Berikan judul singkat untuk pertemuan konseling Anda.
                      </FormDescription>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori konseling" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="academic">Akademik</SelectItem>
                          <SelectItem value="career">Karir dan Masa Depan</SelectItem>
                          <SelectItem value="personal">Masalah Pribadi</SelectItem>
                          <SelectItem value="family">Keluarga</SelectItem>
                          <SelectItem value="social">Sosial dan Pertemanan</SelectItem>
                          <SelectItem value="other">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Kategori konseling akan membantu Guru BK mempersiapkan materi.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: id })
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => 
                                date < new Date() || 
                                date.getDay() === 0 || 
                                date.getDay() === 6
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Pilih tanggal yang diinginkan (Senin-Jumat).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waktu</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih waktu" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Pilih waktu yang diinginkan (08:00 - 15:30).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Jelaskan alasan Anda membutuhkan konseling ini..." 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Berikan penjelasan singkat mengenai topik yang ingin dibahas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Privasi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis privasi" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="private">Pribadi (Hanya Guru BK)</SelectItem>
                          <SelectItem value="public">Terbuka (Termasuk Wali Kelas)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Tentukan siapa yang dapat melihat detail konseling ini.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => navigate('/counseling')}>
                    Batal
                  </Button>
                  <Button type="submit">Kirim Permintaan</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CounselingRequestPage;
