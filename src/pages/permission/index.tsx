
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, FileText, Clock, CheckCircle2, XCircle, AlertCircle, FileUp, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const PermissionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Perizinan Digital - Si-Kaji';
  }, []);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [permissionType, setPermissionType] = useState("sick");

  // Sample permissions data
  const permissions = [
    { 
      id: 'IZN001', 
      type: 'Sakit', 
      status: 'Disetujui', 
      startDate: '2023-09-15', 
      endDate: '2023-09-16', 
      reason: 'Demam dan flu', 
      approver: 'Dian Pertiwi, M.Pd.',
      attachmentUrl: '#',
      notes: 'Harap istirahat yang cukup. Jangan lupa minum obat.' 
    },
    { 
      id: 'IZN002', 
      type: 'Dispensasi', 
      status: 'Disetujui', 
      startDate: '2023-10-01', 
      endDate: '2023-10-01', 
      reason: 'Mengikuti lomba programming tingkat provinsi', 
      approver: 'Kepala Sekolah',
      attachmentUrl: '#' 
    },
    { 
      id: 'IZN003', 
      type: 'Izin', 
      status: 'Ditolak', 
      startDate: '2023-10-10', 
      endDate: '2023-10-12', 
      reason: 'Acara keluarga', 
      approver: 'Rudi Hermawan, S.Kom.',
      notes: 'Durasi terlalu lama dan bersamaan dengan jadwal ujian praktikum.' 
    },
    { 
      id: 'IZN004', 
      type: 'Keterlambatan', 
      status: 'Menunggu', 
      startDate: '2023-10-20', 
      endDate: '2023-10-20', 
      reason: 'Ban sepeda motor bocor', 
      submittedAt: '2023-10-20 07:15' 
    },
  ];

  const handlePermissionTypeChange = (value: string) => {
    setPermissionType(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pengajuan izin berhasil dikirim', {
      description: 'Anda akan mendapatkan notifikasi ketika izin disetujui atau ditolak'
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Perizinan Digital</h1>
              <p className="text-muted-foreground mt-1">Ajukan dan kelola perizinan sakit, dispensasi, dan keterlambatan secara digital</p>
            </div>

            <Tabs defaultValue="submit" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="submit">Ajukan Izin</TabsTrigger>
                <TabsTrigger value="history">Riwayat Izin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="submit" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Formulir Pengajuan Izin</CardTitle>
                    <CardDescription>
                      Silakan lengkapi formulir untuk mengajukan izin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="permissionType">Jenis Izin</Label>
                        <Select value={permissionType} onValueChange={handlePermissionTypeChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis izin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sick">Sakit</SelectItem>
                            <SelectItem value="dispensation">Dispensasi</SelectItem>
                            <SelectItem value="permission">Izin Tidak Masuk</SelectItem>
                            <SelectItem value="late">Keterlambatan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tanggal Mulai</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pilih tanggal mulai</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {permissionType !== 'late' && (
                          <div className="space-y-2">
                            <Label>Tanggal Selesai</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {endDate ? format(endDate, "PPP") : <span>Pilih tanggal selesai</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  disabled={!startDate ? (date) => true : undefined}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}

                        {permissionType === 'late' && (
                          <div className="space-y-2">
                            <Label htmlFor="estimatedArrival">Perkiraan Waktu Tiba</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih waktu" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="07:30">07:30</SelectItem>
                                <SelectItem value="08:00">08:00</SelectItem>
                                <SelectItem value="08:30">08:30</SelectItem>
                                <SelectItem value="09:00">09:00</SelectItem>
                                <SelectItem value="09:30">09:30</SelectItem>
                                <SelectItem value="10:00">10:00</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason">Alasan</Label>
                        <Textarea 
                          id="reason" 
                          placeholder="Jelaskan alasan pengajuan izin secara detail" 
                          className="min-h-[120px]" 
                        />
                      </div>

                      {permissionType === 'sick' && (
                        <div className="space-y-2">
                          <Label htmlFor="attachment">Surat Keterangan Sakit (opsional)</Label>
                          <div className="flex items-center gap-2">
                            <Input id="attachment" type="file" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Format file: PDF, JPG, atau PNG. Maksimal 5MB.
                          </p>
                        </div>
                      )}

                      {permissionType === 'dispensation' && (
                        <div className="space-y-2">
                          <Label htmlFor="attachment">Dokumen Pendukung</Label>
                          <div className="flex items-center gap-2">
                            <Input id="attachment" type="file" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Surat undangan, surat tugas, atau dokumen pendukung lainnya. Format file: PDF, JPG, atau PNG. Maksimal 5MB.
                          </p>
                        </div>
                      )}
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSubmit} className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Ajukan Izin
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Riwayat Perizinan</CardTitle>
                    <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                      <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Cari perizinan..."
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} />
                        Filter Status
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {permissions.map((permission) => (
                        <Card key={permission.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                              <div className="flex gap-4">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full 
                                  ${permission.status === 'Disetujui' ? 'bg-green-100' : 
                                  permission.status === 'Ditolak' ? 'bg-red-100' : 'bg-yellow-100'}">
                                  {permission.status === 'Disetujui' && (
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                  )}
                                  {permission.status === 'Ditolak' && (
                                    <XCircle className="h-6 w-6 text-red-600" />
                                  )}
                                  {permission.status === 'Menunggu' && (
                                    <Clock className="h-6 w-6 text-yellow-600" />
                                  )}
                                </div>
                                
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">{permission.type}</h3>
                                    <Badge variant="outline" className={`${
                                      permission.status === 'Disetujui' ? 'bg-green-100 text-green-800 border-green-200' : 
                                      permission.status === 'Ditolak' ? 'bg-red-100 text-red-800 border-red-200' : 
                                      'bg-yellow-100 text-yellow-800 border-yellow-200'
                                    }`}>
                                      {permission.status}
                                    </Badge>
                                  </div>
                                  
                                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>ID: {permission.id}</span>
                                    <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                                    <span>
                                      {permission.startDate === permission.endDate ? 
                                        format(new Date(permission.startDate), "d MMMM yyyy") : 
                                        `${format(new Date(permission.startDate), "d MMMM")} - ${format(new Date(permission.endDate), "d MMMM yyyy")}`
                                      }
                                    </span>
                                  </div>
                                  
                                  <p className="mt-2 text-sm">{permission.reason}</p>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 self-start ml-auto">
                                {permission.attachmentUrl && (
                                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <FileUp className="h-4 w-4" />
                                    Lampiran
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">Detail</Button>
                              </div>
                            </div>
                            
                            {permission.notes && (
                              <div className="mt-3 pt-3 border-t">
                                <div className="flex items-start gap-2">
                                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium">Catatan:</p>
                                    <p className="text-sm text-muted-foreground">{permission.notes}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {permission.approver && permission.status !== 'Menunggu' && (
                              <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                                {permission.status === 'Disetujui' ? 'Disetujui oleh: ' : 'Ditinjau oleh: '}
                                <span className="font-medium">{permission.approver}</span>
                              </div>
                            )}
                            
                            {permission.status === 'Menunggu' && permission.submittedAt && (
                              <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                                Diajukan pada: {permission.submittedAt}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default PermissionPage;
