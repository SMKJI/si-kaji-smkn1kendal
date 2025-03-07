
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCirclePlus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
        
        {/* Complaint Buttons - Now placed after the main title and description */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
          <Button 
            onClick={handleComplaint}
            size="lg" 
            className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div className="absolute inset-0 w-full h-full bg-black/10 transition-opacity opacity-0 group-hover:opacity-100"></div>
            <MessageCirclePlus className="mr-2 h-5 w-5" />
            <span>Buat Pengaduan</span>
          </Button>
          
          <Button 
            onClick={handleTrackTicket}
            size="lg" 
            variant="outline" 
            className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <Search className="mr-2 h-5 w-5 text-primary" />
            <span>Lacak Pengaduan</span>
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-400">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Akses Sistem <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <a href="#informasi">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Informasi Sistem
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
