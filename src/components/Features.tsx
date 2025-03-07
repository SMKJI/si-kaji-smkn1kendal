
import React from 'react';
import { 
  Users, 
  FileText, 
  Bell, 
  Clock, 
  Award, 
  ClipboardCheck, 
  Calendar, 
  UserCheck, 
  MessageCircle, 
  Book
} from 'lucide-react';

// Feature data structure
const features = [
  {
    id: 1,
    title: 'Data Kesiswaan & Manajemen Siswa',
    description: 'Menyediakan data lengkap siswa yang dapat diakses oleh pihak sekolah sesuai kebutuhan.',
    icon: Users,
  },
  {
    id: 2,
    title: 'Sistem Pengaduan Online',
    description: 'Platform pelaporan bagi siswa, guru, dan orang tua terkait pelanggaran atau masalah secara transparan.',
    icon: Bell,
  },
  {
    id: 3,
    title: 'Sistem Presensi',
    description: 'Mempermudah pencatatan kehadiran siswa dengan sistem RFID dan QR Code otomatis.',
    icon: Clock,
  },
  {
    id: 4,
    title: 'Pencatatan Pelanggaran & Prestasi',
    description: 'Meningkatkan disiplin siswa dengan sistem pencatatan yang transparan dan berbasis data.',
    icon: Award,
  },
  {
    id: 5,
    title: 'Sistem Perizinan Online',
    description: 'Mempermudah pengajuan izin dan dispensasi secara online dengan approval system.',
    icon: ClipboardCheck,
  },
  {
    id: 6,
    title: 'Perencanaan & Proposal Kegiatan',
    description: 'Mempermudah proses pengajuan dan persetujuan kegiatan siswa dari berbagai organisasi.',
    icon: Calendar,
  },
  {
    id: 7,
    title: 'Portal Monitoring Orang Tua',
    description: 'Memberikan transparansi kepada orang tua mengenai aktivitas anak mereka di sekolah.',
    icon: UserCheck,
  },
  {
    id: 8,
    title: 'Layanan Bimbingan Konseling',
    description: 'Mempermudah akses siswa untuk mendapatkan layanan BK dengan sistem pengajuan online.',
    icon: MessageCircle,
  },
  {
    id: 9,
    title: 'Permohonan Surat Keterangan',
    description: 'Mempermudah siswa dalam memperoleh surat keterangan aktif sekolah secara mandiri.',
    icon: FileText,
  },
  {
    id: 10,
    title: 'Jurnal Perwalian Digital',
    description: 'Membantu wali kelas dalam mencatat kegiatan perwalian setiap minggunya.',
    icon: Book,
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <div 
      className={`relative p-6 rounded-xl glass hover:shadow-lg transition-all duration-300 animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col h-full">
        <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
          <feature.icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        <p className="text-muted-foreground text-sm">{feature.description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="fitur" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Si-Kaji</h2>
          <p className="text-muted-foreground text-lg">
            Sistem terintegrasi yang dirancang untuk mengelola berbagai aspek kesiswaan
            secara efisien dan transparan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
