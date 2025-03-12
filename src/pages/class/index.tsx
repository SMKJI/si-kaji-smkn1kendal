import React, { useEffect } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ClassManagementPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Manajemen Kelas - Si-Kaji';
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          <h1 className="text-3xl font-bold mb-6">Manajemen Kelas</h1>
          {/* Class management content */}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ClassManagementPage;
