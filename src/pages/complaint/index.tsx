import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  AlertCircle, 
  FileUp, 
  SendHorizontal, 
  Shield, 
  HelpCircle
} from 'lucide-react';
import { Steps } from '@/components/complaint/Steps';

const ComplaintPage = () => {
  const navigate = useNavigate();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [complaintType, setComplaintType] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!complaintType) {
      toast.error('Silakan pilih jenis pengaduan');
      return;
    }
    
    if (!description) {
      toast.error('Silakan isi deskripsi pengaduan');
      return;
    }
    
    if (!isAnonymous && (!name || !email)) {
      toast.error('Silakan isi nama dan email Anda jika tidak anonim');
      return;
    }
    
    setIsLoading(true);
    
    const ticketNumber = `SIKAJI-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
    
    setTimeout(() => {
      setIsLoading(false);
      
      const ticketData = {
        ticketNumber,
        complaintType,
        description,
        name: isAnonymous ? 'Anonim' : name,
        email: isAnonymous ? '' : email,
        phone: isAnonymous ? '' : phone,
        status: 'Diterima',
        dateSubmitted: new Date().toISOString(),
        isAnonymous,
        timeline: [
          {
            status: 'Diterima',
            date: new Date().toISOString(),
            message: 'Pengaduan telah diterima dan sedang menunggu untuk ditinjau'
          }
        ]
      };
      
      const existingTickets = JSON.parse(localStorage.getItem('complaintTickets') || '{}');
      existingTickets[ticketNumber] = ticketData;
      localStorage.setItem('complaintTickets', JSON.stringify(existingTickets));
      
      toast.success('Pengaduan berhasil dikirim', {
        description: `Nomor tiket: ${ticketNumber}`,
        action: {
          label: 'Lihat Status',
          onClick: () => navigate('/complaint/ticket', { state: { ticketNumber } })
        }
      });
      
      navigate('/complaint/ticket', { state: { ticketNumber } });
    }, 1500);
  };

  return (
    <DashboardLayout
      title="Sistem Pengaduan"
      description="Laporkan masalah, keluhan, atau saran untuk perbaikan layanan SMKN 1 Kendal"
      userRole="student"
      userName="Ahmad Siswa"
      showBackButton
      backTo="/dashboard"
    >
      <div className="max-w-3xl mx-auto">
        <div className="my-8">
          <Steps currentStep={currentStep} />
        </div>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Form Pengaduan
            </CardTitle>
            <CardDescription>
              Sampaikan pengaduan Anda dengan informasi yang lengkap dan jelas.
              Semua pengaduan akan ditangani dengan serius dan kerahasiaan terjamin.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-md">
                <div className="space-y-0.5">
                  <div className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Mode Anonim
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Identitas Anda tidak akan diketahui saat pelaporan dibuat secara anonim
                  </div>
                </div>
                <Switch 
                  checked={isAnonymous} 
                  onCheckedChange={setIsAnonymous} 
                />
              </div>
              
              {!isAnonymous && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informasi Pelapor</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></Label>
                      <Input 
                        id="name" 
                        placeholder="Masukkan nama lengkap" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isAnonymous}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Masukkan email aktif" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={!isAnonymous}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input 
                      id="phone" 
                      placeholder="Masukkan nomor telepon" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Opsional, akan digunakan untuk konfirmasi jika diperlukan</p>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informasi Pengaduan</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="complaint-type">Jenis Pengaduan <span className="text-red-500">*</span></Label>
                  <Select value={complaintType} onValueChange={setComplaintType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis pengaduan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bullying">Perundungan (Bullying)</SelectItem>
                      <SelectItem value="violence">Kekerasan Fisik/Verbal</SelectItem>
                      <SelectItem value="facility">Fasilitas Sekolah</SelectItem>
                      <SelectItem value="academic">Masalah Akademik</SelectItem>
                      <SelectItem value="teacher">Pengaduan Tentang Guru</SelectItem>
                      <SelectItem value="administration">Pelayanan Administrasi</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Pengaduan <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="description" 
                    placeholder="Jelaskan secara detail apa yang terjadi, kapan, di mana, siapa yang terlibat, dll." 
                    className="min-h-[150px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Berikan informasi selengkap mungkin untuk membantu kami menindaklanjuti pengaduan Anda
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attachment">Lampiran (Opsional)</Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="attachment" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/70">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-8 h-8 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Klik untuk unggah</span> atau seret dan lepas
                        </p>
                        <p className="text-xs text-muted-foreground">Gambar, Video, atau Dokumen (Maks. 10MB)</p>
                      </div>
                      <Input id="attachment" type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 text-blue-800 rounded-md flex gap-3">
                <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Informasi Penting:</p>
                  <p>Pengaduan Anda akan mendapat nomor tiket yang dapat digunakan untuk memantau status penanganan. Seluruh informasi akan dijaga kerahasiaannya, terutama jika Anda memilih mode anonim.</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" type="button" onClick={() => navigate('/dashboard')}>
                Kembali
              </Button>
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>Mengirim Pengaduan...</>
                ) : (
                  <>
                    <SendHorizontal className="h-4 w-4" />
                    Kirim Pengaduan
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintPage;
