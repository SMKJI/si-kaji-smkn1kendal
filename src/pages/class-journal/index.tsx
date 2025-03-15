
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { CalendarIcon, FileText, PlusCircle, Download, Filter, Check, Pencil } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Schema untuk form jurnal perwalian
const journalFormSchema = z.object({
  date: z.date({
    required_error: "Tanggal perwalian wajib diisi.",
  }),
  classId: z.string({
    required_error: "Kelas wajib dipilih.",
  }),
  activityType: z.string({
    required_error: "Jenis kegiatan wajib dipilih.",
  }),
  description: z.string().min(10, {
    message: "Deskripsi minimal 10 karakter.",
  }),
  followUp: z.string().min(5, {
    message: "Tindak lanjut minimal 5 karakter.",
  }),
  notes: z.string().optional(),
});

const ClassJournalPage = () => {
  const [journals, setJournals] = useState([
    {
      id: 1,
      date: new Date(2023, 8, 5),
      classId: 'XII RPL 1',
      activityType: 'Perwalian Rutin',
      description: 'Pembahasan persiapan ujian tengah semester dan progress project siswa.',
      followUp: 'Membuat jadwal bimbingan tambahan untuk siswa yang kesulitan',
      notes: 'Beberapa siswa masih kesulitan dengan mata pelajaran pemrograman',
      status: 'Sudah ditinjau'
    },
    {
      id: 2,
      date: new Date(2023, 8, 12),
      classId: 'XII RPL 1',
      activityType: 'Konseling Kelas',
      description: 'Diskusi mengenai masalah kehadiran beberapa siswa dan penurunan motivasi belajar.',
      followUp: 'Koordinasi dengan BK untuk sesi konseling individual',
      notes: '3 siswa perlu perhatian khusus',
      status: 'Sudah ditinjau'
    },
    {
      id: 3,
      date: new Date(2023, 8, 19),
      classId: 'XII RPL 1',
      activityType: 'Evaluasi Akademik',
      description: 'Review hasil ujian tengah semester dan identifikasi siswa yang perlu bimbingan tambahan.',
      followUp: 'Pembuatan kelompok belajar dan jadwal remedial',
      notes: '8 siswa memerlukan remedial untuk mata pelajaran matematika',
      status: 'Belum ditinjau'
    }
  ]);

  const form = useForm<z.infer<typeof journalFormSchema>>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      description: "",
      followUp: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof journalFormSchema>) {
    // Menambahkan jurnal baru
    const newJournal = {
      id: journals.length + 1,
      ...values,
      status: 'Belum ditinjau'
    };

    setJournals([...journals, newJournal]);
    
    toast.success("Jurnal perwalian berhasil disimpan!", {
      description: `Jurnal untuk kelas ${values.classId} pada tanggal ${format(values.date, "dd MMMM yyyy")} telah ditambahkan.`,
    });
    
    form.reset();
  }

  return (
    <DashboardLayout
      title="Jurnal Perwalian"
      description="Dokumentasi dan pencatatan kegiatan perwalian"
      userRole="class_teacher"
      userName="Ahmad Subarjo, S.Pd."
      showBackButton
      backTo="/dashboard"
    >
      <Tabs defaultValue="journals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="journals">Daftar Jurnal</TabsTrigger>
          <TabsTrigger value="add">Tambah Jurnal</TabsTrigger>
          <TabsTrigger value="reports">Laporan & Statistik</TabsTrigger>
        </TabsList>
        
        <TabsContent value="journals" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Filter Tanggal</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kelas</SelectItem>
                  <SelectItem value="XII RPL 1">XII RPL 1</SelectItem>
                  <SelectItem value="XII RPL 2">XII RPL 2</SelectItem>
                  <SelectItem value="XII RPL 3">XII RPL 3</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Jenis Kegiatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis Kegiatan</SelectItem>
                  <SelectItem value="Perwalian Rutin">Perwalian Rutin</SelectItem>
                  <SelectItem value="Konseling Kelas">Konseling Kelas</SelectItem>
                  <SelectItem value="Evaluasi Akademik">Evaluasi Akademik</SelectItem>
                  <SelectItem value="Diskusi Masalah">Diskusi Masalah</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Jurnal
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Jenis Kegiatan</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journals.map((journal) => (
                    <TableRow key={journal.id}>
                      <TableCell>{format(journal.date, "dd MMM yyyy")}</TableCell>
                      <TableCell>{journal.classId}</TableCell>
                      <TableCell>{journal.activityType}</TableCell>
                      <TableCell className="max-w-xs truncate">{journal.description}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          journal.status === 'Sudah ditinjau' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {journal.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detail Jurnal Perwalian</DialogTitle>
                              <DialogDescription>
                                Jurnal perwalian untuk kelas {journal.classId} pada {format(journal.date, "dd MMMM yyyy")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div>
                                <h3 className="text-sm font-medium">Jenis Kegiatan</h3>
                                <p>{journal.activityType}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium">Deskripsi Kegiatan</h3>
                                <p>{journal.description}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium">Tindak Lanjut</h3>
                                <p>{journal.followUp}</p>
                              </div>
                              {journal.notes && (
                                <div>
                                  <h3 className="text-sm font-medium">Catatan Tambahan</h3>
                                  <p>{journal.notes}</p>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button>Edit Jurnal</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Tambah Jurnal Perwalian Baru</CardTitle>
              <CardDescription>
                Dokumentasikan kegiatan perwalian kelas untuk pelaporan dan evaluasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tanggal Perwalian</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
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
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="classId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kelas</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kelas" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="XII RPL 1">XII RPL 1</SelectItem>
                              <SelectItem value="XII RPL 2">XII RPL 2</SelectItem>
                              <SelectItem value="XII RPL 3">XII RPL 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="activityType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kegiatan</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis kegiatan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Perwalian Rutin">Perwalian Rutin</SelectItem>
                            <SelectItem value="Konseling Kelas">Konseling Kelas</SelectItem>
                            <SelectItem value="Evaluasi Akademik">Evaluasi Akademik</SelectItem>
                            <SelectItem value="Diskusi Masalah">Diskusi Masalah</SelectItem>
                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Kegiatan</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Jelaskan kegiatan perwalian yang dilakukan"
                            className="min-h-[100px]"
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
                            placeholder="Jelaskan tindak lanjut atau rencana setelah kegiatan"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catatan Tambahan</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Catatan tambahan (opsional)"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Catatan ini hanya untuk keperluan internal dan tidak akan tampil di laporan resmi
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Simpan Jurnal
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Laporan & Statistik Perwalian</CardTitle>
              <CardDescription>
                Ringkasan aktivitas perwalian yang telah dilaksanakan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{journals.length}</div>
                    <p className="text-sm text-muted-foreground">Total Jurnal</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">
                      {journals.filter(j => j.status === 'Sudah ditinjau').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Sudah Ditinjau</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">
                      {journals.filter(j => j.status === 'Belum ditinjau').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Belum Ditinjau</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Distribusi Jenis Kegiatan</h3>
                <div className="h-64 border rounded-md flex items-center justify-center bg-muted/10">
                  <p className="text-muted-foreground">Graf statistik jenis kegiatan perwalian</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Cetak Laporan Bulanan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ClassJournalPage;
