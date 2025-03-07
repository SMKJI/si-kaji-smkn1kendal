
import React from 'react';
import { CardTitle, Card, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { Users, Shield, GraduationCap } from 'lucide-react';

const InfoSection = () => {
  const users = [
    { 
      icon: Users, 
      title: 'Siswa', 
      description: 'Akses layanan perizinan, pengajuan kegiatan, pemantauan prestasi dan pelanggaran, serta layanan BK secara digital.'
    },
    { 
      icon: GraduationCap, 
      title: 'Guru & Wali Kelas', 
      description: 'Pengelolaan data siswa, pencatatan pelanggaran dan prestasi, persetujuan izin, dan administrasi perwalian digital.'
    },
    { 
      icon: Shield, 
      title: 'Orang Tua', 
      description: 'Pemantauan kehadiran, prestasi, dan pelanggaran anak. Menerima notifikasi otomatis untuk ketidakhadiran dan pelanggaran.'
    }
  ];

  return (
    <section id="informasi" className="py-24 relative bg-secondary/50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-50 -z-10">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tentang Si-Kaji</h2>
          <p className="text-muted-foreground text-lg">
            Si-Kaji adalah sistem informasi kesiswaan yang mengintegrasikan administrasi, pencatatan, dan pelaporan 
            seluruh aktivitas terkait kesiswaan di SMKN 1 Kendal untuk meningkatkan efisiensi dan transparansi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {users.map((user, index) => (
            <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <div className="mb-2 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <user.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{user.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {user.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Kegunaan Sistem</h3>
              <p className="text-muted-foreground mb-6">
                Si-Kaji mengintegrasikan berbagai aspek pengelolaan kesiswaan dalam satu platform untuk mengurangi administrasi manual
                dan meningkatkan akurasi data serta transparansi informasi.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Digitalisasi Administrasi</span> - 
                    Mengurangi penggunaan kertas dan meningkatkan kecepatan proses layanan kesiswaan.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Pemantauan Real-time</span> - 
                    Data kehadiran, prestasi, dan pelanggaran diperbarui secara realtime dengan notifikasi otomatis.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Pengarsipan Digital</span> - 
                    Penyimpanan dan penelusuran data historis siswa sepanjang masa pendidikan di SMKN 1 Kendal.
                  </p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Pengguna Sistem</h3>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-secondary/70 border border-border/50">
                  <h4 className="font-medium mb-2">Admin & Manajemen</h4>
                  <p className="text-sm text-muted-foreground">
                    Kepala Sekolah, Waka Kesiswaan, dan Satgas TPPK mengelola kebijakan, mengawasi aktivitas, 
                    dan mengambil keputusan berdasarkan data terpadu.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/70 border border-border/50">
                  <h4 className="font-medium mb-2">Guru & Wali Kelas</h4>
                  <p className="text-sm text-muted-foreground">
                    Mengelola administrasi kelas, mencatat prestasi dan pelanggaran, memantau perkembangan siswa,
                    dan memproses perizinan digital.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/70 border border-border/50">
                  <h4 className="font-medium mb-2">Siswa & Orang Tua</h4>
                  <p className="text-sm text-muted-foreground">
                    Mengakses layanan perizinan, konsultasi, pengajuan kegiatan, pemantauan kehadiran,
                    prestasi, dan pelanggaran secara transparan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
