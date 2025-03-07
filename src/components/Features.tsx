
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
    title: 'Data Kesiswaan & Manajemen',
    description: 'Database siswa komprehensif meliputi data pribadi, akademik, prestasi, dan penerima bantuan/beasiswa.',
    icon: Users,
  },
  {
    id: 2,
    title: 'Sistem Pengaduan Online',
    description: 'Platform pelaporan digital untuk masalah perundungan, pelanggaran, atau isu lainnya dengan fitur anonim dan tindak lanjut terstruktur.',
    icon: Bell,
  },
  {
    id: 3,
    title: 'Sistem Presensi Digital',
    description: 'Pencatatan kehadiran otomatis menggunakan RFID dan QR Code untuk aktivitas sekolah dan kegiatan khusus.',
    icon: Clock,
  },
  {
    id: 4,
    title: 'Pencatatan Pelanggaran & Prestasi',
    description: 'Dokumentasi digital pelanggaran dan prestasi siswa dengan sistem poin dan notifikasi otomatis.',
    icon: Award,
  },
  {
    id: 5,
    title: 'Perizinan Digital',
    description: 'Pengajuan dan persetujuan izin sakit, dispensasi, keterlambatan, dan kegiatan luar jam efektif secara digital.',
    icon: ClipboardCheck,
  },
  {
    id: 6,
    title: 'Administrasi Kegiatan Siswa',
    description: 'Pengelolaan proposal, jadwal, peminjaman fasilitas, dan laporan kegiatan organisasi siswa secara sistematis.',
    icon: Calendar,
  },
  {
    id: 7,
    title: 'Portal Monitoring Orang Tua',
    description: 'Akses orang tua untuk memantau kehadiran, prestasi, pelanggaran, dan aktivitas siswa dengan notifikasi real-time.',
    icon: UserCheck,
  },
  {
    id: 8,
    title: 'Layanan BK Digital',
    description: 'Pengajuan konseling, mediasi, dan advokasi secara online dengan pencatatan historis layanan untuk evaluasi.',
    icon: MessageCircle,
  },
  {
    id: 9,
    title: 'Administrasi Surat Digital',
    description: 'Pengajuan dan pencetakan surat keterangan siswa aktif dan dokumen administratif lainnya secara mandiri.',
    icon: FileText,
  },
  {
    id: 10,
    title: 'Jurnal Perwalian Digital',
    description: 'Pencatatan aktivitas dan agenda perwalian mingguan untuk evaluasi dan pelaporan berkala.',
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
            Berikut ini merupakan layanan-layanan yang terintegrasi dalam Si-Kaji untuk pengelolaan administrasi dan data kesiswaan:
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
