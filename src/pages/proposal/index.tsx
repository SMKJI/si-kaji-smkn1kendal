
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger, DialogClose 
} from '@/components/ui/dialog';
import { 
  Check, X, Eye, FileText, AlertCircle, ClipboardCheck, Clock, 
  CheckCircle, XCircle
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock data for proposals
const MOCK_PROPOSALS = [
  {
    id: 'PRO001',
    title: 'Lomba Debat Bahasa Inggris',
    submitter: 'OSIS SMKN 1 Kendal',
    type: 'Kegiatan',
    submittedDate: '2023-10-15',
    status: 'pending',
    urgency: 'high',
    description: 'Proposal untuk mengadakan lomba debat bahasa Inggris antar kelas di SMKN 1 Kendal sebagai bagian dari English Week.',
    budget: 3500000,
    startDate: '2023-11-10',
    endDate: '2023-11-12',
    participants: 'Seluruh perwakilan kelas',
    location: 'Aula Utama',
    files: ['proposal-debat.pdf', 'anggaran-debat.xlsx']
  },
  {
    id: 'PRO002',
    title: 'Kunjungan Industri Teknik Komputer Jaringan',
    submitter: 'Jurusan TKJ',
    type: 'Kunjungan',
    submittedDate: '2023-10-10',
    status: 'approved',
    urgency: 'medium',
    description: 'Kunjungan industri ke PT XYZ untuk melihat implementasi jaringan komputer skala enterprise.',
    budget: 7500000,
    startDate: '2023-12-05',
    endDate: '2023-12-06',
    participants: 'Siswa kelas XII TKJ',
    location: 'PT XYZ Semarang',
    files: ['proposal-kunjungan.pdf']
  },
  {
    id: 'PRO003',
    title: 'Workshop Kewirausahaan',
    submitter: 'OSIS & BKK',
    type: 'Workshop',
    submittedDate: '2023-10-12',
    status: 'rejected',
    urgency: 'low',
    description: 'Workshop kewirausahaan dengan mengundang alumni sukses sebagai pembicara.',
    budget: 2500000,
    startDate: '2023-11-25',
    endDate: '2023-11-25',
    participants: 'Siswa kelas XI dan XII',
    location: 'Aula Utama',
    files: ['proposal-workshop.pdf', 'rundown.docx']
  },
  {
    id: 'PRO004',
    title: 'Pelatihan Lomba Kompetensi Siswa (LKS)',
    submitter: 'Tim LKS Sekolah',
    type: 'Pelatihan',
    submittedDate: '2023-10-18',
    status: 'in_review',
    urgency: 'high',
    description: 'Pelatihan intensif untuk persiapan Lomba Kompetensi Siswa tingkat Provinsi.',
    budget: 5000000,
    startDate: '2023-10-30',
    endDate: '2023-11-15',
    participants: 'Siswa terpilih dari berbagai jurusan',
    location: 'Lab Komputer & Bengkel Praktek',
    files: ['proposal-lks.pdf', 'daftar-peserta.xlsx']
  },
  {
    id: 'PRO005',
    title: 'Pentas Seni Akhir Semester',
    submitter: 'Ekstrakurikuler Seni',
    type: 'Kegiatan',
    submittedDate: '2023-10-05',
    status: 'pending',
    urgency: 'medium',
    description: 'Pentas seni dan budaya untuk menutup semester ganjil tahun ajaran 2023/2024.',
    budget: 8500000,
    startDate: '2023-12-16',
    endDate: '2023-12-16',
    participants: 'Seluruh warga sekolah',
    location: 'Lapangan Utama',
    files: ['proposal-pensi.pdf', 'rundown-acara.docx', 'anggaran.xlsx']
  }
];

const ProposalPage = () => {
  const [userRole, setUserRole] = useState<'principal' | 'waka'>('principal');
  const [activeTab, setActiveTab] = useState('all');
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Persetujuan Proposal - Si-Kaji';
  }, []);

  const handleApproveProposal = (id: string) => {
    setProposals(proposals.map(p => 
      p.id === id ? {...p, status: 'approved'} : p
    ));
    toast({
      title: "Proposal disetujui",
      description: `Proposal ${id} telah berhasil disetujui`,
    });
  };

  const handleRejectProposal = (id: string) => {
    setProposals(proposals.map(p => 
      p.id === id ? {...p, status: 'rejected'} : p
    ));
    toast({
      title: "Proposal ditolak",
      description: `Proposal ${id} telah ditolak`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Menunggu</Badge>;
      case 'in_review':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Dalam Peninjauan</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Disetujui</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Ditolak</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch(urgency) {
      case 'high':
        return <Badge className="bg-red-500">Tinggi</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Sedang</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Rendah</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const filteredProposals = activeTab === 'all' 
    ? proposals 
    : proposals.filter(p => p.status === activeTab);

  return (
    <DashboardLayout
      title="Persetujuan Proposal"
      description="Kelola dan proses proposal kegiatan, kunjungan, dan penggunaan anggaran"
      userRole={userRole}
      userName={userRole === 'principal' ? 'Kepala Sekolah' : 'Waka Kesiswaan'}
    >
      {/* Role switcher - for demo only */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setUserRole(userRole === 'principal' ? 'waka' : 'principal')}
        >
          Ganti Role: {userRole === 'principal' ? 'Kepala Sekolah' : 'Waka Kesiswaan'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Menunggu</TabsTrigger>
              <TabsTrigger value="in_review">Dalam Peninjauan</TabsTrigger>
              <TabsTrigger value="approved">Disetujui</TabsTrigger>
              <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Pengaju</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Tanggal Pengajuan</TableHead>
                      <TableHead>Urgensi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProposals.map(proposal => (
                      <TableRow key={proposal.id}>
                        <TableCell className="font-medium">{proposal.id}</TableCell>
                        <TableCell>{proposal.title}</TableCell>
                        <TableCell>{proposal.submitter}</TableCell>
                        <TableCell>{proposal.type}</TableCell>
                        <TableCell>{proposal.submittedDate}</TableCell>
                        <TableCell>{getUrgencyBadge(proposal.urgency)}</TableCell>
                        <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedProposal(proposal)}
                                >
                                  <Eye size={16} className="mr-1" /> Detail
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                {selectedProposal && (
                                  <>
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center justify-between">
                                        <span>{selectedProposal.title}</span>
                                        {getStatusBadge(selectedProposal.status)}
                                      </DialogTitle>
                                      <DialogDescription>
                                        ID: {selectedProposal.id} | Diajukan oleh: {selectedProposal.submitter} | Tanggal: {selectedProposal.submittedDate}
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Tipe Proposal</h4>
                                        <p>{selectedProposal.type}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Urgensi</h4>
                                        <p>{getUrgencyBadge(selectedProposal.urgency)}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Tanggal Pelaksanaan</h4>
                                        <p>{selectedProposal.startDate} s/d {selectedProposal.endDate}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Anggaran</h4>
                                        <p>Rp {selectedProposal.budget.toLocaleString('id-ID')}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Lokasi</h4>
                                        <p>{selectedProposal.location}</p>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Peserta</h4>
                                        <p>{selectedProposal.participants}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Deskripsi</h4>
                                      <p className="text-sm">{selectedProposal.description}</p>
                                    </div>
                                    
                                    <div className="mb-4">
                                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Dokumen Terlampir</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedProposal.files.map((file: string) => (
                                          <Button key={file} variant="outline" size="sm" className="gap-1">
                                            <FileText size={14} />
                                            {file}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <DialogFooter>
                                      {selectedProposal.status === 'pending' || selectedProposal.status === 'in_review' ? (
                                        <>
                                          <Button 
                                            variant="outline" 
                                            onClick={() => handleRejectProposal(selectedProposal.id)}
                                            className="gap-1"
                                          >
                                            <X size={16} /> Tolak
                                          </Button>
                                          <Button 
                                            onClick={() => handleApproveProposal(selectedProposal.id)}
                                            className="gap-1"
                                          >
                                            <Check size={16} /> Setujui
                                          </Button>
                                        </>
                                      ) : (
                                        <DialogClose asChild>
                                          <Button>Tutup</Button>
                                        </DialogClose>
                                      )}
                                    </DialogFooter>
                                  </>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {(proposal.status === 'pending' || proposal.status === 'in_review') && (
                              <>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleRejectProposal(proposal.id)}
                                >
                                  <X size={16} />
                                </Button>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleApproveProposal(proposal.id)}
                                >
                                  <Check size={16} />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-yellow-500" />
              Menunggu Persetujuan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {proposals.filter(p => p.status === 'pending' || p.status === 'in_review').length}
            </div>
            <p className="text-sm text-muted-foreground">Proposal yang perlu ditinjau</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Disetujui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {proposals.filter(p => p.status === 'approved').length}
            </div>
            <p className="text-sm text-muted-foreground">Proposal yang telah disetujui</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <XCircle className="mr-2 h-5 w-5 text-red-500" />
              Ditolak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {proposals.filter(p => p.status === 'rejected').length}
            </div>
            <p className="text-sm text-muted-foreground">Proposal yang ditolak</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProposalPage;
