
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Star, Award, Gift, Settings } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

const GamificationPage = () => {
  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Sistem Gamifikasi</h1>
          <p className="text-muted-foreground">
            Kelola poin dan reward untuk meningkatkan kedisiplinan dan motivasi siswa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                Total Poin Dibagikan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12,450</p>
              <p className="text-sm text-muted-foreground">Periode: November 2023</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Siswa Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">342</p>
              <p className="text-sm text-muted-foreground">Dari total 400 siswa</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Award className="mr-2 h-5 w-5 text-green-500" />
                Reward Diberikan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Bulan ini</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-primary" />
                Siswa dengan Poin Tertinggi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div key={rank} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                        {rank}
                      </div>
                      <div>
                        <p className="font-medium">Nama Siswa {rank}</p>
                        <p className="text-xs text-muted-foreground">Kelas XI RPL {rank}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold">{350 - (rank * 15)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Lihat Semua
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5 text-primary" />
                Reward & Hadiah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sertifikat Apresiasi", points: 100 },
                  { name: "Bebas Tugas Piket (1 Minggu)", points: 200 },
                  { name: "Voucher Kantin", points: 300 },
                  { name: "Kunjungan Edukatif", points: 500 },
                  { name: "Beasiswa Prestasi", points: 1000 }
                ].map((reward, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                    <div>
                      <p className="font-medium">{reward.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 text-amber-500" />
                        <span>{reward.points} poin</span>
                      </div>
                    </div>
                    <Button size="sm">Tukar</Button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Kelola Reward
                </Button>
                <Button>
                  Tambah Reward
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default GamificationPage;
