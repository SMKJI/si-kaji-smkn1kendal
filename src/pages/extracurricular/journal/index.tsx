
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PageTransition from '@/components/layout/PageTransition';

const ExtracurricularJournalPage = () => {
  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Jurnal Ekstrakurikuler</h1>
          <p className="text-muted-foreground">
            Catat dan kelola jurnal kegiatan ekstrakurikuler
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari jurnal..."
                className="pl-8"
              />
            </div>
          </div>
          <Link to="/extracurricular/journal/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Buat Jurnal Baru
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Jurnal Latihan Pramuka {item}
                </CardTitle>
                <p className="text-sm text-muted-foreground">12 November 2023</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">
                  Kegiatan latihan rutin pramuka dengan materi tali temali dan pioneering.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                    Terlaksana
                  </span>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default ExtracurricularJournalPage;
