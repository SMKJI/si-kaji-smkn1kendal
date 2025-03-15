
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Users, Search, Calendar, Filter } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

const ExtracurricularAttendancePage = () => {
  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Presensi Ekstrakurikuler</h1>
          <p className="text-muted-foreground">
            Kelola kehadiran peserta kegiatan ekstrakurikuler
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari siswa..."
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Pilih Tanggal
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button>
              Rekam Presensi
            </Button>
          </div>
        </div>

        <Card className="mb-10">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Data Presensi Peserta Pramuka
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              12 November 2023 | Total Peserta: 24
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>NIS</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((row) => (
                  <TableRow key={row}>
                    <TableCell>{row}</TableCell>
                    <TableCell>1010{row}</TableCell>
                    <TableCell>Nama Siswa {row}</TableCell>
                    <TableCell>XI RPL {row}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Hadir
                      </span>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default ExtracurricularAttendancePage;
