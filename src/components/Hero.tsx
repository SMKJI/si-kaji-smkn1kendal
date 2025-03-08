
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const Hero = () => {
  const { toast } = useToast();
  const [ticketCode, setTicketCode] = useState('');

  const handleTrackTicket = () => {
    // This is a placeholder - would be connected to actual tracking functionality
    toast({
      title: "Fitur Pelacakan Tiket",
      description: "Silakan masukkan kode tiket pengaduan Anda untuk melacak status.",
      duration: 5000,
    });
  };

  const handleComplaint = () => {
    // This is a placeholder - would be connected to actual complaint form
    toast({
      title: "Fitur Pengaduan",
      description: "Formulir pengaduan akan segera tersedia.",
      duration: 5000,
    });
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <span>Sistem Informasi Kesiswaan</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            <span className="block">Si-Kaji</span>
            <span className="block text-primary">SMKN 1 Kendal</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Pengelolaan data kesiswaan terintegrasi meliputi kehadiran, prestasi, pelanggaran, 
            perizinan, dan kegiatan siswa SMKN 1 Kendal secara digital.
          </p>
        </div>
        
        {/* Complaint and Tracking Cards */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Complaint Card */}
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start mb-5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mr-3">
                    <MessageCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-semibold">Buat Pengaduan Baru</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Laporkan masalah akademik, fasilitas, atau hal penting lainnya. Identitas pelapor 
                  dilindungi dan laporan akan ditangani oleh tim yang berwenang.
                </p>
                
                <Button 
                  onClick={handleComplaint}
                  size="lg" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                >
                  Buat Pengaduan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Right side - Track Ticket Card */}
            <Card className="border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start mb-5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mr-3">
                    <Search className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-semibold">Lacak Status Pengaduan</h3>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Pantau perkembangan pengaduan yang telah disampaikan melalui kode tiket yang diberikan 
                  saat pengaduan dibuat.
                </p>
                
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Masukkan kode tiket..."
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                  />
                  <Button 
                    onClick={handleTrackTicket}
                    className="bg-blue-500 hover:bg-blue-600 text-white md:w-auto"
                  >
                    Lacak
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
