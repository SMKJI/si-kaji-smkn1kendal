
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
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[800px] rounded-full bg-primary/5"></div>
        <div className="absolute top-1/2 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-primary/3 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[150px] md:w-[300px] h-[150px] md:h-[300px] rounded-full bg-primary/3 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 md:mb-6 animate-fade-in">
            <span>Sistem Informasi Kesiswaan</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 animate-fade-in-up">
            <span className="block">Si-Kaji</span>
            <span className="block text-primary">SMKN 1 Kendal</span>
          </h1>
          
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Pengelolaan data kesiswaan terintegrasi meliputi kehadiran, prestasi, pelanggaran, 
            perizinan, dan kegiatan siswa SMKN 1 Kendal secara digital.
          </p>
        </div>
        
        {/* Complaint and Tracking Cards */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left side - Complaint Card */}
            <Card className="border shadow-sm overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start mb-4 md:mb-5">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-100 mr-3">
                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold">Buat Pengaduan Baru</h3>
                </div>
                
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                  Laporkan masalah akademik, fasilitas, atau hal penting lainnya. Identitas pelapor 
                  dilindungi dan laporan akan ditangani oleh tim yang berwenang.
                </p>
                
                <Button 
                  onClick={handleComplaint}
                  size="lg" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors text-sm md:text-base py-2 h-auto"
                >
                  Buat Pengaduan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Right side - Track Ticket Card */}
            <Card className="border shadow-sm overflow-hidden">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start mb-4 md:mb-5">
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 mr-3">
                    <Search className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold">Lacak Status Pengaduan</h3>
                </div>
                
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                  Pantau perkembangan pengaduan yang telah disampaikan melalui kode tiket yang diberikan 
                  saat pengaduan dibuat.
                </p>
                
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Masukkan kode tiket..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={ticketCode}
                    onChange={(e) => setTicketCode(e.target.value)}
                  />
                  <Button 
                    onClick={handleTrackTicket}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm md:text-base py-2 h-auto"
                  >
                    Lacak Pengaduan
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
