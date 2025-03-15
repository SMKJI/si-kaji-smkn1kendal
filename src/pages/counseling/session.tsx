
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Clock, FileLock2, FileText, Lock, Save, User } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const sessionFormSchema = z.object({
  date: z.string().min(1, { message: "Tanggal wajib diisi" }),
  startTime: z.string().min(1, { message: "Waktu mulai wajib diisi" }),
  endTime: z.string().min(1, { message: "Waktu selesai wajib diisi" }),
  location: z.string().min(3, { message: "Lokasi wajib diisi" }),
  category: z.string().min(1, { message: "Kategori wajib diisi" }),
  summary: z.string().min(10, { message: "Ringkasan wajib diisi minimal 10 karakter" }),
  followUp: z.string().optional(),
  isConfidential: z.boolean().default(false),
});

type SessionFormValues = z.infer<typeof sessionFormSchema>;

const CounselingSessionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock student data
  const student = {
    id: "S001",
    name: "Andi Saputra",
    class: "XII RPL 1",
    nisn: "0012345678",
    counselingCount: 3,
    lastCounseling: "2023-10-15",
    photo: "https://i.pravatar.cc/150?img=3"
  };
  
  // Mock session history
  const sessionHistory = [
    {
      id: "CS001",
      date: "2023-10-15",
      category: "Akademik",
      counselor: "Ibu Sri Handayani, S.Pd.",
      isConfidential: false
    },
    {
      id: "CS002",
      date: "2023-09-22",
      category: "Karir",
      counselor: "Bapak Dimas Pratama, M.Pd.",
      isConfidential: false
    },
    {
      id: "CS003",
      date: "2023-08-10",
      category: "Pribadi",
      counselor: "Ibu Sri Handayani, S.Pd.",
      isConfidential: true
    }
  ];

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: format(new Date(), 'HH:mm'),
      endTime: format(new Date(Date.now() + 60 * 60 * 1000), 'HH:mm'),
      location: "Ruang BK",
      category: "",
      summary: "",
      followUp: "",
      isConfidential: false,
    },
  });

  function onSubmit(values: SessionFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      
      toast({
        title: "Sesi konseling berhasil disimpan",
        description: `Rekaman sesi konseling dengan ${student.name} pada ${values.date} telah disimpan.`,
      });
      
      setIsSubmitting(false);
      
      // Redirect back to counseling management page
      setTimeout(() => {
        navigate('/counseling/manage');
      }, 1500);
    }, 1000);
  }

  return (
    <DashboardLayout
      title="Sesi Konseling"
      description="Pencatatan sesi konseling dan bimbingan siswa"
      userRole="counselor"
      userName="Guru BK"
      showBackButton
      backTo="/counseling/manage"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Profil Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                <img 
                  src={student.photo} 
                  alt={student.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.class}</p>
              <p className="text-sm text-muted-foreground">NISN: {student.nisn}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Riwayat Konseling</h4>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary rounded-md px-3 py-1 text-lg font-semibold">
                    {student.counselingCount}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Sesi konseling sebelumnya
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Konseling Terakhir</h4>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(student.lastCounseling), 'dd MMMM yyyy')}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => navigate(`/student/${student.id}`)}
              >
                <User className="mr-2 h-4 w-4" />
                Lihat Profil Lengkap
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Detail Sesi Konseling</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="form">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="form">Formulir Sesi</TabsTrigger>
                <TabsTrigger value="history">Riwayat Konseling</TabsTrigger>
              </TabsList>
              
              <TabsContent value="form">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal Konseling</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
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
                              <Input placeholder="Ruang BK, Kelas, dll." {...field} />
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
                            <FormLabel>Kategori Konseling</FormLabel>
                            <FormControl>
                              <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                {...field}
                              >
                                <option value="" disabled>Pilih kategori</option>
                                <option value="akademik">Akademik</option>
                                <option value="pribadi">Pribadi</option>
                                <option value="sosial">Sosial</option>
                                <option value="karir">Karir</option>
                                <option value="kesehatan">Kesehatan</option>
                                <option value="keluarga">Keluarga</option>
                                <option value="lainnya">Lainnya</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ringkasan Sesi</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tuliskan ringkasan permasalahan, diskusi, dan hasil sesi konseling..."
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="followUp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tindak Lanjut</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Rencana tindak lanjut setelah sesi konseling ini..."
                              className="min-h-24"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Tulis rencana sesi lanjutan, rujukan ke pihak lain, atau kegiatan pendampingan
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isConfidential"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2 space-y-0 border rounded-md p-4 bg-amber-50">
                          <FormControl>
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-amber-500 text-amber-600 focus:ring-amber-500"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          </FormControl>
                          <div className="space-y-0.5">
                            <FormLabel className="text-amber-800 cursor-pointer flex items-center">
                              <Lock className="h-4 w-4 mr-2" />
                              <span>Arsip Rahasia</span>
                            </FormLabel>
                            <FormDescription className="text-amber-700">
                              Catatan sesi ini hanya dapat diakses oleh guru BK dan tidak dapat dilihat oleh wali kelas, guru lain, atau orang tua
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => navigate('/counseling/manage')}
                      >
                        Batal
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-1">
                            <Save className="h-4 w-4 animate-spin" />
                            Menyimpan...
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Save className="h-4 w-4" />
                            Simpan Rekaman Sesi
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="history">
                <div className="space-y-4">
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>ID Sesi</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Konselor</TableHead>
                          <TableHead className="w-[100px]">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sessionHistory.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell>{format(new Date(session.date), 'dd/MM/yyyy')}</TableCell>
                            <TableCell>{session.id}</TableCell>
                            <TableCell>{session.category}</TableCell>
                            <TableCell>{session.counselor}</TableCell>
                            <TableCell>
                              {session.isConfidential ? (
                                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                  <FileLock2 className="mr-1 h-3 w-3" />
                                  Rahasia
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  <FileText className="mr-1 h-3 w-3" />
                                  Reguler
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md border text-sm text-muted-foreground">
                    <p>
                      Sesi dengan status "Rahasia" hanya dapat diakses oleh guru BK dan tidak dapat dilihat oleh pihak lain termasuk wali kelas, guru lain, atau orang tua.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CounselingSessionPage;
