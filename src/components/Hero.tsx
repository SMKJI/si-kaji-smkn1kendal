
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5"></div>
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/3 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
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
