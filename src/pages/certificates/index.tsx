
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { CalendarIcon, FileText, Download, Eye, Printer, Clock, CheckCircle2, XCircle, Search } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Schema untuk form surat keterangan
const certificateFormSchema = z.object({
  purpose: z.string({
    required_error: "Tujuan surat wajib dipilih.",
  }),
  requestDate: z.date({
    required_error: "Tanggal pengajuan wajib diisi.",
  }),
  neededDate: z.date({
    required_error: "Tanggal dibutuhkan wajib diisi.",
  }),
  description: z.string().min(5, {
    message: "Deskripsi minimal 5 karakter.",
  }).optional(),
});

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      studentName: 'Andi Saputra',
      studentId: '0012345678',
      studentClass: 'XII RPL 1',
      purpose: 'Beasiswa',
      requestDate: new Date(2023, 8, 5),
      neededDate: new Date(2023, 8, 10),
      status: 'Disetujui',
      description: 'Untuk pengajuan beasiswa Kartu Indonesia Pintar',
      approvedDate: new Date(2023, 8, 6),
      documentNumber: 'SKT/2023/09/001'
    },
    {
      id: 2,
      studentName: 'Andi Saputra',
      studentId: '0012345678',
      studentClass: 'XII RPL 1',
      purpose: 'Kartu Identitas',
      requestDate: new Date(2023, 7, 15),
      neededDate: new Date(2023, 7, 20),
      status: 'Disetujui',
      description: 'Untuk pembuatan KTP baru',
      approvedDate: new Date(2023, 7, 16),
      documentNumber: 'SKT/2023/08/015'
    },
    {
      id: 3,
      studentName: 'Andi Saputra',
      studentId: '0012345678',
      studentClass: 'XII RPL 1',
      purpose: 'Magang',
      requestDate: new Date(2023, 9, 12),
      neededDate: new Date(2023, 9, 15),
      status: 'Menunggu',
      description: 'Untuk keperluan magang di PT Teknologi Maju',
      approvedDate: null,
      documentNumber: null
    }
  ]);

  const form = useForm<z.infer<typeof certificateFormSchema>>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      description: "",
      requestDate: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof certificateFormSchema>) {
    // Menambahkan surat keterangan baru
    const newCertificate = {
      id: certificates.length + 1,
      studentName: 'Andi Saputra', // Dalam aplikasi nyata ini akan diambil dari user yang login
      studentId: '0012345678',
      studentClass: 'XII RPL 1',
      purpose: values.purpose,
      requestDate: values.requestDate,
      neededDate: values.neededDate,
      status: 'Menunggu',
      description: values.description || '',
      approvedDate: null,
      documentNumber: null
    };

    setCertificates([...certificates, newCertificate]);
    
    toast.success("Permohonan surat keterangan berhasil diajukan!", {
      description: `Permohonan untuk ${values.purpose} telah dikirim dan sedang dalam proses review.`,
    });
    
    form.reset();
  }

  return (
    <DashboardLayout
      title="Surat Keterangan"
      description="Pengajuan dan manajemen surat keterangan aktif siswa"
      userRole="student"
      userName="Andi Saputra"
      showBackButton
      backTo="/dashboard"
    >
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Surat Saya</TabsTrigger>
          <TabsTrigger value="new-request">Ajukan Surat</TabsTrigger>
          <TabsTrigger value="templates">Template Surat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan tujuan surat..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Dokumen</TableHead>
                    <TableHead>Tujuan</TableHead>
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead>Tanggal Dibutuhkan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell>{cert.documentNumber || '-'}</TableCell>
                      <TableCell>{cert.purpose}</TableCell>
                      <TableCell>{format(cert.requestDate, "dd MMM yyyy")}</TableCell>
                      <TableCell>{format(cert.neededDate, "dd MMM yyyy")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            cert.status === 'Disetujui' 
                              ? 'default' 
                              : cert.status === 'Ditolak' 
                                ? 'destructive' 
                                : 'secondary'
                          }
                        >
                          {cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Lihat detail</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Detail Surat Keterangan</DialogTitle>
                                <DialogDescription>
                                  Surat keterangan siswa aktif untuk {cert.purpose}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <h3 className="text-sm font-medium">Nomor Dokumen</h3>
                                    <p>{cert.documentNumber || '-'}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium">Status</h3>
                                    <Badge
                                      variant={
                                        cert.status === 'Disetujui' 
                                          ? 'default' 
                                          : cert.status === 'Ditolak' 
                                            ? 'destructive' 
                                            : 'secondary'
                                      }
                                    >
                                      {cert.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium">Siswa</h3>
                                  <p>{cert.studentName} ({cert.studentId})</p>
                                  <p className="text-sm text-muted-foreground">{cert.studentClass}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <h3 className="text-sm font-medium">Tanggal Pengajuan</h3>
                                    <p>{format(cert.requestDate, "dd MMMM yyyy")}</p>
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium">Tanggal Dibutuhkan</h3>
                                    <p>{format(cert.neededDate, "dd MMMM yyyy")}</p>
                                  </div>
                                </div>
                                {cert.approvedDate && (
                                  <div>
                                    <h3 className="text-sm font-medium">Tanggal Persetujuan</h3>
                                    <p>{format(cert.approvedDate, "dd MMMM yyyy")}</p>
                                  </div>
                                )}
                                <div>
                                  <h3 className="text-sm font-medium">Deskripsi</h3>
                                  <p>{cert.description}</p>
                                </div>
                              </div>
                              <DialogFooter>
                                {cert.status === 'Disetujui' && (
                                  <>
                                    <Button variant="outline" className="flex items-center gap-2">
                                      <Download className="h-4 w-4" />
                                      Unduh PDF
                                    </Button>
                                    <Button className="flex items-center gap-2">
                                      <Printer className="h-4 w-4" />
                                      Cetak Surat
                                    </Button>
                                  </>
                                )}
                                {cert.status === 'Menunggu' && (
                                  <Button variant="outline" className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Menunggu Persetujuan
                                  </Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          {cert.status === 'Disetujui' && (
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Cetak</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new-request">
          <Card>
            <CardHeader>
              <CardTitle>Ajukan Surat Keterangan Baru</CardTitle>
              <CardDescription>
                Pilih jenis surat keterangan yang ingin diajukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tujuan Surat</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tujuan surat" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Beasiswa">Beasiswa</SelectItem>
                            <SelectItem value="Magang">Magang / PKL</SelectItem>
                            <SelectItem value="Kartu Identitas">Kartu Identitas / KTP</SelectItem>
                            <SelectItem value="Asuransi">Asuransi</SelectItem>
                            <SelectItem value="Lomba">Lomba / Kompetisi</SelectItem>
                            <SelectItem value="Lainnya">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Pilih tujuan penggunaan surat keterangan
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="requestDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tanggal Pengajuan</FormLabel>
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
                                disabled={(date) => date < new Date()}
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
                      name="neededDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tanggal Dibutuhkan</FormLabel>
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
                                disabled={(date) => {
                                  const today = new Date();
                                  return date < today;
                                }}
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Kapan surat ini Anda butuhkan
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
                        <FormLabel>Deskripsi (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Jelaskan kebutuhan surat secara detail jika diperlukan"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Berikan informasi tambahan mengenai kebutuhan surat ini
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Ajukan Surat
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Surat Keterangan Aktif Siswa</CardTitle>
                <CardDescription>
                  Digunakan untuk bukti bahwa siswa terdaftar aktif di sekolah
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-44 border rounded-md bg-gray-50 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-300" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">Umum</Badge>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Lihat Contoh
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Surat Keterangan untuk Beasiswa</CardTitle>
                <CardDescription>
                  Format khusus untuk pengajuan beasiswa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-44 border rounded-md bg-gray-50 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-300" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">Beasiswa</Badge>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Lihat Contoh
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Surat Keterangan PKL / Magang</CardTitle>
                <CardDescription>
                  Format untuk keperluan PKL atau magang di perusahaan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-44 border rounded-md bg-gray-50 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-300" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">PKL/Magang</Badge>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Lihat Contoh
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Informasi Pengajuan Surat</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Waktu Pemrosesan</p>
                  <p className="text-sm text-muted-foreground">Surat akan diproses dalam waktu 1-2 hari kerja.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Stempel Digital</p>
                  <p className="text-sm text-muted-foreground">Surat akan diterbitkan dengan tanda tangan dan stempel digital yang sah.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Cetak Mandiri</p>
                  <p className="text-sm text-muted-foreground">Anda dapat mencetak surat sendiri setelah disetujui.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium">Batasan</p>
                  <p className="text-sm text-muted-foreground">Maksimal 5 pengajuan surat per bulan per siswa.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CertificatesPage;
