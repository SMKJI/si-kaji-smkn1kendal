
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  XCircle,
  ArrowLeft, 
  ArrowRight,
  FileText,
  Calendar
} from 'lucide-react';
import { Timeline } from '@/components/complaint/Timeline';

interface Ticket {
  ticketNumber: string;
  complaintType: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  dateSubmitted: string;
  isAnonymous: boolean;
  timeline: {
    status: string;
    date: string;
    message: string;
  }[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Diterima':
      return 'bg-blue-500';
    case 'Diproses':
      return 'bg-yellow-500';
    case 'Ditindaklanjuti':
      return 'bg-purple-500';
    case 'Selesai':
      return 'bg-green-500';
    case 'Ditolak':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Diterima':
      return <Clock className="h-4 w-4" />;
    case 'Diproses':
      return <Loader2 className="h-4 w-4" />;
    case 'Ditindaklanjuti':
      return <AlertCircle className="h-4 w-4" />;
    case 'Selesai':
      return <CheckCircle2 className="h-4 w-4" />;
    case 'Ditolak':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const translateComplaintType = (type: string) => {
  switch (type) {
    case 'bullying':
      return 'Perundungan (Bullying)';
    case 'violence':
      return 'Kekerasan Fisik/Verbal';
    case 'facility':
      return 'Fasilitas Sekolah';
    case 'academic':
      return 'Masalah Akademik';
    case 'teacher':
      return 'Pengaduan Tentang Guru';
    case 'administration':
      return 'Pelayanan Administrasi';
    case 'other':
      return 'Lainnya';
    default:
      return type;
  }
};

const TicketStatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTicket, setSearchTicket] = useState('');
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Get ticket number from location state if available
  useEffect(() => {
    if (location.state?.ticketNumber) {
      setSearchTicket(location.state.ticketNumber);
      handleSearch(location.state.ticketNumber);
    }
  }, [location.state]);

  const handleSearch = (ticketNumber = searchTicket) => {
    if (!ticketNumber) {
      toast.error('Masukkan nomor tiket');
      return;
    }
    
    setIsLoading(true);
    setNotFound(false);
    
    // Simulate API request
    setTimeout(() => {
      // Get tickets from localStorage (for demo purposes)
      const storedTickets = JSON.parse(localStorage.getItem('complaintTickets') || '{}');
      const foundTicket = storedTickets[ticketNumber];
      
      if (foundTicket) {
        setTicket(foundTicket);
        // Update URL history to include the ticket number
        if (location.state?.ticketNumber !== ticketNumber) {
          navigate('/complaint/ticket', { state: { ticketNumber }, replace: true });
        }
      } else {
        setTicket(null);
        setNotFound(true);
        toast.error('Tiket tidak ditemukan', {
          description: 'Pastikan nomor tiket yang Anda masukkan benar'
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Status Pengaduan</h1>
                <p className="text-muted-foreground">
                  Pantau status pengaduan Anda menggunakan nomor tiket
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/complaint')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Form
              </Button>
            </div>
            
            <Card className="shadow-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Search className="h-5 w-5" />
                  Lacak Pengaduan
                </CardTitle>
                <CardDescription>
                  Masukkan nomor tiket pengaduan untuk melihat status terkini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Masukkan nomor tiket (contoh: SIKAJI-123456)"
                    value={searchTicket}
                    onChange={(e) => setSearchTicket(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSearch()} disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                    Cari
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Mencari tiket pengaduan...</p>
                </div>
              </div>
            )}
            
            {notFound && !isLoading && (
              <div className="text-center py-12">
                <XCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">Tiket Tidak Ditemukan</h3>
                <p className="text-muted-foreground mb-6">
                  Nomor tiket yang Anda masukkan tidak ditemukan dalam sistem kami
                </p>
                <Button onClick={() => navigate('/complaint')}>
                  Buat Pengaduan Baru
                </Button>
              </div>
            )}
            
            {ticket && !isLoading && (
              <Card className="shadow-md overflow-hidden">
                <div className="bg-primary text-white px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-xl font-semibold">Tiket: {ticket.ticketNumber}</h2>
                    <Badge className={`${getStatusColor(ticket.status)} text-white font-medium flex items-center gap-1.5`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Informasi Pengaduan</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Jenis Pengaduan</p>
                          <p className="font-medium">{translateComplaintType(ticket.complaintType)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Tanggal Pengaduan</p>
                          <p className="font-medium flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {formatDate(ticket.dateSubmitted)}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Deskripsi</p>
                          <p className="mt-1 text-sm whitespace-pre-wrap">{ticket.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Informasi Pelapor</h3>
                      
                      {ticket.isAnonymous ? (
                        <div className="bg-secondary/50 rounded-md p-4">
                          <p className="font-medium flex items-center gap-1.5 mb-2">
                            Dilaporkan secara anonim
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Identitas pelapor tidak diketahui sesuai permintaan
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Nama</p>
                            <p className="font-medium">{ticket.name}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{ticket.email}</p>
                          </div>
                          
                          {ticket.phone && (
                            <div>
                              <p className="text-sm text-muted-foreground">Nomor Telepon</p>
                              <p className="font-medium">{ticket.phone}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  {/* Timeline of ticket updates */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Riwayat Penanganan</h3>
                    <Timeline events={ticket.timeline} />
                  </div>
                </CardContent>
                
                <CardFooter className="border-t px-6 py-4 flex flex-wrap gap-3 justify-between">
                  <Button variant="outline" className="gap-2" onClick={() => navigate('/complaint')}>
                    <FileText className="h-4 w-4" />
                    Buat Pengaduan Baru
                  </Button>
                  
                  <Button className="gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Perbarui Pengaduan
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default TicketStatusPage;
