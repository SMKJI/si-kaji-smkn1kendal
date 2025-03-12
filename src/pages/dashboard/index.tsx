import React, { useEffect } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard - Si-Kaji';
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 pt-28 pb-6">
          {/* Dashboard content */}
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          {/* Rest of dashboard content */}
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
