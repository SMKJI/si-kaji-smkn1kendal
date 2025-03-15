
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, FileText, Download, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const CertificatesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Surat Keterangan - Si-Kaji';
  }, []);

  // Sample certificates data
  const certificates = [
    {
      id: 1,
      type: 'Surat Keterangan Aktif',
      purpose: 'Pengajuan Beasiswa',
      requestDate: '12 September 2023',
      status: 'Selesai',
      approvalDate: '14 September 2023',
      requestor: 'Andi Saputra - XII RPL 1'
    },
    {
      id: 2,
      type: 'Surat Keterangan Peringkat Kelas',
      purpose: 'Pendaftaran PTN',
      requestDate: '15 September 2023',
      status: 'Diproses',
      approvalDate: '-',
      requestor: 'Bayu Aditya - XI TKJ 2'
    },
    {
      id: 3,
      type: 'Surat Keterangan Aktif',
      purpose: 'Pengajuan Kartu Indonesia Pintar',
      requestDate: '16 September 2023',
      status: 'Ditolak',
      approvalDate: '18 September 2023',
      requestor: 'Cindy Permata - XII RPL 2'
    },
    {
      id: 4,
      type: 'Surat Rekomendasi',
      purpose: 'Magang Industri',
      requestDate: '20 September 2023',
      status: 'Diproses',
      approvalDate: '-',
      requestor: 'Dimas Pratama - X RPL 3'
    },
    {
      id: 5,
      type: 'Surat Keterangan Prestasi',
      purpose: 'Pendaftaran Lomba',
      requestDate: '22 September 2023',
      status: 'Selesai',
      approvalDate: '24 September 2023',
      requestor: 'Eka Putri - XII RPL 3'
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Diproses':
        return <Badge className="bg-blue-500">Diproses</Badge>;
      case 'Selesai':
        return <Badge className="bg-green-500">Selesai</Badge>;
      case 'Ditolak':
        return <Badge className="bg-red-500">Ditolak</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Diproses':
        return <Clock size={16} className="text-blue-500" />;
      case 'Selesai':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Ditolak':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <DashboardLayout
      title="Surat Keterangan"
      description="Pengelolaan permohonan surat keterangan"
      userRole="student"
      userName="Siswa"
      showBackButton
      backTo="/dashboard"
    >
      <div className="mb-4 flex justify-end">
        <Button className="gap-2">
          <FileText size={16} />
          Ajukan Surat
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto mb-6 grid grid-cols-3 sm:flex sm:flex-row">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="active">Aktif</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Daftar Permohonan Surat</CardTitle>
              <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari permohonan..."
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((certificate) => (
                  <div key={certificate.id} className="p-4 border rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-primary" />
                          <h3 className="text-lg font-semibold">{certificate.type}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusIcon(certificate.status)}
                          {getStatusBadge(certificate.status)}
                        </div>
                        <p className="text-muted-foreground mt-2">
                          Pemohon: <span className="font-medium text-foreground">{certificate.requestor}</span>
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <p>Tujuan: {certificate.purpose}</p>
                          <p>Tanggal Pengajuan: {certificate.requestDate}</p>
                          {certificate.approvalDate !== '-' && (
                            <p>Tanggal Persetujuan: {certificate.approvalDate}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-2 ml-auto md:ml-0 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">Detail</Button>
                        {certificate.status === 'Selesai' && (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download size={14} />
                            Unduh
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <Clock size={48} className="mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Permohonan Diproses</h3>
                <p className="text-muted-foreground">Menampilkan daftar permohonan surat yang sedang diproses.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Permohonan Selesai</h3>
                <p className="text-muted-foreground">Menampilkan daftar permohonan surat yang telah selesai diproses.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <XCircle size={48} className="mx-auto text-red-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Permohonan Ditolak</h3>
                <p className="text-muted-foreground">Menampilkan daftar permohonan surat yang ditolak.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default CertificatesPage;
