
import React, { useEffect, useState } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, FileText, CheckCircle, Clock, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const PermissionRequestPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Pengajuan Izin Digital - Si-Kaji';
  }, []);

  const [permissionType, setPermissionType] = useState('sick');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Izin berhasil diajukan', {
      description: 'Status izin dapat dilihat pada riwayat pengajuan'
    });
  };

  // Sample permissions history data
  const permissionsHistory = [
    {
      id: 'IZN001',
      type: 'Sakit',
      date: '10 September 2023',
      duration: '3 hari',
      reason: 'Demam dan flu',
      status: 'Disetujui',
      approvedBy: 'Dian Pertiwi, M.Pd.'
    },
    {
      id: 'IZN002',
      type: 'Dispensasi',
      date: '24 September 2023',
      duration: '5 jam',
      reason: 'Mengikuti lomba debat tingkat kota',
      status: 'Disetujui',
      approvedBy: 'Budi Santoso, S.Pd.'
    },
    {
      id: 'IZN003',
      type: 'Keterlambatan',
      date: '5 Oktober 2023',
      duration: '30 menit',
      reason: 'Ban motor bocor',
      status: 'Disetujui Bersyarat',
      approvedBy: 'Rudi Hermawan, S.Kom.'
    },
    {
      id: 'IZN004',
      type: 'Izin Keluar',
      date: '15 Oktober 2023',
      duration: '2 jam',
      reason: 'Kontrol ke dokter gigi',
      status: 'Ditolak',
      approvedBy: 'Ani Suryani, S.Pd.'
    },
  ];

  const statusColors = {
    'Disetujui': 'bg-green-100 text-green-800',
    'Disetujui Bersyarat': 'bg-yellow-100 text-yellow-800',
    'Ditolak': 'bg-red-100 text-red-800',
    'Menunggu': 'bg-blue-100 text-blue-800'
  };

  const statusIcons = {
    'Disetujui': <CheckCircle className="h-4 w-4 text-green-600" />,
    'Disetujui Bersyarat': <AlertCircle className="h-4 w-4 text-yellow-600" />,
    'Ditolak': <X className="h-4 w-4 text-red-600" />,
    'Menunggu': <Clock className="h-4 w-4 text-blue-600" />
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold">Pengajuan Izin Digital</h1>
              <p className="text-muted-foreground mt-1">Ajukan izin sakit, dispensasi, atau keterlambatan secara online</p>
            </div>

            <Tabs defaultValue="submit" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="submit">Ajukan Izin</TabsTrigger>
                <TabsTrigger value="history">Riwayat Pengajuan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="submit" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Formulir Pengajuan Izin</CardTitle>
                    <CardDescription>Lengkapi data berikut untuk mengajukan izin</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Jenis Izin</Label>
                        <RadioGroup 
                          defaultValue="sick" 
                          onValueChange={setPermissionType} 
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 border p-3 rounded-md">
                            <RadioGroupItem value="sick" id="sick" />
                            <Label htmlFor="sick" className="font-normal cursor-pointer">Sakit</Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-3 rounded-md">
                            <RadioGroupItem value="dispensation" id="dispensation" />
                            <Label htmlFor="dispensation" className="font-normal cursor-pointer">Dispensasi</Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-3 rounded-md">
                            <RadioGroupItem value="late" id="late" />
                            <Label htmlFor="late" className="font-normal cursor-pointer">Keterlambatan</Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-3 rounded-md">
                            <RadioGroupItem value="leave" id="leave" />
                            <Label htmlFor="leave" className="font-normal cursor-pointer">Izin Keluar</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Tanggal Mulai</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {permissionType === 'sick' && (
                          <div className="space-y-2">
                            <Label htmlFor="endDate">Tanggal Selesai</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {endDate ? format(endDate, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  initialFocus
                                  disabled={(date?: Date) => {
                                    if (!date || !date) return false;
                                    // Disable dates before start date
                                    return date < (date as Date);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}

                        {(permissionType === 'dispensation' || permissionType === 'late' || permissionType === 'leave') && (
                          <div className="space-y-2">
                            <Label htmlFor="duration">Durasi</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <Input 
                                id="duration" 
                                type="number" 
                                min="1" 
                                defaultValue="1" 
                              />
                              <Select defaultValue={permissionType === 'late' ? 'minutes' : 'hours'}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Satuan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="minutes">Menit</SelectItem>
                                  <SelectItem value="hours">Jam</SelectItem>
                                  <SelectItem value="days">Hari</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason">Alasan Izin</Label>
                        <Textarea 
                          id="reason" 
                          placeholder="Jelaskan alasan pengajuan izin Anda" 
                          rows={4}
                        />
                      </div>

                      {permissionType === 'sick' && (
                        <div className="space-y-2">
                          <Label htmlFor="attachment">Surat Keterangan Dokter (opsional)</Label>
                          <Input id="attachment" type="file" />
                          <p className="text-xs text-muted-foreground">Format: PDF, JPG, PNG (Maks. 2MB)</p>
                        </div>
                      )}

                      {permissionType === 'dispensation' && (
                        <div className="space-y-2">
                          <Label htmlFor="teacher">Guru Penanggung Jawab</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih guru" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="budi">Budi Santoso, S.Pd.</SelectItem>
                              <SelectItem value="dian">Dian Pertiwi, M.Pd.</SelectItem>
                              <SelectItem value="rudi">Rudi Hermawan, S.Kom.</SelectItem>
                              <SelectItem value="ani">Ani Suryani, S.Pd.</SelectItem>
                            </SelectContent>
                          </Select>
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
                  <CardHeader>
                    <CardTitle>Riwayat Pengajuan Izin</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {permissionsHistory.map((permission) => (
                      <Card key={permission.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                              <p className="font-semibold flex items-center">
                                {permission.type} - {permission.id}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                {permission.date} • {permission.duration}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusColors[permission.status as keyof typeof statusColors]}`}>
                                {statusIcons[permission.status as keyof typeof statusIcons]}
                                <span className="ml-1">{permission.status}</span>
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium">Alasan:</p>
                              <p className="text-sm">{permission.reason}</p>
                            </div>
                            {permission.status !== 'Menunggu' && (
                              <div>
                                <p className="text-sm font-medium">Diproses oleh:</p>
                                <p className="text-sm">{permission.approvedBy}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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

export default PermissionRequestPage;
