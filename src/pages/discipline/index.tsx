
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Search, Plus, Filter, Eye, ArrowUp, ArrowDown, AlertTriangle, Award, Download, ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DISCIPLINE_POINTS } from '@/lib/constants';

// Schema untuk form pencatatan kedisiplinan
const disciplineFormSchema = z.object({
  studentName: z.string().min(1, {
    message: "Nama siswa wajib diisi.",
  }),
  studentClass: z.string({
    required_error: "Kelas siswa wajib dipilih.",
  }),
  recordType: z.string({
    required_error: "Jenis catatan wajib dipilih.",
  }),
  category: z.string({
    required_error: "Kategori wajib dipilih.",
  }),
  description: z.string().min(5, {
    message: "Deskripsi minimal 5 karakter.",
  }),
  date: z.string().min(1, {
    message: "Tanggal kejadian wajib diisi.",
  }),
  location: z.string().min(1, {
    message: "Lokasi kejadian wajib diisi.",
  }),
  witnessName: z.string().optional(),
  notes: z.string().optional(),
});

const DisciplinePage = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      studentName: 'Andi Saputra',
      studentClass: 'XII RPL 1',
      date: '2023-09-10',
      recordType: 'violation',
      category: 'Terlambat',
      description: 'Terlambat masuk kelas 15 menit tanpa keterangan',
      points: -5,
      status: 'Diproses',
      location: 'Ruang kelas',
      witnessName: 'Budi Santoso, S.Pd.',
      notes: 'Sudah 3 kali terlambat dalam bulan ini',
    },
    {
      id: 2,
      studentName: 'Budi Santoso',
      studentClass: 'XII RPL 1',
      date: '2023-09-12',
      recordType: 'achievement',
      category: 'Kedisiplinan',
      description: 'Menjadi petugas upacara dengan sangat baik',
      points: 15,
      status: 'Disetujui',
      location: 'Lapangan upacara',
      witnessName: 'Ani Suryani, S.Pd.',
      notes: '',
    },
    {
      id: 3,
      studentName: 'Cindy Permata',
      studentClass: 'XII RPL 2',
      date: '2023-09-15',
      recordType: 'violation',
      category: 'Seragam',
      description: 'Tidak mengenakan atribut seragam lengkap',
      points: -5,
      status: 'Diproses',
      location: 'Gerbang sekolah',
      witnessName: 'Dedi Kurniawan, M.Pd.',
      notes: 'Tidak membawa topi saat upacara',
    },
    {
      id: 4,
      studentName: 'Deni Wijaya',
      studentClass: 'XII RPL 2',
      date: '2023-09-18',
      recordType: 'violation',
      category: 'Perilaku',
      description: 'Bermain game saat jam pelajaran',
      points: -10,
      status: 'Disetujui',
      location: 'Lab komputer',
      witnessName: 'Siti Rahayu, S.Pd.',
      notes: 'Sudah diperingatkan beberapa kali',
    },
    {
      id: 5,
      studentName: 'Eka Putri',
      studentClass: 'XII RPL 3',
      date: '2023-09-20',
      recordType: 'achievement',
      category: 'Tanggung Jawab',
      description: 'Membantu membersihkan kelas secara sukarela',
      points: 15,
      status: 'Disetujui',
      location: 'Ruang kelas',
      witnessName: 'Tono Wijaya, S.T.',
      notes: '',
    },
  ]);

  const form = useForm<z.infer<typeof disciplineFormSchema>>({
    resolver: zodResolver(disciplineFormSchema),
    defaultValues: {
      description: "",
      witnessName: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof disciplineFormSchema>) {
    // Menghitung poin berdasarkan jenis catatan
    let points = 0;
    if (values.recordType === 'violation') {
      if (values.category === 'Terlambat' || values.category === 'Seragam') {
        points = DISCIPLINE_POINTS.MINOR_VIOLATION; // -5
      } else if (values.category === 'Perilaku') {
        points = DISCIPLINE_POINTS.MEDIUM_VIOLATION; // -10
      } else if (values.category === 'Serius') {
        points = DISCIPLINE_POINTS.MAJOR_VIOLATION; // -20
      }
    } else if (values.recordType === 'achievement') {
      points = DISCIPLINE_POINTS.ACHIEVEMENT; // 15
    }

    // Menambahkan catatan baru
    const newRecord = {
      id: records.length + 1,
      ...values,
      points: points,
      status: 'Diproses'
    };

    setRecords([...records, newRecord]);
    
    toast.success("Catatan kedisiplinan berhasil disimpan!", {
      description: `${values.recordType === 'violation' ? 'Pelanggaran' : 'Prestasi'} untuk ${values.studentName} telah dicatat.`,
    });
    
    form.reset();
  }

  const totalStudentPoints = (studentName: string) => {
    return records
      .filter(record => record.studentName === studentName)
      .reduce((total, record) => total + record.points, 0);
  };

  return (
    <DashboardLayout
      title="Pencatatan Kedisiplinan"
      description="Manajemen pelanggaran dan prestasi siswa"
      userRole="class_teacher"
      userName="Ahmad Subarjo, S.Pd."
      showBackButton
      backTo="/dashboard"
    >
      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Daftar Catatan</TabsTrigger>
          <TabsTrigger value="add">Tambah Catatan</TabsTrigger>
          <TabsTrigger value="statistics">Statistik</TabsTrigger>
        </TabsList>
        
        <TabsContent value="records" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan nama siswa..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
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
                  <SelectValue placeholder="Jenis Catatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="violation">Pelanggaran</SelectItem>
                  <SelectItem value="achievement">Prestasi</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    Tambah
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Tambah Catatan Kedisiplinan Baru</DialogTitle>
                    <DialogDescription>
                      Tambahkan catatan pelanggaran atau prestasi untuk siswa
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="studentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama Siswa</FormLabel>
                              <FormControl>
                                <Input placeholder="Nama lengkap siswa" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="studentClass"
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
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="recordType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Jenis Catatan</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Pilih jenis" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="violation">Pelanggaran</SelectItem>
                                  <SelectItem value="achievement">Prestasi</SelectItem>
                                </SelectContent>
                              </Select>
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
                                    <SelectValue placeholder="Pilih kategori" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Terlambat">Terlambat (-5 poin)</SelectItem>
                                  <SelectItem value="Seragam">Seragam (-5 poin)</SelectItem>
                                  <SelectItem value="Perilaku">Perilaku (-10 poin)</SelectItem>
                                  <SelectItem value="Serius">Pelanggaran Serius (-20 poin)</SelectItem>
                                  <SelectItem value="Kedisiplinan">Kedisiplinan (+15 poin)</SelectItem>
                                  <SelectItem value="Tanggung Jawab">Tanggung Jawab (+15 poin)</SelectItem>
                                  <SelectItem value="Prestasi">Prestasi Khusus (+15 poin)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tanggal Kejadian</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lokasi</FormLabel>
                              <FormControl>
                                <Input placeholder="Tempat kejadian" {...field} />
                              </FormControl>
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
                                placeholder="Jelaskan detail kejadian"
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
                        name="witnessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Saksi (Opsional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Nama lengkap saksi" {...field} />
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
                            <FormLabel>Catatan Tambahan (Opsional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Catatan tambahan jika ada"
                                className="min-h-[60px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="submit" className="w-full sm:w-auto">Simpan Catatan</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Poin</TableHead>
                    <TableHead>Total Poin</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>{record.studentClass}</TableCell>
                      <TableCell>
                        <Badge variant={record.recordType === 'violation' ? 'destructive' : 'default'}>
                          {record.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={record.points > 0 ? 'text-green-600' : 'text-red-600'}>
                          {record.points > 0 ? `+${record.points}` : record.points}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={totalStudentPoints(record.studentName) >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {totalStudentPoints(record.studentName)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'Disetujui' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Lihat detail</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {record.recordType === 'violation' ? 'Pelanggaran' : 'Prestasi'}: {record.category}
                              </DialogTitle>
                              <DialogDescription>
                                {record.studentName} - {record.studentClass}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div>
                                <h3 className="text-sm font-medium">Deskripsi</h3>
                                <p>{record.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="text-sm font-medium">Tanggal</h3>
                                  <p>{record.date}</p>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium">Lokasi</h3>
                                  <p>{record.location}</p>
                                </div>
                              </div>
                              {record.witnessName && (
                                <div>
                                  <h3 className="text-sm font-medium">Saksi</h3>
                                  <p>{record.witnessName}</p>
                                </div>
                              )}
                              {record.notes && (
                                <div>
                                  <h3 className="text-sm font-medium">Catatan Tambahan</h3>
                                  <p>{record.notes}</p>
                                </div>
                              )}
                              <div>
                                <h3 className="text-sm font-medium">Poin</h3>
                                <p className={record.points > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                  {record.points > 0 ? `+${record.points}` : record.points} poin
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cetak</Button>
                              <Button>Ubah Status</Button>
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
              <CardTitle>Tambah Catatan Kedisiplinan</CardTitle>
              <CardDescription>
                Catat pelanggaran atau prestasi siswa untuk sistem poin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="studentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Siswa</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama lengkap siswa" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="studentClass"
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="recordType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jenis Catatan</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="violation">Pelanggaran</SelectItem>
                              <SelectItem value="achievement">Prestasi</SelectItem>
                            </SelectContent>
                          </Select>
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
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Terlambat">Terlambat (-5 poin)</SelectItem>
                              <SelectItem value="Seragam">Seragam (-5 poin)</SelectItem>
                              <SelectItem value="Perilaku">Perilaku (-10 poin)</SelectItem>
                              <SelectItem value="Serius">Pelanggaran Serius (-20 poin)</SelectItem>
                              <SelectItem value="Kedisiplinan">Kedisiplinan (+15 poin)</SelectItem>
                              <SelectItem value="Tanggung Jawab">Tanggung Jawab (+15 poin)</SelectItem>
                              <SelectItem value="Prestasi">Prestasi Khusus (+15 poin)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Kejadian</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lokasi</FormLabel>
                          <FormControl>
                            <Input placeholder="Tempat kejadian" {...field} />
                          </FormControl>
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
                            placeholder="Jelaskan detail kejadian"
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
                    name="witnessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Saksi (Opsional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama lengkap saksi" {...field} />
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
                        <FormLabel>Catatan Tambahan (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Catatan tambahan jika ada"
                            className="min-h-[60px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">Simpan Catatan</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Kedisiplinan</CardTitle>
              <CardDescription>
                Analisis data pelanggaran dan prestasi siswa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="mb-2">
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="text-3xl font-bold">
                      {records.filter(r => r.recordType === 'violation').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Pelanggaran</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="mb-2">
                      <Award className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold">
                      {records.filter(r => r.recordType === 'achievement').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Prestasi</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="mb-2">
                      <ArrowDown className="h-8 w-8 text-red-500" />
                    </div>
                    <div className="text-3xl font-bold">
                      {records.reduce((total, record) => record.points < 0 ? total + Math.abs(record.points) : total, 0)}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Poin Pelanggaran</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Siswa dengan Poin Tertinggi</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left font-medium">Nama Siswa</th>
                        <th className="py-2 text-left font-medium">Kelas</th>
                        <th className="py-2 text-left font-medium">Total Poin</th>
                        <th className="py-2 text-right font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(new Set(records.map(r => r.studentName)))
                        .map(studentName => ({
                          name: studentName,
                          class: records.find(r => r.studentName === studentName)?.studentClass || '',
                          totalPoints: totalStudentPoints(studentName)
                        }))
                        .sort((a, b) => b.totalPoints - a.totalPoints)
                        .slice(0, 5)
                        .map((student, idx) => (
                          <tr key={idx} className="border-b hover:bg-muted/50">
                            <td className="py-2">{student.name}</td>
                            <td className="py-2">{student.class}</td>
                            <td className="py-2">
                              <span className={student.totalPoints >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {student.totalPoints}
                              </span>
                            </td>
                            <td className="py-2 text-right">
                              <Button variant="link" size="sm" className="h-auto p-0">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Lihat Profil
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Siswa dengan Poin Terendah</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left font-medium">Nama Siswa</th>
                        <th className="py-2 text-left font-medium">Kelas</th>
                        <th className="py-2 text-left font-medium">Total Poin</th>
                        <th className="py-2 text-right font-medium">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(new Set(records.map(r => r.studentName)))
                        .map(studentName => ({
                          name: studentName,
                          class: records.find(r => r.studentName === studentName)?.studentClass || '',
                          totalPoints: totalStudentPoints(studentName)
                        }))
                        .sort((a, b) => a.totalPoints - b.totalPoints)
                        .slice(0, 5)
                        .map((student, idx) => (
                          <tr key={idx} className="border-b hover:bg-muted/50">
                            <td className="py-2">{student.name}</td>
                            <td className="py-2">{student.class}</td>
                            <td className="py-2">
                              <span className={student.totalPoints >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {student.totalPoints}
                              </span>
                            </td>
                            <td className="py-2 text-right">
                              <Button variant="link" size="sm" className="h-auto p-0">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Lihat Profil
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Unduh Laporan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default DisciplinePage;
