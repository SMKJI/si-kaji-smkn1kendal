
import React from 'react';
import { CardTitle, Card, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { Users, Shield, GraduationCap } from 'lucide-react';

const InfoSection = () => {
  const users = [
    { 
      icon: Users, 
      title: 'Siswa', 
      description: 'Memudahkan akses berbagai layanan seperti perizinan, pengajuan kegiatan, dan monitoring prestasi.'
    },
    { 
      icon: GraduationCap, 
      title: 'Guru & Wali Kelas', 
      description: 'Memberikan akses data siswa yang komprehensif untuk mendukung proses bimbingan dan pembelajaran.'
    },
    { 
      icon: Shield, 
      title: 'Orang Tua', 
      description: 'Menyediakan transparansi dan pemantauan kegiatan anak di sekolah secara real-time.'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Informasi Si-Kaji</h2>
          <p className="text-muted-foreground text-lg">
            Si-Kaji adalah sistem terintegrasi yang dirancang untuk mengelola berbagai aspek kesiswaan
            di SMKN 1 Kendal secara efisien, transparan, dan akuntabel.
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
              <h3 className="text-2xl font-bold mb-4">Mengapa Si-Kaji?</h3>
              <p className="text-muted-foreground mb-6">
                Si-Kaji dirancang untuk menjawab kebutuhan pengelolaan data kesiswaan yang terintegrasi,
                efisien, dan dapat diakses oleh berbagai pemangku kepentingan di lingkungan sekolah.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Efisiensi Administrasi</span> - 
                    Mengurangi beban kerja administratif bagi guru dan staf sekolah.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Transparansi</span> - 
                    Memberikan akses informasi yang jelas dan real-time kepada semua pemangku kepentingan.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Pendidikan Karakter</span> - 
                    Menumbuhkan rasa tanggung jawab dan disiplin siswa melalui sistem yang terstruktur.
                  </p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Peran Pengguna</h3>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-secondary/70 border border-border/50">
                  <h4 className="font-medium mb-2">Admin & Manajemen Sekolah</h4>
                  <p className="text-sm text-muted-foreground">
                    Meliputi Kepala Sekolah, Waka Kesiswaan, serta staff administrasi
                    yang bertanggung jawab atas pengaturan dan pengawasan sistem.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/70 border border-border/50">
                  <h4 className="font-medium mb-2">Guru & Wali Kelas</h4>
                  <p className="text-sm text-muted-foreground">
                    Mengakses informasi siswa, memasukkan data nilai, pelanggaran, dan prestasi, 
                    serta berkomunikasi dengan orang tua melalui platform.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/70 border border-border/50">
                  <h4 className="font-medium mb-2">Siswa & Orang Tua</h4>
                  <p className="text-sm text-muted-foreground">
                    Mengakses informasi akademik, kehadiran, dan aktivitas sekolah,
                    serta melakukan pengajuan izin dan permohonan layanan.
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
