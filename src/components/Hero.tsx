
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCirclePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const Hero = () => {
  const { toast } = useToast();

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
        
        {/* Complaint Buttons and Tracking Text Area */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Complaint Button */}
            <div className="flex justify-center">
              <Button 
                onClick={handleComplaint}
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl w-full"
              >
                <div className="absolute inset-0 w-full h-full bg-black/10 transition-opacity opacity-0 group-hover:opacity-100"></div>
                <MessageCirclePlus className="mr-2 h-5 w-5" />
                <span>Buat Pengaduan</span>
              </Button>
            </div>
            
            {/* Right side - Track Ticket Text Area */}
            <div className="flex flex-col space-y-3">
              <Textarea 
                placeholder="Masukkan kode tiket pengaduan Anda di sini..." 
                className="min-h-[80px] resize-none"
              />
              <Button 
                onClick={handleTrackTicket}
                className="w-full"
              >
                Lacak Pengaduan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
