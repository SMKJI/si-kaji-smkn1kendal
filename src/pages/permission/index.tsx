
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import PageTransition from '@/components/layout/PageTransition';

const permissionData = [
  {
    id: "IZ001",
    type: "Sakit",
    startDate: "2023-11-10",
    endDate: "2023-11-12",
    reason: "Demam tinggi dan perlu istirahat",
    status: "approved",
    attachments: "surat_dokter.pdf",
    submittedDate: "2023-11-09",
    approvedBy: "Ahmad Rahman, S.Pd"
  },
  {
    id: "IZ002",
    type: "Keperluan Keluarga",
    startDate: "2023-11-05",
    endDate: "2023-11-05",
    reason: "Menghadiri pernikahan keluarga di luar kota",
    status: "pending",
    attachments: "undangan_pernikahan.jpg",
    submittedDate: "2023-11-03",
    approvedBy: ""
  },
  {
    id: "IZ003",
    type: "Izin Terlambat",
    startDate: "2023-11-01",
    endDate: "2023-11-01",
    reason: "Kendaraan mogok di jalan",
    status: "rejected",
    attachments: "",
    submittedDate: "2023-11-01",
    approvedBy: "Siti Aminah, S.Pd"
  }
];

const PermissionPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Disetujui';
      case 'pending':
        return 'Menunggu';
      case 'rejected':
        return 'Ditolak';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Sistem Perizinan
            </h1>
            <p className="text-muted-foreground">
              Kelola pengajuan izin dan ketidakhadiran
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Ajukan Izin Baru
          </Button>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Daftar Perizinan</TabsTrigger>
            <TabsTrigger value="create">Ajukan Izin</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipe Izin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="sakit">Sakit</SelectItem>
                  <SelectItem value="keluarga">Keperluan Keluarga</SelectItem>
                  <SelectItem value="terlambat">Izin Terlambat</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {permissionData.map((permission) => (
                <Card key={permission.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className={getStatusColor(permission.status)}>
                            {getStatusIcon(permission.status)}
                            <span className="ml-1">{getStatusLabel(permission.status)}</span>
                          </Badge>
                          <Badge variant="outline">
                            {permission.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">#{permission.id}</span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">Izin {permission.type}</h3>
                        <p className="text-muted-foreground mb-4">{permission.reason}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>Tanggal: {format(new Date(permission.startDate), 'dd MMM yyyy')} 
                              {permission.startDate !== permission.endDate && 
                                ` - ${format(new Date(permission.endDate), 'dd MMM yyyy')}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4" />
                              <span>Diajukan: {format(new Date(permission.submittedDate), 'dd MMM yyyy')}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {permission.approvedBy && (
                              <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4" />
                                <span>Disetujui oleh: {permission.approvedBy}</span>
                              </div>
                            )}
                            {permission.attachments && (
                              <div className="flex items-center gap-2 text-sm">
                                <FileText className="h-4 w-4" />
                                <span>Lampiran: {permission.attachments}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                        {permission.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                        {permission.attachments && (
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ajukan Izin Baru</CardTitle>
                <CardDescription>
                  Isi form di bawah ini untuk mengajukan izin ketidakhadiran
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipe Izin</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe izin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sakit">Sakit</SelectItem>
                        <SelectItem value="keluarga">Keperluan Keluarga</SelectItem>
                        <SelectItem value="terlambat">Izin Terlambat</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Durasi</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih durasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="setengah_hari">Setengah Hari</SelectItem>
                        <SelectItem value="satu_hari">1 Hari</SelectItem>
                        <SelectItem value="beberapa_hari">Beberapa Hari</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal Mulai</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal Selesai</label>
                    <Input type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alasan Izin</label>
                  <Textarea 
                    placeholder="Jelaskan alasan mengajukan izin..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lampiran (Opsional)</label>
                  <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                  <p className="text-xs text-muted-foreground">
                    Format yang didukung: PDF, JPG, PNG (Max. 5MB)
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kontak Darurat</label>
                  <Input placeholder="Nomor telepon yang bisa dihubungi" />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button>
                    Ajukan Izin
                  </Button>
                  <Button variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default PermissionPage;
