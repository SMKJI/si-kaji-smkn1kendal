
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileText, Search, Plus, Calendar } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

const ExtracurricularTrainingPage = () => {
  return (
    <PageTransition>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Program Latihan</h1>
          <p className="text-muted-foreground">
            Rencanakan dan kelola program latihan ekstrakurikuler
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari program latihan..."
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Filter Periode
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Program Baru
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Program Latihan Pramuka {item}
                </CardTitle>
                <p className="text-sm text-muted-foreground">November - Desember 2023</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Fokus pada pengembangan keterampilan kepemimpinan dan kerjasama tim melalui berbagai aktivitas outdoor.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Status</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 mt-1">
                      Aktif
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="default" size="sm">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default ExtracurricularTrainingPage;
